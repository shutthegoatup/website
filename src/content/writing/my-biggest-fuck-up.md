---
title: "My biggest fuck up"
description: "Twenty-two years old, first day as a developer, production database dropped. What happened next is the whole argument for what an engineering culture actually is."
published: 2024-05-23
kind: "War story"
tags: ["Culture", "Reliability"]
cover: "./images/my-biggest-fuck-up/cover.png"
coverAlt: "My biggest fuck up"
---

So I'm 22, doing interesting work, kicking ass, chewing bubblegum, and building
a tower of depleted coke cans.

But I didn't start there.

## Levelling up

On joining Positron Systems Ltd I was hired to do 1st / 2nd level
support. You know, answering the phones, emails, responding to tickets, and
trying to fix people's issues.

Now at Positron, there was a stark difference between me and the other support
reps. My metrics were extremely weak. When examining the number of tickets
processed, my numbers hovered around the 4 mark whilst my colleagues were
hitting 20.

You see an interesting thing happens when you implement process and look at
metrics. People test the fences. In your typical kanban style system where you
work on one item and pick from the top of the board, people skip the hard
tickets.

I, in my ultimate wisdom, picked from the top of the board, escalated 0
tickets, and for that my reward was to pick up my shit and go to the other
room. As a developer.

![](./images/my-biggest-fuck-up/01.png)

_mine mine mine mine mine_

## Interesting times

Positron 2007 was actually a pretty interesting place. You know we're talking
about just a year after the initial release of AWS, years before the term cloud
was actually coined, they're running this nascent cloud provider, which speaks
to an abnormal level of ability contained in this random startup in this random
town in the central belt of Scotland.

And you know what else was interesting?

They edited the files live on the server.

![](./images/my-biggest-fuck-up/02.png)

_Oh fuck no_

## Implementing process

Now 2007 me was smart enough to know what I didn't know, and I knew I had no
business fucking with files live on the server when I barely understood the
app.

So a plan was hatched. I was going to bootstrap the dev environment!

I'd do this for two reasons: 1) so I could test my changes without causing
downtime, and 2) so I could understand how the stack was put together.

It was actually one of the more interesting tasks I've ever done:

- I racked, networked and powered the servers.
- I installed the management layer that acted as a PXE boot service for xen
  hypervisor nodes.
- I installed our Control Panel, which gave customers the ability to configure
  workloads on the fleet.
- And I accidentally deleted the production database.

![](./images/my-biggest-fuck-up/03.png)

_Did the site just go down for anyone else?_

Yep, that's right.

On my first day, of my first ever dev job, I accidentally deleted the
production database.

## How the fuck

It was simple really.

- Export production mysql database.
- Import production schema into dev.
- Get random locale error or something.
- Google problem.
- Fix config.
- Drop database.

## Aftermath

There was a lot of yelling. Safe to say the big boss man was not very pleased
with me. Someone told me they'd never made a mistake on production. Fucking
liar. And to make matters worse, everyone with the ability to restore backups
was out at lunch.

My manager took me into a room.

I felt nauseated. I can't imagine Anders Holm enjoyed the prospect of ending
a 22 year old's career, and he didn't. Calmer heads prevailed.

> You get 3 of these. You've spent 1. Now go and finish your task.

Something broke in me that day. No longer was I the cocky kid who did tasks
wicked swift, I was now an old grey beard measuring thrice, considering
possible eventualities and sweating the consequences.

My performance sucked.

It took a long time to come to terms with the fact that I was indeed fallible,
and that people make mistakes, and this was not a determination of either
talent or potential.

It took a while to become productive.

## Reflecting back

Positron had a lot of reasons to end my career.

- My call metrics sucked.
- I caused a global outage.
- My performance sucked.

Did I mention this entire story takes place during the Global Financial Crisis?
It would have been easy to replace me, and it would have been unlikely that I'd
easily land a similar role where I could grow.

But they didn't.

Positron had an Engineering Culture.

For all their faults, the yelling, the punching of walls, the company was led
by people who could empathise with what we were doing, who'd been there and
done that, who could see it was a reasonable mistake.

They told me stories of their own fuckups so I could get over mine; I've told
this story at least 10 times to help someone else get over theirs.

_Names changed. The mistakes are still mine._
