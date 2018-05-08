# Source code of jaconsta.com


## Installation

### GoHugo

Hugo is this site's "static site generator".
Download and install Hugo ([Details here](https://gohugo.io/getting-started/installing/))

If you downloaded manually and without a package manager I can recommend this:

Create a folder called `hugo/`. (If you use Windows shell some commands might defer
but the process is the same.)

```
$ cd /wherever/you/want
$ mkdir hugo
$ cd hugo
```

Create a `bin` folder and add the content of the file you downloaded inside.

Add the `hugo/bin/` folder to your PATH.

### This project

Clone this repository inside the `hugo/` folder.

```
$ cd ../
$ cd hugo/
$ git clone https://github.com/jaconsta/jaconsta_web.git
```

Install it's submodules.

```
$ cd jaconsta_web
$ git submodule update --init --recursive
```

### Run 

Hugo comes with an test server embeded. To run it locally.

```
$ hugo server
```

View it locally.

```
http://localhost:1313
```

To compile all your files for publishing.

```
$ hugo
```

## Colaborate

Sure! Submit a PR.

## License

Attribution-NonCommercial 4.0 International ![CC BY-NC 4.0](https://i.creativecommons.org/l/by-nc/4.0/80x15.png)

[More info](https://creativecommons.org/licenses/by-nc/4.0/)

Do you need a *NonCommercial* permission? Contact me. I'll probably agree on that.
