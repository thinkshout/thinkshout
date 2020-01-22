---
layout: blog
body-class: blog-post
topic: technology
title: Drupal 8 Routing Tricks for Better Admin URLs
homepage: false
author: dan
published: true
featured: false
short: Utilize Drupal 8's routing system for a better admin experience.
tags:
  - Drupal
  - Drupal 8
  - Drupal Planet
  - NCYL
date: 2016-07-20 14:30:00
image: https://thinkshout.com/assets/images/thinkshout-logo1.jpg
---

We recently launched a new case tracker for foster ed youth designed to improve their educational outcomes in partnership with [The National Center for Youth Law](http://youthlaw.org/) (NCYL). The web application replaces their existing platform, Goal Book, which lacked the flexibility they needed to meet their requirements. A web application differs from a website in that a website primarily provides *content* where a web application primarily provides *tools*.

The project presented us with an opportunity to do extensive custom development with our favorite new platform, Drupal 8. D8's many developer experience improvements, including standardized object-oriented development methods, allowed us to meet NCYL's requirements efficiently and with a level of quality that would have been more difficult on Drupal 7. In addition, we were able to accelerate the release of [RedHen CRM](https://drupal.org/project/redhen) on [Drupal 8](https://www.drupal.org/project/redhen/releases/8.x-1.0-alpha1), which lives at the heart of the application managing all of the contacts, organizations, and relationships.

To enhance the utility of the application, we made an early decision to customize every URL a user would interact with. As most of the functionality would revolve around nodes, we wanted to make sure we avoided URLs like `/node/256/edit` that don't give the user any indication of which part of the application they're using.

## Implementation

If you wanted to customize URLs in Drupal 7, you could use the [Pathauto](https://www.drupal.org/project/pathauto) module. You can still do that in Drupal 8, but D8's routing system can be coaxed into doing something similar. It works on admin pages, too, which was perfect for NCYL's needs.

## Overriding Existing Node Paths

As an example, let's say you have a node type specifically for storing information about schools: a School Node. The standard admin path for adding a School Node would be something like this:

`/node/add/school`

But, add a custom module with route configuration and you can have this:

`/school/add`

For simplicity, we'll call our module **school.module**. The directory structure looks like this:

```
modules/
  school/
    school.module
    school.routing.yml
```

The route configuration sits inside **school.routing.yml** and looks like this:

~~~yaml
school.add:
  path: '/school/add'
  defaults:
    _controller: '\Drupal\node\Controller\NodeController::add'
    _title: 'Add School'
    node_type: 'school'
  requirements:
    _node_add_access: 'node:school'
~~~

Line by line:

`school.add:`

This is the name of the route. Route names should be unique and usually start with the name of your module.

`path: '/school/add'`

The path the route points to. This is the part that comes after your site's base URL.

`_controller: '\Drupal\node\Controller\NodeController::add'`

This tells the route to use the NodeController, provided by the Node module. No need for a custom controller here.

`_title: 'Add School'`

This sets the page title of the node add form.

`_node_add_access: 'node:school'`

This is an access handler that ensures the user has permission to add a node of type "school."

Providing a custom path to edit School Nodes is even easier:

~~~yaml
school.edit:
  path: '/school/{node}/edit'
  defaults:
    _entity_form: 'node.edit'
  requirements:
    node: \d+
    _entity_access: 'node.update'
~~~

We no longer need to tell the route which controller to use or what type of node we're using. Drupal 8's Entity API figures it out using the node ID passed in the URL.

Line by line again:

`path: '/school/{node}/edit'`

The path now contains a placeholder, {node}, which represents the node ID in the URL.

`_entity_form: 'node.edit'`

The form we want to use to edit the node.

`node: \d+`

Some validation to ensure the URL contains the right data type for a node ID. By specifying the regular expression pattern `\d+`, we are telling Drupal to only use this route when `{node}` is one or more digits. The route will match a URL like /school/32/edit, but will not match /school/lincoln-high/edit.

`_entity_access: 'node.update'`

An access handler, ensuring the user has permission to update this node. No need to specify the node type, as we did when adding a node.

Finally, a route for viewing the node:

~~~yaml
school.view:
  path: '/school/{node}'
  defaults:
    _controller: '\Drupal\node\Controller\NodeViewController::view'
  requirements:
    node: \d+
    _entity_access: 'node.view'
~~~

Very similar to the node edit route, just with a different path and controller.

For a more thorough explanation of routes and route options not covered here, check out the [official docs](https://www.drupal.org/node/2092643).

## Custom Controllers

What if you want to provide a custom controller for adding a node and still take advantage of Drupal's permissions system? Routes can do that, too.

Let's introduce a Teacher Node and an accompanying module.

```
modules/
  school/
  teacher/
    src/
      Controller/
        TeacherController.php
    teacher.module
    teacher.routing.yml
```

**teacher.routing.yml** looks like this:

~~~yaml
teacher.add:
  path: '/teacher/add'
  defaults:
    _controller: '\Drupal\teacher\Controller\TeacherController::addTeacher'
    _title: 'Add Teacher'
    node_type: 'teacher'
  requirements:
    _node_add_access: 'node:teacher'
~~~

Very similar to the route we used to add School Nodes, but with a custom controller.

**TeacherController.php** looks like this:

~~~php
<?php
namespace Drupal\teacher\Controller;

use Drupal\node\NodeTypeInterface;

class TeacherController extends ControllerBase {

  public function addTeacher(NodeTypeInterface $node_type) {

  }

}
~~~

The **addTeacher** function is where you would add your custom code for adding Teacher Nodes.

That's how you can use core Drupal 8 functionality to make your Drupal admin pages a little more user friendly.
