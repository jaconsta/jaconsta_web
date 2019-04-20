---
title: "Configure static IP on your device"
date: 2019-04-20T12:29:51-05:00
draft: false
tags: ["linux", "server", "ip"]
---

If you have ever installed any kind of server in your house or office.
And if it's Linux (Unix) based, you surely have been affected by the issue
of the network changing over time. You need to check you device ip (ex. `ifconfig`)
to see which is your current IP.

There is a way to avoid this, and set a fixed IP on your device. This is
really useful if you have to make any device discoverable.
I will take the command line approach here.

Open this file `/etc/dhcpcd.conf` and add this lines:

```
interface eth0

static ip_address=192.168.0.50/24
static routers=192.168.0.1
static domain_name_servers=192.168.0.1

interface wlan0

static ip_address=192.168.0.50/24
static routers=192.168.0.1
static domain_name_servers=192.168.0.1
```

Here you are doing two things. First set the ip `192.168.0.50` on both
cable **eth0** and wireless connections **wlan0**. You might want to adjust the
connection interfaces in order to match your devices properly.
`ifconfig` is always a good tool to validate them.

And reboot `sudo reboot`.

Now you should be able con connect to your device on ip `192.168.0.50` always.
Remember if your device is not under the same network every time, then you might
want to comment or modify those IPs or also the router IP.

Also, I like to choose a "high" ip number to avoid conflicts with non-static ip
assigned devices.
