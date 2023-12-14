---
title: "Configure Systemd to launch a Django project"
date: 2019-03-30T12:09:51-05:00
draft: false
tags: ["django", "deploy", "systemd"]
---

I am going to use systemd to ensure that our server runs on startup.

Let's assume your django project is under `/opt/django_server`.
You have created a virtual environment under `/opt/django_server/venv`.
And you have installed the `gunicorn` server.

First create the systemd `django_server.service` file.

```
[Unit]
Description=Our Django server

[Service]
Restart=on-failure
WorkingDirectory=/opt/django_server
Environment=PYTHONPATH=/opt/django_server/venv/bin
ExecStart=/opt/django_server/venv/bin/gunicorn django_server.wsgi:application --name django_server --bind 0.0.0.0:8000 --workers 3

[Install]
WantedBy=multi-user.target
```

It contains three sections.

- **Unit** Description of the service and requirements.
- **Service** Details on how the service will run.
- **Install** Target of the service.


Place your file under `/etc/systemd/system/`

Reload systemd so it can automatically start our service(s)

```
sudo systemctl daemon-reload
sudo systemctl enable django_server
sudo systemctl start django_server.service
```

Validate your service status

`systemctl status django_server.service`

If you want to manually start / stop your service

`sudo systemctl start django_server`
