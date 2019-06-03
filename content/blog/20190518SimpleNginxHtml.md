---
title: "Easy run your html with docker and Nginx"
date: 2019-05-18T12:09:51-05:00
draft: false
tags: ["html", "docker", "nginx"]
---

If you've ever needed to quickly run a built or a static html (js and css) site.

> In my case it helps to preview and test locally Go Hugo built
 sites, react built content or preview any site I'm given.

A tool like [Browser sync](https://www.browsersync.io/) would work perfectly,
and gives lots of tools. But a more "real" scenario would be using a true
server like [Nginx](https://www.nginx.com/).

First you need to have Docker installed and the the Nginx image.

Then you only need to run this command.

```
docker run --name my-site-web-nginx -v /home/myUser/my_page/public:/usr/share/nginx/html:ro -p 80:80 -d nginx
```

Notes:

 - `/home/myUser/my_page/public` is your local folder

 - You can access it on port 80 or just http://localhost.

 - Remember to refresh the browser page manually if you made any change.
