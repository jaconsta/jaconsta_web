---
title: "Acheiving data pseudomization in APIs (With Rust)"
date: 2024-02-06T19:09:51-05:00
draft: true
---

One key feature that I've looked for many years to achieve is the so called user data encryption.
Also known as data pseudomization. It consists on encrypt user sensible data in the database and make
it almost impossible for third parties, even for personal at the company to read it. 

For this scenario the company holds all the tools to view the data if it really desires, but must be intentional.
The tools I speak about are.

 - Database with the encrypted data.
 - Cypher keys to encrypt and decrypt the data.
 - Vaults to store the encryption keys.
 - Access to vault storage. 

The services must be build so that they make use of the secure mechanisms and to deal with the cyphers without 
leaking sensible information while they hold it on it's "human readable" form.

## What should be encrypted?

The question becomes, should I encrypt every single byte that my system receives? Or to what level should it be done?

The answer is rather simple, any information that may track back and helps to identify whom does it belongs to.

- User personal data: Name, phone numbers, address, age.
- Work related data: Organization name, employees, departments.
- Third party related information: Bank accounts, insurance numbers or agencies. 
- Links to user specific data tables in the system databases (Maybe).

Not everything needs to be under cyphers, as everything in software, it may depend on the business level. 

Depending on how critical the access of information can be for the system or company.

## Is this the thing you do with passwords?

No, what you do with passwords is called hashing, the main difference is that the hashing mechanism is a one way only 
cypher. That means, once you "hash" an user password, it is impossible to reverse the operation and to tell what the 
original value was.

## So, what are we doing.

The following method explains a way to generate short cypher keys.

For today example CCM block cyphers will be used. 

To encrypt and decrypt messages two parts are needed. The secret key and the message nonce.

The secret key is a 128 bits combination that in our case will be unique for every user of the platform. 
It should be classified, stored in a secure way so that only authorized services or personal may access it. 
The key aspect here is that if the key dissapears all user data is considered lost. Data may still be persisted in
the databse, but it is not possible to read because it is in the encrypted state. 

This also means, that if an user ever wants to delete the account. It can be achieved by simply removing the cypher key.

Nonce will be a 13 bytes random blocks (Like a 13 characters long string into bytes) that is unique per message. 

This is a symetrical encryption which means that with the same key both encription and decryt can take place.

Only by having both the Nonce + secretKey can we generate a new encripted message as well as recover it from the 
encription state. But by having the Nonce can we achieve an extra, though thing, layer of security for the message.

The following can be achieved in almost any language. Rust was simply chosen.

## Creating the key.

Every time a new user entity or information owner entity is created a new Random key is generated.

Will be stored in a secure place and retrieved when encrytion or decrypt of new messages is required. The storage of
the key is out of scope for this post.

A way to make this work can be seen bellow.

```rust

```

## Reading the key

Read the key is simple as loading the string bytes and load into memory. 

```rust
```

## Create a cypher message

To create an encrypted message is a process or generate a random Nonce and for this case. Use it to generate all the 
elements of the message that we wish to remain confidential.

Note that here we choose what we want to treat as confidential.

```rust
```

In this case data needs to be converted in a readable-but-hidden string.

Depending on the database or persistance mechanism features. Choosing a more appropriate type is recommended. Here it
allows us to "share it" securely.

In the same way, trying to use an UTF-8 string conversion is not possible because our cypher is not of that type.

## Re-create our original message.

The message is stored with the nonce. Along with non-confidential human readable attributes as well as confidential
cypher messages.

The programmer must make sure that the correct attributes are selected for unencryption.

Still, the process of bring the cypher back to it's human readable form is quite similat to creating the cypher.

It needs to be brought back into a bytes representation of the message so two ways are presented right now.

The first one is assuming we get our message represented as bytes slice.

```rust 
```

Or if we are provided from a string similar to the created above. The bytes number slice we can de-construct it and 
build our bytes slice back.

```rust

```

## That's it

Creating encrypted messages, and moreover generate an anonymized API or service can be quite a challenging.

This shows a practical foundation, building blocks that could allow think in ways to break into the more complex ways
of secure data management.

Secrets handling is one challenging part.  
But with the correct tools, it could be a fun project to implement.


