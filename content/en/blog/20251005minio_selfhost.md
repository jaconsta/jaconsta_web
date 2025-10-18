---
title: "Self hosting Minio in 2025 and connect with kafka."
date: 2025-10-10T07:09:51-05:00
draft: false 
---

By the time this is out the name is probably going to be Aistor.
 
Have you ever tried self hosting your own AWS S3 alternatives?
[https://www.min.io/](Minio) is one of them. 

Previous versions of it used to have all configuration settings available
in the web dashboard, now it only offer the object storage visualization.
My guess is that it allows them to focus on improving the features that 
matters, without wait for the ui for feature parity; but I also believe
is to leverage infrastructure automation tools. 

This is how the web ui used to look in 2013. All features included.

Now here is the UI on 2025. Only storage visualization.

I have not done the automation tools part, yet. And I need to do a first
(local) run, before going to it. So I need to set up a few commands to
enable programatic access to it. Which means generate the user

The objective of this first part is to give an user admin privileges and 
to access the service from an app.

First run it, I am using nerdctl, podmand and docker should work as well.
Also change the admin credentials and the tag version.

The container repository is [https://quay.io/repository/minio/minio?tab=tags&tag=latest](quay.io)

```sh
nerdctl run \
   -p 9000:9000 \
   -p 9001:9001 \
   --name minio \
   -v ~/minio/data:/data \
   -e "MINIO_ROOT_USER=ROOTNAME" \
   -e "MINIO_ROOT_PASSWORD=CHANGEME123" \
   quay.io/minio/minio:RELEASE.2025-09-07T16-13-09Z  server /data --console-address ":9001"
```

This container included the two required cli's `mc` and `mc admin`.

Then get into the container.

`nerdctl container exec -it minio bash`

## Setup a new user and enable programatic access

The first thing to do is create an "alias" for your user and policies.

I will create an alias called "myalias" (creativity 100%).

`mc admin alias set myalias http://127.0.0.1:9000 ROOTNAME CHANGEME123`

Create a new user (username: "newuser", password: "newusersecret") and give it the same priviledges as the default user (admin).

`mc admin user add myalias newuser newusersecret`

Add a read+write policy.

`mc admin policy attach myalias readwrite  --user newuser` 

Remove (detach) the default read/write policies.

`mc admin policy detach myalias writeonly --user newuser`

`mc admin policy detach myalias readonly --user newuser`

Create the __access_key__ / __access_token__ for your application.

`mc admin user svcacct add myalias newuser`

That should be it. Test it on you application code.

**Note** This setup is not secure. Only for local development.

Application sample. Connect to it with Rust

```rust
pub fn b3_client() -> Client {
    let ignore_ssl = Some(bucket_check_ssl == "false");

    let mut url: BaseUrl = bucket_url.parse().expect("Minio bucket_url is missing.");
    // You can setup the region here 
    // url.region = bucket_region.to_string();
    let credentials = StaticProvider::new(access_key, secret_key, None);
    let client = ClientBuilder::new(url.clone())
        .provider(Some(Box::new(credentials)))
        .ignore_cert_check(ignore_ssl)
        .build()
        .expect("Failed to create client");

    client
}

let client = b3_client();

println!("{:?}", client.bucket_exists(bucket_name).send().await.unwrap()))
```

## Learn more about the policies

See the attached policies.

`mc admin policy ls myalias`

See the details about a policy in particular.

`mc admin policy info myalias readwrite`

## Some bucket commands

**mb** = make bucket

Create a bucket. Use the alias first.

`mc mb myalias/somebucketname`

Upload

`mc cp source myalias/somebucketname `

Upload recursive

`mc cp --recursive <source> <bucket/destination>`

## Connection with messaging systems

I am working on a project where you can see and the setup with the instructions provided here.
Github link [jaconsta/g_rag_llery](https://github.com/jaconsta/g_rag_llery)

### Kafka

Ensure the alias is correctly mapped to the server url

` mc alias set myalias http://minio-server:9000 minio minio123`

Create a bucket under your alias

`mc mb myalias/rag-upload/feeder`

`mc admin service restart myalias`

Confirmation that the setup is initially correct

> `SQS ARNs: arn:minio:sqs::PRIMARY:kafka`

Start the attachment process:

Replace __ALIAS/BUCKET__ here with __myalias/rag_upload/feeder__

I want to receive events for creation and update of images.

`mc event add myalias/rag_upload/feeder arn:minio:sqs::primary:kafka \
  --event s3:ObjectCreated:*`

To inspect the messages sent.

Inside the kafka container or instance.

`/bin/kafka-consumer --bootstrap-server localhost:9092 --topic minio-topic`

## Conclusion.

Self hosting Minio is great for your own private projects, for when you
want to manage your own infrastructure  or when you must be totally sure
about the storage policy management.

It's S3 compatibility and policy declaration makes it great to adapt if
you have already experience with it. But can be troublesome if many of
the policy or management concepts are new for you. For that I kinda recommend
running and setting it up on an AWS account and then bring the concepts
back to your instance.

Minio platform is currently under heave chanches, even changing their name to (AIstor), that may affect
the relevance of the information here provided.

