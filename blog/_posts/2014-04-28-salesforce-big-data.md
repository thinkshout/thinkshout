---
title: |
  "Big Data" Challenges with Salesforce for Facing History and Ourselves
author: brandon
layout: blog
body-class: blog-post
topic:
header-image:
header-image-alt:

published: true
featured: false
short: Synchronizing 300,000+ Salesforce records with Drupal RedHen
tags:
  - Drupal Planet
  - RedHen
  - Salesforce
  - data
  - facing-history
---

## The Introduction
[Facing History and Ourselves](http://facinghistory.org) is an international educational and professional development organization whose mission is to engage students of diverse backgrounds in an examination of racism, prejudice, and antisemitism in order to promote the development of a more humane and informed citizenry. As part of their recent [site launch](/work/facing-history/), ThinkShout was tasked with synching their new Salesforce instance, built by our partner on the project, [Kell Partners](http://www.kellpartners.com/), with Drupal. This is a use case tailor made for the Salesforce Suite, and one that we have lots of experience with including recent projects for the [Los Angeles Conservancy](/work/la-conservancy) and the [Forum of Regional Association of Grant Makers](https://www.getpantheon.com/blog/how-teams-are-launching-17-drupal-websites-single-distribution), however there was one small difference. Actually, a big one. For Facing History, we had to sync 300,000+ plus records in near real time as opposed to tens of thousands. How this was accomplished was an exercise in troubleshooting, scripting, and patience.

The Drupal [Salesforce Suite](https://drupal.org/project/salesforce) allows any [Drupal entity to be synchronized with any Salesforce object](/blog/2012/11/lev/salesforce-rest-oauth/), with field level granularity and directionality. Data can be pushed from Drupal in real time or it can be batched. Data from Salesforce is pulled into a queue at regular intervals and then a configurable amount of queued records are processed during those intervals. During processing, contacts and orgs in [RedHen CRM](https://drupal.org/project/redhen) are created or updated, keeping the user experience of managing contact data within the Drupal site. In future phases, we will add engagement scoring to the mix by scoring user engagements on the website and pushing that data back to Salesforce.

## The Challenge
Getting 300,000+ records into the queue was a relatively quick operation that took less than 4 hours. Processing those records was much more time consuming as only a few hundred records were processed during a single cron run. Since the site is hosted on Pantheon, the standard cron run is hourly, which would mean the processing would take weeks. Even manually triggering the process would take days. We needed a better solution.

## The Solution

### Queue processing

One of the ways to improve this process was to allow more records to be processed during the cron run. The default worker timeout was set to 180 seconds (3 minutes).  Meaning that every hour, records from the queue were processed for 3 minutes and then nothing would happen until the next cron run. So that timeout was altered using `hook_cron_queue_info_alter()` to 3600 seconds (1 hour). We also wanted to limit other processes from running during this time. Just firing off cron processes _all_ cron tasks from all modules. Running `drush queue-run` we could just process the queue worker identified. But it would still require someone manually running that command every hour. That command also allows queue processing in parallel, which theoretically would process the records even faster.

We created a bash script which would process the queue every hour running multiple parallel threads:

~~~bash
#!/bin/sh

NUM_RUNS=$1
NUM_PROCESSES=$2

r=0

START=`date +%s`
while [ $r -lt $NUM_RUNS ]; do
  p=0
  run=$(($r+1))
  echo "Run: $run";
  while [ $p -lt $NUM_PROCESSES ]; do
    proc=$(($p+1))
    echo "Process: $proc";
    #create file with header and time stamp
    printf "Run: $run Process: $proc Log\n" > sync.R$run.P$proc.log
    drush @pantheon.facing-history.live queue-run salesforce_pull --strict=0 >> sync.R$run.P$proc.log &
    p=$proc
  done
  r=$run
  # Should match worker timeout
  sleep 3600
done
~~~
During our testing, however, we quickly realized that running parallel Drupal processes caused MySQL deadlocks. It appeared that this was caused by a lack of database transactions being created when doing field level operations. We spent some time researching ways to prevent this, but in the end decided that it would be better to improve the way that records were imported into the SalesForce module in the first place.

### Identify and remove inefficient code

While troubleshooting an unrelated issue, it was found that when pulling mapped [Relations](https://drupal.org) from Salesforce the entity ID was needed, but since the entity was not saved at the time of processing those mappings, the ID was not available yet. This was temporarily resolved to prevent errors by saving the entity before the mapping took place. Then the mappings were completed and the entity was saved again. This meant that whether a Relation was used or not, the entity was saved twice. To prevent this double save from causing a decrease in performance, a check was made to see if the pulled entity was mapped with a Relation. If so, the entity was saved to provide the entity ID. If not, the entity was only saved after the field mappings were completed.

~~~php
<?php
function salesforce_mapping_related_entity_fieldmap_pull_value($entity_wrapper, ...
// Handle relations.
elseif (module_exists('relation') && isset($info['relation_type'])) {
// We cannot create relationships between new items. We are saving them here
// to avoid performing a duplicate save for all entities in
// salesforce_pull_process_records().
if (!$info['parent']->getIdentifier()) {
	$info['parent']->save();
}
~~~

Another performance improvement came from changing the way field mappings were handled if an error was thrown. Previously, if an error was thrown while updating a mapping, the mapping object (the entity that links Drupal entities to Salesforce objects) was not created or, if it existed, was removed. Instead, now if a valid entity ID is present the mapping is still saved. This cause less errors and allows for better data syncing.

The function salesforce_pull_process_records in salesforce_pull.module was updated

from

~~~php
<?php
if ($mapping_object && ($sf_mapping->sync_triggers & SALESFORCE_MAPPING_SYNC_SF_UPDATE))
~~~
to

~~~php
<?php
$mapping_object = salesforce_mapping_object_load_by_sfid($sf_object['Id']);
$exists = $mapping_object ? TRUE : FALSE;
if ($exists && ($sf_mapping->sync_triggers & SALESFORCE_MAPPING_SYNC_SF_UPDATE)) {
~~~
The code checks for existence of an entity referenced by a mapping to ensure it exists, and behaves intelligently if it doesn't. Previously this would cause an unrecoverable sync state for objects.

### Query optimization

By analyzing queries using [New Relic](http://newrelic.com/) during Salesforce data pulls we were able to track down a troublesome frequently run query in the [Relation](https://drupal.org/project/relation) module that was used in the [Salesforce Mapping](http://drupalcode.org/project/salesforce.git/tree/refs/heads/7.x-3.x:/modules/salesforce_mapping) module to map related entities. Researching this led to a known issue [when dealing with a high volume of relations](https://drupal.org/node/1649398) caused by  [conditions on multi-column fields in Entity Field Query](https://drupal.org/node/1859084). In short, EFQ caused additional unneeded joins when creating the SQL query. Without the time to patch core, we created a custom Database API query duplicating the results of the EFQ without the extra joins. This resulted in a _700 times increase in performance_ in execution of that query.

Additionally, we found that EFQ always checks for node grants by joining on the node_grants table even when we are not dealing with nodes, in our case contacts. Elimination this join also resulted in improved query performance, although not as great an impact as the issue described above.

# Conclusion

After we completed a test run of the import in Pantheon's test environment, we were ready to import data into the production instance of the new site. We decided to set cron to "never run" to again limit the amount of processes running at the time of the import. We also did not want to recreate the parallel issues we discovered during the our tests with our scripted solution.  After our first production test run of a few thousand records over 3 hours, we noticed that we were still getting deadlocks. Upon investigation, we discovered that Pantheon runs cron against their production instances using drush, which does not respect the "never run" configuration. Pantheon had documentation about this which lead us to [Elysia Cron](https://drupal.org/project/elysia_cron). This module does prevent cron from running by setting the "Globally Disable" flag. This module gives itself the highest system weight so that its `hook_cron` is the first to run. And if that flag is set, Elysia Cron stops the process.

At the end of the day, 300,000+ records were successfully imported into Drupal from Salesforce. Many lessons were learned and significant improvements were made to the Salesforce Suite. Facing History and Ourselves provided us with an opportunity to go further than we ever had before in understanding and improving upon this process.
