---
layout: blog
body-class: blog-post
topic: technology
title: Skipping a Version - Migrating from Drupal 6 to Drupal 8 with Drupal Migrate
homepage: false
author: danruscoe
published: true
featured: false
short: The differences between Drupal 6 and Drupal 8 are pretty major, but thankfully, making the jump is singificantly easier with Drupal Migrate.
tags:
  - Drupal
  - Migrate
  - Drupal Planet
date: 2017-05-19 12:30:00
image: https://thinkshout.com/assets/images/thinkshout-logo1.jpg
---
I recently had the opportunity to migrate content from a Drupal 6 site to a Drupal 8 site. This was especially interesting for me as I hadn’t used Drupal 6 before. As you’d expect, there are some major infrastructure changes between Drupal 6 and Drupal 8. Those differences introduce some migration challenges that I’d like to share.

The [Migrate module](https://www.drupal.org/project/migrate) is a wonderful thing.  The vast majority of node-based content can be migrated into a Drupal 8 site with minimal effort, and for the content that doesn’t quite fit, there are custom migration sources. A custom migration source is a small class that can provide extra data to your migration in the form of source fields. Typically, a migration will map source fields to destination fields, expecting the fields to exist on both the source node type and destination node type. We actually published an in-depth, [two-part blog series about how we use Drupal Migrate](https://thinkshout.com/blog/2017/01/using-google-docs-and-migrate-to-populate-your-drupal-site-part-1/) to populate Drupal sites with content in conjunction with Google Sheets in our own projects. 

In the following example, we are migrating the value of content_field_text_author from Drupal 6 to field_author in Drupal 8. These two fields map one-to-one:

```yaml
id: book
label: Book
migration_group: d6
deriver: Drupal\node\Plugin\migrate\D6NodeDeriver
source:
  key: migrate
  target: d6
  plugin: d6_node
  node_type: book
process:
  field_author: content_field_text_author
destination:
  plugin: entity:node
  ```

This field mapping works because content_field_text_author is a table in the Drupal 6 database and is recognized by the Migrate module as a field. Everyone is happy.

However, in Drupal 6, it’s possible for a field to exist only in the database table of the node type. These tables look like this:

```sql
mysql> DESC content_type_book;
+----------------------------+------------------+------+-----+---------+-------+
| Field                      | Type             | Null | Key | Default | Extra  |
+----------------------------+------------------+------+-----+---------+-------+
| vid                        | int(10) unsigned | NO   | PRI | 0             |   |
| nid                        | int(10) unsigned | NO   | MUL | 0           |   |
| field_text_issue_value     | longtext         | YES  |     | NULL |   |
+----------------------------+------------------+------+-----+---------+-------+
```

If we want to migrate the content of field_text_issue_value to Drupal 8, we need to use a custom migration source.

Custom migration sources are PHP classes that live in the src/Plugin/migrate/source directory of your module. For example, you may have a PHP file located at src/Plugin/migrate/source/BookNode.php that would provide custom source fields for a Book content type.

A simple source looks like this:

```php
namespace Drupal\custom_migrate_d6\Plugin\migrate\source;

use Drupal\node\Plugin\migrate\source\d6\Node;

/**
 * @MigrateSource(
 *   id = "d6_book_node",
 * )
 */
class BookNode extends Node {

  /**
   * @inheritdoc
   */
  public function query() {
    $query = parent::query();

    $query->join('content_type_book', 'book', 'n.nid = book.nid');
    $query->addField('book', 'field_text_issue_value');

    return $query;
  }

}
```
As you can see, we are using our migration source to modify the query the Migrate module uses to retrieve the data to be migrated. Our modification extracts the field_text_issue_value column of the book content type table and provides it to the migration as a source field.

To use this migration source, we need to make one minor change to change to our migration. We replace this:

plugin: d6_node

With this:

plugin: d6_book_node

We do this because our migration source extends the standard Drupal 6 node migration source in order to add our custom source field.

The migration now contains two source fields and looks like this:

```yaml
id: book
label: Book
migration_group: d6
deriver: Drupal\node\Plugin\migrate\D6NodeDeriver
source:
  key: migrate
  target: d6
  plugin: d6_book_node
  node_type: book
process:
  field_author: content_field_text_author
  field_issue: field_text_issue_value
destination:
  plugin: entity:node
 ```

You’ll find you can do a lot with custom migration sources, and this is especially useful with legacy versions of Drupal where you’ll have to fudge data at least a little bit. So if the Migrate module isn’t doing it for you, you’ll always have the option to step in and give it a little push.
