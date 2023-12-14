---
title: "Create a React app as a wordpress plugin."
date: 2018-10-24T10:53:38-05:00
draft: false
---

The process create a wordpress plugin is documented here.

https://codex.wordpress.org/Plugins

With this steps you can create a React app within a Wordpress admin site.

Worpress is not dessigned to be friendly with Javascript libraries. 
So you might need some additional tricks to make this work correctly.
Consider using the tools PHP provides you.
But this could help you to visualize information without much touble.

**1st Have an installed version of wordpress**

And be able to access the instalation contents. In this post react will be uploaded
on the plugin admin section.

## Initialize your plugin.

From the wordpress source folder. Go to `/wp-content/plugins` and there create a 
folder, you can name it however you want (ex `my_react_app`).

Inside your new folder create a `index.php` file. And there you can add the following.

```php
<?php
/*
Plugin Name: <Plugin name>
Plugin URI: <http://Where_to_find_it/plugin_name>
Description: <A meaningfull text to help everyone understand>
Version: 0.1.0
Author: <This is you>
Author URI: <http://plugin_name.yoursite.com>
Text Domain: <plugin-name>
Domain Path: /languages
*/
```

Be conscious on the names you use and to be yours.

An example for this post might be.


```php
<?php
/*
Plugin Name: whoa
Plugin URI: https://jaconsta.com/wordpress_plugins/whoa
Description: This is a simple plugins that enbeds a react app
Version: 0.1.0
Author: Javier Constain
Author URI: htpps://jaconsta.com
*/
```

You can find more information about it and more tags to add here:

* https://developer.wordpress.org/plugins/the-basics/header-requirements/
* https://codex.wordpress.org/File_Header

### Check it appears inside your wordpress plugin section

Go to your wordpress admin, and click on the *Plugins* sections.

You should be able to see your plugin with the _Plugin Name_ you set.

### Adding a first security protection.

If, from the browser, you type the url where the plugin is installed. 
Ex ´wp-plugin/wp-content/plugins/whoa/index.php´ your file will be loaded.

You need to add a security _patch_ to avoid this.

In your plugin's `index.php` and bellow the text you just pasted and modified add
the following.

```php
// Block direct access
if (!defined('ABSPATH')){
	exit;
}
```

This will block any attempt to access it by undesired people.

Another security issue is to put the content inside the `index.php` file, but we
won't address it here


## Add the React libraries.

For this experiment we are going to use React using the 
[script tag option](https://reactjs.org/docs/add-react-to-a-website.html#step-2-add-the-script-tags).

Here we cannot just add the `<script>` tag as we would love. We have to use wordpress functions to add it to the main 
php file. And it's recommended that we follow some wordpress conventions.

Lets create a `includes` folder and a `whoa_scripts.php` file inside.

```php
<?php
  // Add scripts
  function whoa_add_scripts(){
  	// Add react scripts
  	wp_register_script('react', 'https://unpkg.com/react@16/umd/react.development.js');
  	wp_register_script('react-dom', 'https://unpkg.com/react-dom@16/umd/react-dom.development.js');

  	wp_enqueue_script('react');
  	wp_enqueue_script('react-dom');
  }

  add_action('admin_enqueue_scripts', 'whoa_add_scripts')
```

It has many wordpress reserved words. You can search on wordpress documentation to learn more
about them. Also, since were are not using class based approach,
and probably other plugins might define the same funciton names. We need to add a prefix to all our functions. 

You can choose anyone you like, I chosed **whoa** for this post.

We couldn't add babel because it would need to modify otherwise the global variable to enable wordpress JS tags.
And since it is a plugin. We can't asure every user will do that. So... good bye JSX, for now.

These are the react development files. Make sure to use the mimified ones instead when you feel ready to publish your plugin.

Be mindfull that this post will add the react app to the plugin admin's page. That's why we use
`admin_enqueue_scripts` on *add_action*.

## Load the scripts on the admin page.

Now lets tell wordpress about this file. In your ´/index.php´ file add the following at the bottom:

```php
require_once(plugin_dir_path(__FILE__).'/includes/whoa_scripts.php');
```

Now lets indicate wordpress we want to create an admin page for this plugin. And there create the `div`
tag our react app will search for. Bellow the `add_action` function add the following.

```php
// Add admin interface
add_action('admin_menu', 'addWhoaMenu');

function addWhoaMenu () {
	add_menu_page('Whoa configure', 'Whoa configure', 4, 'whoa-configure', 'whoa_react_entrypoint');
}

function whoa_react_entrypoint(){
	echo '<div id="whoa_container"></div>';
}

```

If you refresh you admin page, you should see the ´Whoa confifure´ link on the sidebar.

The last argument of the `add_menu_page` is the function which renders our div element.

## Create a react app

Lets create a `/static/js/whoa_main_admin.js` file. This file will host our react application.
And add the following.

```javascript
'use strict';

const e = React.createElement;

class App extends React.Component {
  render() {
    return e(
	  'button',
	  { onClick: () => console.log('hello') },
	  'Like'
	);
  }
}

setTimeout (() => {
  const domContainer = document.querySelector('#whoa_container');
  ReactDOM.render(e(App), domContainer);  
}, 0)
```

Notice two things:

* First: We couldn't use JSX
* Second: We had to put our react render function inside a *Timeout 0* expression. This prevent the code to load before all other libraries.

### Link the react app to the wordpress plugin.

Let's modify our `whoa_add_scripts` function inside the `/includes/whoa_scripts.php` file.
Add the following at the bottomm of the function.

```php
function whoa_add_scripts(){
   ...
   wp_enqueue_script('whoa_main_script', plugins_url(). '/whoa_plug/static/js/whoa_main_admin.js');
}
```

## Finished

Now refresh your wordpress admin page on the *Whoa plugin* section. You should see a button that says **Like**

### Final notes

This simple post shows the process to embbed a react code into an admin page.

For a more complex react application it's better to first build it and then link the js files. 
That process could be posted later.

**More documents and references**

* (Youtube - Build a Useful Wordpress Widget Plugin)[https://www.youtube.com/watch?v=eZn3tfF5GFM]
* (Youtube - Wordpress. Making a basic plugin)[https://www.youtube.com/watch?v=l6NL-rF9bE8]
* (WP add admin scripts)[https://codex.wordpress.org/Plugin_API/Action_Reference/admin_enqueue_scripts]
* (Building WordPress Plugin Series)[https://torquemag.io/tag/building-wordpress-plugin/]
* (10 things a wordpress developer should know)[https://www.smashingmagazine.com/2011/03/ten-things-every-wordpress-plugin-developer-should-know/]
