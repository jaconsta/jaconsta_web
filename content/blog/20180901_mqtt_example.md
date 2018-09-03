---
title: "MQTT with Python"
date: 2018-09-01T10:53:38-05:00

draft: false
tags: [iot, python]
---

The library that allows to connect and interact with an MQTT broker (mosquitto) is *paho*.
to get it.

```sh
pip install paho-mqtt
```

You need to know two things before start (for now):

  * MQTT broker (mosquitto) server **IP** and **PORT**

The default port of the MQTT broker is *1883*

And for this test define a default **Topic** to communicate the clients. The Topic can also be 
called *channel* and can be defined as the conference room you enter whether to talk or to 
listen to it.

You can name it however you want, and this one is important because this will enable the 
devices to communicate and listen the messages you want to send (or receive). 
There are some simple recomendations to follow, the siplest ones are: sections divided by slash and try avoid specials characters or spaces.
An example of a message can be *test/topic*

You import the library in your code with the following statement

```python
from paho.mqtt import client as mqtt_client
```
## Send a message

The following code is the basic way to send a message. And the message will be *bar*

```python
client = mqtt_client.Client('foo2')
client.connect(SERVER_IP, SERVER_PORT)
client.publish(TOPIC, 'bar')
```

This code does the followingj in the order. 
 
First: Configure the mqtt client (or class).

Second: Define a connection properties.

Third: Send the message.

## Receive a message

To receive a message.

```python
def mqtt_on_connect(client, userdata, flags, rc):
    # rc code expected => 0
    print('Connected with result code {0}'.format(str(rc)))
    client.subscribe(topic=TOPIC)
    print('Subscribed to {0}'.format(TOPIC))


def mqtt_on_message(client, userdata, message):
    payload = message.payload.decode('utf-8')
    print('------------------')
    print('Incomming message')
	print('topic {0} | payload {1} | qos {2}'.format(message.topic, payload, message.qos))

client = mqtt_client.Client('foo1')
client.on_connect = mqtt_on_connect
client.on_message = mqtt_on_message
client.connect(SERVER_IP)

client.loop_forever()
```

Look this code repeats two steps from above: Initialize the client class and connect. 
But does some things differenly.

First it uses loop_forever which sets the application mode to wait for messages indefinetly.

Second: define two callbacks: `on_connect` and `on_message`. What are these and why are they written the way they are?
*Paho* runs on threads and these functions are callbacks dispatched when the event happens.

`mqtt_on_connect` runs when the connection to the broker happens. On our case, I subscribe to the topic I want to receive messages from.

`mqtt_on_message` is dispatched when a message is recieved from the topic I subscribed to. From here you can run any other 
function that acts based on the topic or messages you receive. The message is received in *binary* type and this case we convert
it to string.

## Considerations

Notice that `mqtt_client.Client` for the receiver and the publisher is different.
You have to define different names for each or leave it empty so the library defines it for you. 
This is important if you have several machines connected simultaneously.

The `loop_forever` can block your application from doing other things. Another approach is.

```python
client.loop_start()
time.sleep(10)
client.loop_stop()
```

We are not considering the message `qos` (Quality of Service) yet.

## Demo

Code source: https://github.com/jaconsta/mqtt_demo
