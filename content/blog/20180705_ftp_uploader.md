---
title: "A tool for uploading static html files"
date: 2018-07-05T10:53:38-05:00
draft: false
tags: ["tools", "application", "python", "ftp"]
---

This site is created using a **static site generator** called [hugo](https://gohugo.com). There are many others, few example
are Jekyll or Hexo. For the book I'm writing ([read](https://djangorest.jaconsta.com/)) I use a different tool called 
[Sphinx](http://www.sphinx-doc.org/en/master/) and helps organizing the content you want to publish.

How most os these site builder applications works is the following: You start by choosing a tempate to use, or code your own; load your
images and other static files, and write your site page until you have all your site as you want it to be.

These creations libraries set an structure where each of the files must be in order to generate the site properly:
template, translations, content, statics, configurations. When you want to *build* all the files into the final website
the *builder* takes all your files and generates the specific *html* for each page. For example, this blog post is written
under **markdown** format (md), which is almost plain txt. Hugo takes it and parses it into it's html representation, also 
updates the *blog home" section page ([/blog](/blog)) on it; all these *compiled* files are put into a **publish** folder.
So I can take them and upload to my hosting so you can read it.

These upload process I normaly do it *manualy* using a FTP uploader application. However I'm into doing more complex things, 
and also, since the source of this site uses a control version system (git) and there are many continuous integration tools (CI)
I wonder If I can create a tool where, whenever I *git push* new content. The CI tool builds it and pusblishes it automatically
so I don't have to worry if my site is up to date with my latest version of my git repository.

It's a simple application, but I feel it's powerfull and you simply run it and it handles all the dependencies upload.

Of course, It can have tweaks and improvements, but for its ability to simply download it into a subfolder, call it *lib/ftp_uploader*
specify the ftp credentials (user/password), source folder like */public* and remote destination folder like *public_html/* and expect it 
to do the rest, it is really usefull. Specially if you are someone who publishes frequently.

The tool is built on Python, so you might need to download it first if you still don't have it already, and it runs without,
third-party library dependencies. So it's almost ready to go.

I'm sure it can work for almost any of those site builders, I've tested it for the two applications I use Hugo and Sphinx and with the
correct parameters, it works like a charm. It has also a documentation for testing the upload process with a testing FTP server you can
download thanks to docker, to be sure the files will be uploaded where you expect.
