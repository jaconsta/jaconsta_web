---
title: "Deploying to a shared hosting non-default folder."
date: 2018-04-29T19:09:51-05:00
draft: false
---

By default I don't like my web content to be on my server default drive. And the main reason is organization. That's why I put it under a different folder. Ex. `main_web/`

Setting it on a NGINX server is done inside the `*.config` file, but on a shared hosting you don't have access to those _config_ files. Instead, the solution is located under a file called `.htaccess`.

This file is located under your shared hosting `/public_web` folder. If you have a _cpanel_ manager you might not be able to find it on the _File manager_ link. To find it, an alternative is to connect to your hosting using an FTP client.

Depending on your service it might look different, but in my case, the default content of this file was:

```

RewriteEngine on
```

If this file doesn't exists, create one, but be sure you are lookin in the right place or you might need to enable a feature in you FTP client to show _hidden_ files.

Add the following lines to that file:

```
RewriteCond %{HTTP_HOST} ^<DOMAIN_NAME>$ [NC,OR]
RewriteCond %{HTTP_HOST} ^www.<DOMAIN_NAME>$
RewriteCond %{REQUEST_URI} !<WEB_HOME_FOLDER>/
RewriteRule (.*) /<WEB_HOME_FOLDER>/$1 [L]
```

Replace **<DOMAIN_NAME>** with your domain name and **<WEB_HOME_FOLDER>** with the place where you have uploaded you content.

So in my case, with `WEB_HOME_FOLDER = main_web` and the file end looking like this:

```

RewriteEngine on
RewriteCond %{HTTP_HOST} ^jaconsta.com$ [NC,OR]
RewriteCond %{HTTP_HOST} ^www.jaconsta.com$
RewriteCond %{REQUEST_URI} !main_web/
RewriteRule (.*) /main_web/$1 [L]
```

You can have as many subfolders as you need so `main_web` could also be `web/main/content` an it should work too!

In my case the changes have reflected in less than 5 minutes, if you don't, check you are doing it correctly.

---
 
_Sources:_

> https://www.siteground.com/kb/how_to_change_my_document_root_folder_using_an_htaccess_file/