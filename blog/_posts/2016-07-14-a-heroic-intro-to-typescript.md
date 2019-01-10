---
layout: blog
body-class: blog-post
topic: technology
title: A Heroic Introduction to TypeScript
homepage: false
author: eric
published: true
featured: true
short: Add static typing and object oriented features to your JavaScript.
tags:
  - TypeScript
  - JavaScript
  - Front end
  - Angular
date: 2016-07-14 12:00:00
image: /assets/images/ts_icon.jpg
---

[TypeScript](https://www.typescriptlang.org/) was released in 2012. When I first encountered it, I didn’t want to learn another version of a language I was already working with. My interest was renewed with the release of Angular 2, which is written in TypeScript. 

One of the best features of TypeScript is that it is a superset of JavaScript. TypeScript adds static typing and object oriented features to the language.  Since it is a superset, you can write JavaScript in TypeScript files and it still works. You can also include existing JavaScript code and it still works.

TypeScript is open source and maintained by Microsoft. Anders Hejlsberg, an architect of C#, is a core developer of TypeScript.

## Installation
Installing TypeScript is effortless with NodeJs and NPM.

~~~typescript
npm install -g typescript
~~~

Verify your installation with `tsc -v`.  This will print the TypeScript version number in your terminal window.

## File names / Compiling
TypeScript files end in `.ts`. They are compiled to `.js` files.  Let’s try out your installation. Create a folder called `hero_game`. Then inside that folder add a file called `hero.ts`.  Inside that file, create an add function.

~~~typescript
function jump(character, height) {
	return character + ‘ jumped ‘ + height + ‘ high.’;
}

jump(‘Mario’, 10);
~~~

Now use the terminal to compile your file.

```shell
$ tsc hero.ts
```

This creates a file called `hero.js`.  When you open that file, you should see the same code since we wrote JavaScript without any of the additional TypeScript features. 

TypeScript has a `watch` command as well. You can use `tsc -w` to watch for changes to your files. They will be compiled as you save your changes.

You might want to see some output from your code. Create a basic `index.html` file. We’ll include our files and write our output to the body.


{% raw %}
~~~html
<html>
	<head>
		<title>Hero Game</title>
	</head>
	<body>
		<script src=“hero.js”></script>
	</body>
</html>
~~~
{% endraw %}

## Type Annotations
TypeScript adds typing to JavaScript, which is an untyped language.  As it stands, our `jump()` function doesn’t care what type of data we pass into it. We could use a number or an array for the character name.  What if we wanted to make sure our character name was a string and the height was a number? TypeScript allows us to use type annotation that it checks at compile time.

Let’s change our function to check for the types we want. 

~~~typescript
function jump(character: string, height: number) {
	return character + ‘ jumped ‘ + height + ‘ high.’;
}

document.body.innerHTML = jump([1, 2, 3], 10);
~~~

Notice we’ve substituted our character name for an array. When it’s compiling, you should see the following:

~~~shell
$ Argument of type 'number[]' is not assignable to parameter of type 'string’
~~~

This is TypeScript giving us some type safety. Now we can ensure our function only accepts the type of parameters we want.

## Basic types
TypeScript has the same basic types as JavaScript. Additionally, it has `enum`, `any` and `void` types. You can view all of the types in the [TypeScript Handbook](http://www.typescriptlang.org/docs/handbook/basic-types.html).

## A Heroic Example
Let’s expand our hero example a bit more. Let’s define a character _interface_ and pass that into our function.  We’ll create a TypeScript interface and update our function signature to take that interface instead of just a string.

~~~typescript
interface Character {
	name: string;
	title: string;
}

function jump(character: Character, height: number) {
	return `${character.name}, the ${character.title}, jumped ${height} feet high.`;
}

let mario = { name: "Mario", title: "plumber" };

document.body.innerHTML = jump(mario, 10);
~~~

In the above example, the `interface Character` describes the object we want to receive in our function. We’ve also used string interpolation for the string that returns from our function instead of using `+` to concatenate the values.

## Adding a Touch of Class
JavaScript is functional language, but ES2015 offers an object oriented approach. TypeScript lets us take advantage of those features now.  Let’s get a little classy with our hero. Update your `hero.ts` file with the following code:

~~~typescript
class Hero {
	name: string;
	title: string;
  	protected description: string;

	constructor(theName: string, theTitle: string) {
    		this.name = theName;
    		this.title = theTitle;
    		this.description = `${theName}, the ${theTitle}`;
  	}

  	describe() {
    		return this.description;
  	}
}

interface Character {
	name: string;
  	title: string;
}

function jump(character: Character, height: number) {
 	return `${character.name}, the ${character.title}, jumped ${height} feet high.`;
}

let princessPeach = new Hero('Princess Peach', 'royal');

let descriptionOfCharcter = princessPeach.describe();

document.body.innerHTML = descriptionOfCharcter;
~~~

Here we’ve created a new character. We’ve given here a description in our constructor. TypeScript also lets you use `public`, `private` and `protected` modifiers. Our `description` property is `protected` which means it can only be changed within the class or by a class that extends the `Hero` class.  All members are public by default.


## A Deeper Dive
I recommend getting into the [Handbook](https://www.typescriptlang.org/docs/handbook/basic-types.html) now that you’ve seen a basic approach to TypeScript. You can find more details on project configuration, modules and using decorators. A basic understanding of TypeScript is helpful when trying to dive into Angular 2. 
