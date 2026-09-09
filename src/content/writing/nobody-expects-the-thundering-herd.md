---
title: "Nobody expects the thundering herd"
description: "A retry storm took out authentication for a sharded MSSQL estate. Blocking traffic stopped the bleeding; only an architectural change fixed it."
published: 2022-11-19
kind: "War story"
tags: ["Reliability", "Platform engineering"]
origin:
  label: "LinkedIn, November 2022"
  href: "https://www.linkedin.com/pulse/nobody-expects-thundering-herd-allan-degnan"
---

<!--
SCAFFOLD — no body yet. The page exists and is crawlable; it shows the
metadata and sends the reader to the original. Paste the text below
this comment and the page renders it instead. Nothing to flip.

Beats: eight-way sharded MSSQL behind centralised auth; `getSyncData()`
   backing up; Redis failure cascading into system-wide auth collapse;
   blocking traffic as symptomatic relief; resolved with Kafka, ksql and
   Cassandra plus exponential backoff and jitter, 70-90% latency
   improvement; the aside about a CTO who would not say "downtime".

   This one names an identifiable employer's outage, with customer losses.
   That reads differently on a company domain than on a personal profile —
   settle the anonymising before it goes live.

   When bringing it over: paste the text, then it needs a copy pass
   (spelling, wording), the images exporting from LinkedIn, and the
   employer or customer anonymising if the piece names one.
-->
