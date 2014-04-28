---
title: Salesforce "Big Data" for Facing History and Ourselves
author: brandon
layout: post
published: false
featured: false
---

## The Introduction
[Facing History and Ourselves](http://facinghistory.org) is an international educational and professional development organization whose mission is to engage students of diverse backgrounds in an examination of racism, prejudice, and antisemitism in order to promote the development of a more humane and informed citizenry. As part of their recent [site launch](http://thinkshout.com/work/facing-history/), ThinkShout was tasked with synching their new Salesforce instance, built by our partner on the project, [Kell Partners](http://www.kellpartners.com/), with Drupal. This is a use case tailor made for the Salesforce Suite, and one that we have lots of experience with including recent projects for the [Los Angeles Conservancy](http://thinkshout.com/work/la-conservancy) and the [Forum of Regional Association of Grant Makers](https://www.getpantheon.com/blog/how-teams-are-launching-17-drupal-websites-single-distribution), however there was one small difference. Actually a big one: for Facing History we had to sync 300,000+ plus records in near real time as opposed to tens of thousands. How this was accomplished was an exercise in troubleshooting, scripting and patience.

The Drupal [Salesforce Suite](https://drupal.org/project/salesforce) allows any [Drupal entity to be synchronized with any Salesforce object](http://localhost:4000/blog/2012/11/lev/salesforce-rest-oauth/), with field level granularity and directionality. Data can be pushed from Drupal in real time or can be batched. Data from Salesforce is pulled into a queue at regular intervals and then a configurable amount of queued records are processed during those intervals. During processing, contacts and orgs in [RedHen CRM](https://drupal.org/project/redhen) are created or updated, keeping the user experience of managing contact data within the Drupal site. In future phases, we will add engagement scoring to the mix by scoring user engagements on the website and pushing that data back to Salesforce.

## The Challenge
Getting 300,000+ records into the queue was a relatively quick operation taking less than 4 hours. Processing those records was much more time consuming as only a few hundred records were processed during a single cron run. Since the site is hosted on Pantheon, the standard cron run is hourly, which would mean the processing would take weeks. Even manually triggering the process would take days. We needed a better solution.

## The Solution
One of the ways to improve this process was to allow more records to be processed during the cron run. The default worker timeout was set to 180 seconds (3 minutes).  Meaning that every hour, records from the queue were processed for 3 minutes and then nothing would happen until the next cron run. So that timeout was altered (using `hook_cron_queue_info_alter()`) to 3600 seconds (1 hour). We also wanted to limit other processes from running during this time. Just firing off cron processes _all_ cron tasks from all modules. Running `drush queue-run` we could just process the queue worker identified. But it would still require someone manually running that command every hour. That command also allows queue processing in parallel, which theoretically would process the records even faster.

[TODO: Show snippet of the bash script.]

We created a bash script which would process the queue every hour running multiple parralel threads. During our testing, however, we quickly realized that running parallel Drupal processes caused MySQL deadlocks. [TODO: Explain this!] We spent some time researching ways to prevent this, but in the end decided that it would be better to improve the way that records were imported in the SalesForce module.

One of the first improvements was to review a bug fix that force the saving of a Drupal entity before adding mapped fields. This was done so that an Entity ID was available for a Relation. This was causing a double save for all records being imported. The updated code only saved the entity if the ID was needed for the Relation.

```diff
--- a/modules/salesforce_mapping/includes/	salesforce_mapping.fieldmap_type.inc
+++ b/modules/salesforce_mapping/includes/	salesforce_mapping.fieldmap_type.inc
@@ -158,6 +158,13 @@ function salesforce_mapping_related_entity_fieldmap_pull_value($entity_wrapper,
   }
   // Handle relations.
   elseif (module_exists('relation') && isset($info['relation_type'])) {
+    // We cannot create relationships between new items. We are saving them here
+    // to avoid performing a duplicate save for all entities in
+    // salesforce_pull_process_records().
+    if (!$info['parent']->getIdentifier()) {
+      $info['parent']->save();
+    }
```

Another performance improvement came from changing the way field mappings where handled if an error was thrown. Previously if an error was thrown while updating a mapping the mapping object (the entity that links Drupal entities to Salesforce objects) was not created or if it existed was removed. Instead now if a valid entity ID is present the mapping is still saved. This cause less errors and allowed for better data syncing.

```diff
--- a/modules/salesforce_pull/salesforce_pull.module
+++ b/modules/salesforce_pull/salesforce_pull.module
@@ -234,27 +234,6 @@ function salesforce_pull_process_records($sf_object) {

         salesforce_pull_map_fields($sf_mapping->field_mappings, $wrapper, $sf_object);
         $wrapper->save();
-
-          // If no id exists, the insert failed.
-          list($entity_id) = entity_extract_ids($sf_mapping->drupal_entity_type, $entity);
-          if (!$entity_id) {
-            throw new Exception('Entity ID not returned, insert failed.');
-          }
-
-          // Create mapping object.
-          $mapping_object = entity_create('salesforce_mapping_object', array(
-            'salesforce_id' => $sf_object['Id'],
-            'entity_type' => $sf_mapping->drupal_entity_type,
-            'entity_id' => $entity_id,
-          ));
-
-          watchdog('Salesforce Pull',
-            'Created entity %label associated with Salesforce Object ID: %sfid',
-            array(
-              '%label' => $wrapper->label(),
-              '%sfid' => $sf_object['Id'],
-            )
-          );
       }
       catch (Exception $e) {
         $message = $e->getMessage() . ' ' . t('Processing failed for entity %label associated with Salesforce Object ID: %sfobjectid',
@@ -266,6 +245,28 @@ function salesforce_pull_process_records($sf_object) {
         watchdog('Salesforce Pull', $message, array(), WATCHDOG_ERROR);
         salesforce_set_message('There were failures processing data from SalesForce. Please check the error logs.', 'error', FALSE);
       }
+
+        // If no id exists, the insert failed and we cannot create a mapping
+        // object. We are left with no choice but to throw an exception.
+        list($entity_id) = entity_extract_ids($sf_mapping->drupal_entity_type, $entity);
+        if (!$entity_id) {
+          throw new Exception('Failed to create Drupal entity when processing data from Salesforce.');
+        }
+
+        // Create mapping object.
+        $mapping_object = entity_create('salesforce_mapping_object', array(
+          'salesforce_id' => $sf_object['Id'],
+          'entity_type' => $sf_mapping->drupal_entity_type,
+          'entity_id' => $entity_id,
+        ));
+
+        watchdog('Salesforce Pull',
+          'Created entity %label associated with Salesforce Object ID: %sfid',
+          array(
+            '%label' => $wrapper->label(),
+            '%sfid' => $sf_object['Id'],
+          )
+        );
```

After we had completed a test run of the import. We were ready to import data into the production instance of the new site. We had decided to set Cron to never run to again limit the amount of processes running at the time of the import. We also did not want to recreate the parrallel issues we discovered during the our tests with our scripted solution.  Drupal's built in Cron management was configured to never run. After our first production test run of a few thousand records over 3 hours we noticed that we were still getting deadlocks. Upon investigation it was found that Pantheon runs cron against their production instances using drush. A process which does not respect the "Never run" configuration. Pantheon had documentation about this which lead us to [Elysia Cron](https://drupal.org/project/elysia_cron). This module does prevent cron from running by setting the "Globally Disable" flag. This module gives itself the highest system weight so that its hook_cron is the first to run. And if that flag is set Elysia Cron stops the process.

# Conclusion
At the end of the day 300,000+ records were successfully imported. Many lessons were learned. And significant improvements were made to the Salesforce Suite. Facing History and Ourselves provided us with an opportunity to go further than we ever had before in understanding and improving upon this process.
