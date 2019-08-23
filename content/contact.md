---
title: "Contact"
date: 2018-04-29T11:57:35-05:00
draft: false
---

<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.6.3/css/font-awesome.css">
<link rel="stylesheet" href="/css/form.css">

{{% summary %}}
Contact me through social networks.

<i class="fa fa-linkedin"></i>
[javierconstain](https://www.linkedin.com/in/javierconstain)

<i class="fa fa-twitter"></i>
[jaconsta](https://twitter.com/jaconsta)

{{% /summary %}}

I'm currently located in Bogotá - Colombia

## Let's talk!

You can send me an email or a message through the form bellow.
though I recommend the social networks listed above.

### Email

<button id='emailButton' onclick="showEmail()">Click me</button>
<span id="emailField"></span>

### Leave a message

<form class="smart-green" action="https://formspree.io/contact_us@jaconsta.com" method="post">
	<div>
		<div class="row">
			<div class="6u 12u$(mobile)">
				<label for="name">Name</label>
				<input type="text" name="name" placeholder="Hector Barbosa" required/>
			</div>
			<div class="6u$ 12u$(mobile)">
				<label for="email">email</label>
				<input type="text" name="email" placeholder="captain@black_pearl.com" required/>
			</div>
			<div class="12u$">
				<label for="subject">Title</label>
				<input type="text" name="subject" placeholder="Parley" />
			</div>
			<div class="12u$">
				<label for="message">Message</label>
				<textarea id="message" name="message" placeholder="Express yourself..." rows="8" required></textarea>
			</div>
			<div class="12u$">
				<input class="button" type="submit" value="Send Message" />
			</div>
		</div>
	</div>
</form>

<script type="text/javascript" src="/js/contact.js"></script>
