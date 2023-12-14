---
title: "Easy deploy your react server with Nginx"
date: 2019-03-31T12:09:51-05:00
draft: false
tags: ["react", "build", "nginx"]
---

Now you have your react project and you want to create a simple deploy server.

Install your host server. We are going to use a Nginx proxy server.
This is an example for a Debian based system.

`sudo aptitude install nginx-light`

For this example we don't need the full Nginx server.

Nginx creates a default host file. Then you can place the content of your build
files under _/var/www/default_ and it should be enough.

However if you want to create your own file.

Create a configuration file under _/etc/nginx/sites-available/_ `myreact`.

It's most simple content is this one:

```
server {
  listen 80;
  location / {
    root /var/www/myreact;
    index index.html index.htm;
    try_files $uri $uri/ /index.html =404;
  }
}
```

Now let's activate our site.

It used to be enough just creating the symlink to the file, now you have to copy it.

`sudo cp /etc/nginx/sites-available/myreact /etc/nginx/sites-enabled/myreact`

And place your built files.

`sudo cp  -r build /var/www/myreact`

Since we are using the same port **80** is best to remove the _default_ settings
file from _sites-enabled_.

If you can access your server under a name, like _myreact.com_.
You can add the tag _server_name_ to your file like this.

```
server {
  listen 80;
  server_name myreact.com www.myreact.com;
  location / {
    ...
  }
```

And it will listen to both _myreact.com_ _www.myreact.com_.
However you are under your `locahlost` server and it doesn't work, you might
need to add your names to your `host` files.
