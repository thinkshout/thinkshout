---
layout: blog
body-class: blog-post
topic: technology
title: Identifying Insecure Drupal Code
homepage: true
author: sam
published: true
featured: true
short: And, why you shouldn't allow users to input a SQL operator!
tags:
  - Drupal Planet
  - Drupal
  - Security
  - Javascript
  - Twig
  - Drupal 8
  - "render arrays"
  - "SQL tips"
  - "Drupal APIs"
date: 2019-05-09 12:00:00
image: https://thinkshout.com/assets/images/blog/insecure-drupal-code-header.jpg
image-alt: "Stormtrooper on a mousepad"
---
# Recognizing insecure Drupal code

Within the Drupal community, it seems like many developers are interested in ensuring their modules and themes are secure, but don’t really know what insecure code looks like. I’ve personally found a lot of resources that tell you about security best practices, but don’t dive deeper into common missteps and their consequences.  

## The Drupal problem
Drupal 8 is the most modern and secure release of Drupal yet, which leads developers to expect that all Drupal 8 APIs are perfectly safe to use. While it’s great that Drupal has earned that reputation, there are still plenty of ways to leave your site vulnerable.

In this blog I’ll go through examples of insecure code that I’ve seen doing security research and review into Drupal 8, which will hopefully make it easier for you to know what to look for when reviewing your own code.  

## So you want to render HTML…
Outputting HTML is Drupal’s bread and butter, but if you’re rendering user input you may be vulnerable to cross site scripting, otherwise known as XSS.

XSS occurs when a malicious user identifies an exploit that allows user input to be executed as Javascript. Then, typically, an attacker leads someone without higher privileges (an administrator) to trigger the exploit. At that point, an attacker can do anything the administrator can do - add more administrator accounts, delete content, download sensitive data, and potentially use a chained exploit to execute server-side code.  

### Twig has your back
With Drupal 8’s implementation of Twig, all variables rendered normally (within curly braces) are automatically filtered. The attributes object, which is often used in Twig, is also generally safe. For example, trying to add a malicious attribute with code like:

```
<b {{ attributes.addClass('"onmouseover="alert(1)"') }}>Hello</b>
```
Will render safely as:
```
<b class="&quot;onload=&quot;alert&quot;">Hello</b>
```

### Unquoted attributes
Twig isn’t inherently immune to XSS. If you don’t wrap attributes in double quotes, for instance, user input could render a malicious attribute. For example, if you have a template like:
```
<b class={{ configurable_class }}>Hello</b>
```
And pass in a class configured by a user:
```
$variables['configurable_class'] = 'foo onclick=alert(bar)';
```
The final, unsafe HTML will be:
```
<b class=foo onclick=alert(bar)>Hello</b>
```
This is because variables have HTML special characters escaped, but aren’t aware of the context they’re rendered in. `onclick=alert(bar)` on its own is completely safe, but when inside an opening HTML tag can trigger XSS.  

### The raw filter
One of the filters that comes with Twig, `raw`, marks a value as being safe and does not escape it. That means that if you ever see something like:
```
{{ variable | raw }}
```
In your templates, that could lead to an XSS vulnerability. There are very few use cases for `raw`, so if you can avoid using it completely you should.  

### Misusing render arrays
Render and form arrays in Drupal can also be misused to allow XSS. For example, you may know that HTML like this executes arbitrary Javascript on click:
```
<a href=”javascript:alert()”>Click me!</a>
```
And if you’re using url or link objects or render elements, this will be rendered as:
```
<a href=”alert()”>Click me!</a>
```
Which is safe. However, if you’re not using the url or link APIs, Drupal doesn’t have the context to know that the “href” attribute could be unsafe, and will render it without escaping. For example, this code:
```
$build = ['#type' => 'html_tag', '#tag' => 'a', 'Hello'];
$build['#attributes']['href'] = $user_input;
```
When provided this user input:
```
$user_input = 'javascript:alert("foo")';
```
Will render:
```
<a href="javascript:alert(\"foo\")">Hello</a>
```
Like the Twig attribute issue, this is a result of Drupal not being aware that untrusted data is being passed to potentially dangerous APIs. Here are some more examples of render arrays that allow XSS:
```
$build['#markup'] = $user_input;
$build['#allowed_tags'] = ['script'];
```
```
$build['#children'] = $user_input;
```
```
$build['#markup'] = t($user_input);
```
```
$build = ['#type' => 'inline_template', '#template' => $user_input];
```

### Not filtering in Javascript
While the examples so far have been about backend code, XSS is commonly triggered from Javascript. Take this example, where the value of an input is passed to jQuery’s `html` function to display an error:
```
var value = $('input.title').val();
$('.error').html('<p>Invalid title "' + value + '"</p>');
```
Since the `html` function assumes the data you pass is safe, this could trigger XSS. A better way of approaching this is to use the `text` function, which escapes special characters:
```
var value = $('input.title').val();
$('.error').text('Invalid title "' + value + '"');
```
The most Drupal-y way to accomplish this would be to use the `Drupal.t` function, which accepts placeholders that are automatically escaped, and translates text:
```
var value = $('input.title').val();
$('.error').html(Drupal.t('<p>Invalid title "@title"</p>', {'@title': value});
```

### Sniffing out XSS problems
In general, a good way to spot XSS is to question complexity wherever you see it. Look into your biggest forms and controllers and see if there’s anything odd using user input, and if so make an effort to exploit it. Also, if there’s any opportunity to use Twig instead of concatenating HTML in the backend, use Twig!  

## So you want to query the database…
Drupal comes with a database abstraction layer that saves you from writing SQL by hand, which has done a lot to prevent a type of vulnerability called SQL injection, otherwise known as SQLi.

SQLi occurs when a malicious user identifies an SQL query that can be unsafely modified by user input, allowing them to add arbitrary statements or additional queries onto an existing query. SQLi can allow attackers to read arbitrary sensitive data, insert arbitrary data, or even wipe existing data if they are able to.
Use the abstractions
The best advice when querying the database is to use Drupal’s database API wherever possible. Drupal has great documentation on how to properly use this API here: https://www.drupal.org/docs/8/api/database-api

The API is normally safe to use, but can be used unsafely in ways that aren’t clear to all Drupal developers.  

### Not using placeholders
There are cases where you need to write a query by-hand, which is fine unless that query uses user input, in which case you need to use placeholders. For example, this code has user input (`$name`) in the query string:
```
\Drupal::database()
  ->query("DELETE FROM people WHERE name = \"$name\"")
  ->execute();
```
If `$name` is set to a malicious value, like:
```
$name = 'myname" OR "" = "';
```
The final query ends up being:
```
DELETE FROM people WHERE name = "myname" OR "" = ""
```
Which in this example would delete everyone from the `people` table. The proper way to do this would be to use placeholders in your query string, and pass the user input as an argument:
```
\Drupal::database()
  ->query('DELETE FROM people WHERE name = :name', [
    ':name' => $name,
  ])
  ->execute();
```

### Not escaping LIKE
Typically when using the database API, using the `condition` method and passing user input as the value is safe. However, if you are using the `LIKE` condition, you need to escape user input that may contain the wildcard character (`%`). For example, this code has user input (`$name`) in a `LIKE` condition:
```
$result = \Drupal::database()
  ->delete('people')
  ->condition('name', '%_' . $name, 'LIKE')
  ->execute();
```
If `$name` is set to a malicious value, like:
```
$name = '%';
```
The final query ends up being:
```
DELETE FROM people WHERE name LIKE "%_%"
```
Which would delete every row in the `people` table where the name included an underscore. The proper way to do this is to escape the user input using the `escapeLike` method, like so:
```
$database = \Drupal::database();
$result = $database
  ->delete('people')
  ->condition('name', '%_' . $database->escapeLike($name), 'LIKE')
  ->execute();
```

### Trusting user operators
Passing user input as a condition value is generally safe, but passing it to other parts of the API like table names, column names, or condition operators is dangerous. For example, this code has user input (`$operator`) as a condition operator:
```
$result = \Drupal::database()
  ->select('people')
  ->condition('name', $name, $operator)
  ->execute();
```
If `$operator` is set to a malicious value, like:
```
$operator = 'IS NOT NULL)
UNION ALL SELECT SID,SSID FROM SESSIONS
JOIN USERS WHERE ("foo" <>';
```
The final query ends up being:
```
SELECT FROM people WHERE (name IS NOT NULL)
UNION ALL SELECT SID,SSID FROM SESSIONS
JOIN USERS WHERE ("foo" <> :name)
```
Which would query all session IDs from the `sessions` table, allowing user sessions to be hijacked.

To address this, compare the user input to a list of known valid SQL operators before using it in the query.  

### General SQL tips
If you use the database API in a typical, non-complex way, you’ll probably be fine. Just remember to use placeholders, escape user input when used in a `LIKE` statement or as an operator, and try to never write queries by hand.  

## So you want to write some code…
Beyond Drupal specific APIs, a lot of your code is just plain PHP, which comes with its own set of security issues. One last kind of exploit I’ll briefly cover is remote code execute, otherwise known as RCE.

RCE occurs when a malicious user identifies an exploit that allows user input to be executed as server-side code, most commonly by your runtime language (PHP) or the shell. RCE allows an attacker to do anything your web user can do, which could be everything from reading sensitive data, setting up a persistent backdoor, or using the compromised server to reach more servers on your network.

PHP, historically, has allowed for RCE in a lot of different ways, so there’s no golden rule to follow. Instead, watch out for some of the RCE classics:

Using user input to execute shell commands:
```
`magick convert $user_input output.png`;
shell_exec("magick convert $user_input output.png");
```
You could use the `escapeshellarg` function here to escape user input, but that isn’t foolproof as options (`--foo=bar`) are just wrapped in quotes, which in some command line applications is treated as a valid option. Validating the user input against a small set of allowed characters may be the best bet here, in addition to using `escapeshellarg`.

Using `eval` to execute dynamic PHP expressions:
```
eval("is_null($user_input)");
```
This allows arbitrary PHP to be executed and should not be used.

Using `unserialize` on data that could be entered by the user:
```
unserialize($user_input);
```
This allows for object injection, a vulnerability that can lead to RCE, and should be avoided if possible. Consider storing complex data as JSON instead, which is safe to use.

Without a deep experience in how RCE exploits are performed it’s hard to spot vulnerabilities, but you should review any code that has dynamic shell commands, eval, or unserialize with a high level of scrutiny.  

## A parting thought
Information like this can be daunting, but the best way to apply it to your work is to research common vulnerabilities, try a few exploits out, and make security a part of your company’s culture as well as code. Once you start thinking about security it’s hard to get it out of your head - does your company properly use encryption? Is two factor authentication enforced? How’s your office’s physical security? Being aware of these issues can lead to improvements that extend far beyond your custom code.
