---
title: "Install mosquitto MQTT on a raspberry"
date: 2018-08-20T10:53:38-05:00

draft: false
tags: [iot]
---

Add the repository source

```sh
wget http://repo.mosquitto.org/debian/mosquitto-repo.gpg.key
sudo apt-key add mosquitto-repo.gpg.key
```

Install the MQTT server.

```sh
sudo apt-get update
sudo apt-get install mosquitto
```

Validate it's running

```sh
/etc/init.d/mosquitto status
```

## Bonus. Run inside Docker.

Instead of installing directly in the machine, you can install it on Docker too.

Download the Docker image. This will download the "latest" version of the image.

```sh
docker pull eclipse-mosquitto
```

To run for the first time

```sh
docker run -it -p 1883:1883 -p 9001:9001 eclipse-mosquitto
```

There are two more options. Link with a configuration file and persist file storage.
More on that, in the link bellow.

### Sources

**Official instructions**: https://mosquitto.org/blog/2013/01/mosquitto-debian-repository/
**Adding authentication**: https://medium.com/@erinus/mosquitto-paho-mqtt-python-29cadb6f8f5c
**Video tutorial showing installation and demo with esp8266**: https://www.youtube.com/watch?v=PgsH43Tpqjc
**Mosquitto - Docker Hub**: https://hub.docker.com/_/eclipse-mosquitto/
