---
title: "Setting PostgreSQL using docker "
date: 2018-04-29T19:09:51-05:00
draft: false
tags: ["postgresql", "docker", "local"]
---

You, of course, need to have [docker](https://docker.com) installed.

**Download the Postgres image.**

```
$ docker pull postgres
```

This will pull the latest version of the database available.
If you want a different version you can specify it changing the
word *postgres* for **postgres:9.6** in this case to get the
version *9.6*.

**Start the container**

```
docker run --name  pg-local -e POSTGRES_PASSWORD=pgpassword  -d -p 5432:5432 -v $HOME/Documents/docker/db_vol/postgres:/var/lib/postgresql/data  postgres:9.6
```

**pg-local** is the name of the container.

**pgpassword** is going to be the *postgres* user password inside the container.

Other commands:

 **-d** is for detached mode (run in the background). **-p** To expose / map container ports. **-e** Is to expose environment variables.

 **-v** maps data or information folders.
 Note: This works on Mac or Linux. On Windows maybe the path structure changes.

If you want the container to be ephemeral (be destroyed on exit) add the **--rm** argument. Ex `docker run --rm --name  pg-local...`

**Docker kinda-monitoring commands**

**Validate your container is running**

`docker ps | grep pg-local`

And your container should be shown in the output.

**View your logs**

`docker logs -f pg-local`

If you don't want the continuous output, remove the **-f** tag.

To validate it's up and running correctly.

`docker logs pg-local | grep tail`

If you haven't attempted any connection. This should be the last line:
**LOG:  database system is ready to accept connections**

**Access the container**

You could access first from the shell using

```
docker exec -it pg-local sh
# now you should be inside your container
psql --username=postgres
```

or direcly

```
docker exec -it pg-local psql --username=postgres
```

On both scenarios you should be able to see:
`postgres=#`
on your terminal

Here you can use all common postgres commands like:

```
CREATE DATABASE "mydb";
CREATE USER myuser WITH ENCRYPTED PASSWORD 'mypass';
GRANT ALL PRIVILEGES ON DATABASE mydb TO myuser;
help
\q
# Or any other command you know
```

**Access from local**

Use `libpq`, this will install only the pg libraries (psql),
not the database itself.
To install on mac use: `brew install libpq`.
On ubuntu `sudo apt-get install libpq-dev`

Remember to map the directory to your path. Ex.

```
export export PATH="/usr/local/Cellar/libpq/11.1/bin/:$PATH"
```

And also consider [pgcli](https://pgcli.com/).

And start working on it.

Hope it helps you.
