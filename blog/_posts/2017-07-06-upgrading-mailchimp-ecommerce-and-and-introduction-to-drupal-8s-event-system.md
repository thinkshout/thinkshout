---
layout: blog
body-class: blog-post
topic: archive
title: Upgrading MailChimp eCommerce and an Introduction to Drupal 8's Event System
homepage: false
author: dan
published: true
featured: true
short: Get your hooks out of Drupal with Drupal 8's event system.
tags:
  - Drupal Planet
  - MailChimp
  - Mailchimp eCommerce
  - Drupal 8
  - Events
date: 2017-07-06 16:00:00
image: https://thinkshout.com/assets/images/thinkshout-logo1.jpg
---
If you’ve ever built a Drupal 7 module, then you’ll be familiar with hooks: functions that allow modules to react to things happening in other modules. The hook system is functionally fine but, with so many hooks to implement, .module files often become bloated and difficult to manage.

Drupal 8’s event system does a lot to reduce the clutter of hooks. Now, instead of using a hook, you can create an event subscriber that will execute your code every time a module triggers an event. This is similar to the hook system only in the effect; the execution is very different.

Porting our popular MailChimp eCommerce module to Drupal 8 gave me the perfect opportunity learn about the event system. I use the word “opportunity” to disguise the fact that I was forced to learn how events work because it was impossible to port the module without doing so.

The MailChimp eCommerce module depends on the Commerce module, naturally, and in Drupal 8, the Commerce module makes heavy use of events.

First, let’s look at an event. I’m using an example ripped straight from Commerce.

The Commerce submodule, Commerce Cart, contains a class named ``CartEntityAddEvent``. You can [find it here](http://cgit.drupalcode.org/commerce/tree/modules/cart/src/Event/CartEntityAddEvent.php?h=8.x-2.x).

The class itself is simple; it’s designed to store a few values - the cart, the item being added to the cart, and the quantity of that item. The class also has a few getter functions for convenience.

Most importantly, this class represents an event that’s triggered every time a user adds an item to their shopping cart. This is done using just two lines of code:

```php
$event = new CartEntityAddEvent($cart, $purchased_entity, $quantity, $saved_order_item);
$this->eventDispatcher->dispatch(CartEvents::CART_ENTITY_ADD, $event);
```

The event class is created with all the relevant values, then “dispatched” to any event subscribers configured to pay attention to it. When dispatched, the event is identified by a constant - ``CartEvents::CART_ENTITY_ADD``. This constant is used by event subscribers, which we’ll take a look at now.

This is a cut-down version of an event subscriber used by our [MailChimp eCommerce module](https://www.drupal.org/project/mailchimp_ecommerce).

```php
/**
 * Event Subscriber for Commerce Carts.
 */
class CartEventSubscriber implements EventSubscriberInterface {

  /**
   * The Cart Handler.
   *
   * @var \Drupal\mailchimp_ecommerce\CartHandler
   */
  private $cart_handler;

  /**
   * The Order Handler.
   *
   * @var \Drupal\mailchimp_ecommerce\OrderHandler
   */
  private $order_handler;

  /**
   * CartEventSubscriber constructor.
   *
   * @param \Drupal\mailchimp_ecommerce\CartHandler $cart_handler
   *   The Cart Handler.
   * @param \Drupal\mailchimp_ecommerce\OrderHandler $order_handler
   *   The Order Handler.
   */
  public function __construct(CartHandler $cart_handler, OrderHandler $order_handler) {
    $this->cart_handler = $cart_handler;
    $this->order_handler = $order_handler;
  }

  /**
   * Respond to event fired after adding a cart item.
   */
  public function cartAdd(CartEntityAddEvent $event) {
    /** @var \Drupal\commerce_order\Entity\Order $order */
    $order = $event->getCart();

    /** @var \Drupal\commerce_order\Entity\OrderItem $order_item */
    $order_item = $event->getOrderItem();

    $product = $this->order_handler->buildProduct($order_item);

    $this->cart_handler->addCartLine($order->id(), $order_item->id(), $product);
  }

  /**
   * {@inheritdoc}
   */
  public static function getSubscribedEvents() {
    $events[CartEvents::CART_ENTITY_ADD][] = ['cartAdd'];

    return $events;
  }

}
```

[Here’s the complete version, if you’re interested](https://github.com/thinkshout/mailchimp_ecommerce/blob/8.x-1.x/modules/mailchimp_ecommerce_commerce/src/EventSubscriber/CartEventSubscriber.php).

So what does it do, exactly?

Let’s start with the ``getSubscribedEvents()`` function. This is where we define which events we want to subscribe to, and assign each event a processing function. Here we are subscribing to just one event, the “cart entity add” event, and assigning the ``cartAdd()`` function as a processor.

Note that the ``cartAdd()`` function takes one argument, an instance of the ``CartEntityAddEvent`` class. That’s the same class we looked at earlier - the event class defined in the Commerce Cart module. This is where our module reacts to that event being triggered.

The ``cartAdd()`` function itself extracts the order and item information from the event and uses an instance of the ``CartHandler`` class, provided by the MailChimp eCommerce module, to send updated cart information to MailChimp’s API.

One final thing:

Event subscribers won’t work unless they are defined as a service. Services are defined in a module’s *.services.yml file, which you can [learn more about here](https://www.drupal.org/docs/8/api/services-and-dependency-injection/structure-of-a-service-file).

The service definition for the ``CartEventSubscriber`` looks like this:

```yaml
mailchimp_ecommerce_commerce.cart_event_subscriber:
    class: '\Drupal\mailchimp_ecommerce_commerce\EventSubscriber\CartEventSubscriber'
    arguments: ['@mailchimp_ecommerce.cart_handler', '@mailchimp_ecommerce.order_handler']
    tags:
      - { name: event_subscriber }
```

We identify the class using its namespace, inject the “cart_handler” and “order_handler” services, then, finally, tag the service as an “event_subscriber”. [Check out the full file here](https://github.com/thinkshout/mailchimp_ecommerce/blob/8.x-1.x/modules/mailchimp_ecommerce_commerce/mailchimp_ecommerce_commerce.services.yml). Just for completeness, the two injected services are defined in [here](https://github.com/thinkshout/mailchimp_ecommerce/blob/8.x-1.x/mailchimp_ecommerce.services.yml).

I’m a big fan of how Drupal 8 has shifted towards a more object-oriented way of doing things. It’s more organized, promotes consistency between modules, and, best of all, finally signals an end to massive .module files.


