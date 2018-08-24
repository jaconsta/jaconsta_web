---
title: "Install mosquitto MQTT on a raspberry"
date: 2018-08-20T10:53:38-05:00
draft: false
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

### Sources

**Official instructions**: [](https://mosquitto.org/blog/2013/01/mosquitto-debian-repository/)
**Adding authentication**: [](https://medium.com/@erinus/mosquitto-paho-mqtt-python-29cadb6f8f5c)
**Video tutorial showing installation and demo with esp8266**: [https://www.youtube.com/watch?v=PgsH43Tpqjc]
