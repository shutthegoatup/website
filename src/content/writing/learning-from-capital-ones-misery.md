---
title: "Learning from Capital One's misery"
description: "A misconfigured firewall, an over-privileged role, unencrypted PII and nobody watching the egress. Four failures, and the peer review, SAST, DAST and monitoring that catch each one."
published: 2019-07-30
kind: "Analysis"
tags: ["Security", "Platform engineering"]
---

Capital One is the most recent victim, or should I say culprit, of losing a
treasure trove of your PII data.

<!-- IMAGE 1 -->

Rather than joining the crowds calling for their heads or jumping to their
defence, today might be a good day to get our own shit in order. Why does this
keep happening? What can we do to stop our heads from being next on the
chopping block?

## What happened?

It's early days and there is only a limited amount of information available,
but we're able to ascertain that the following is alleged:

- The attacker is an ex-Amazon employee.
- A misconfigured firewall is the entry point.
- A role was obtained from, presumably, an instance, which had the name
  `*-WAF-Role`.
- The role was used to guzzle down a metric fuckton of PII data from an S3
  bucket.
- Some of the data was encrypted, but apparently they play fast and loose with
  your PII.
- Apparently they didn't know they were breached until some kind person emailed
  them.

A couple of things need to be said straight off the bat though.

- There's no evidence to suggest this has anything to do with insider threat.
- Amazon isn't a party in the security failings here.
- Claims that the attack was highly sophisticated appear to be greatly
  exaggerated.

If you're running around claiming that this is all because cloud is inherently
insecure or too complex to run stacks on, you need to re-evaluate your career.
If you're trying to use this to peddle your product, go jump off a bridge.
Misinformation like this is why we can't have nice things.

<!-- IMAGE 2 -->

Moving on, let's talk about our options to defend against such attacks.

## Misconfigured firewall

Firewalls are essential for locking down attack surfaces. Putting sensitive
services behind them and only exposing required ports is security 101.

But how do you protect against an engineer accidentally punching a hole?

- **Peer review.** Infrastructure as code is required to undertake peer
  reviews. But having senior technical people act as product owners for
  services, and as part of that, reviewing code before it is used to configure
  your cloud services — in particular Security Groups and NACLs — would help
  catch misconfiguration.
- **SAST.** Scan terraform. Look for Security Groups. Check if they're public.
  It's not hard. Further, presuming you're undertaking the peer review steps
  above, detecting changes in Security Groups and automatically adding a senior
  or security engineering team to review network changes is not rocket science.
- **DAST.** Tools like [Prowler](https://github.com/toniblyx/prowler) or
  [ScoutSuite](https://github.com/nccgroup/ScoutSuite) will alert to public
  Security Groups. This could be run as part of a CI/CD pipeline, blocking such
  changes without making specific exceptions, and nightly in order to alert on
  anyone bypassing CI/CD.
- **Protective monitoring.** AWS Config can be configured to monitor and alert
  based on changes to AWS Security Groups. CloudTrail combined with any tool
  with SIEM capabilities would allow you to look for changes and alert on them.
  Matching these back to valid peer reviews would put you ahead of the curve.

You're safe with your cloud's implementation of denying L4 access using their
inbuilt services. What you don't need is to be going out and buying appliances
or other snake-oil bullshit. You're going to misconfigure it all the same.
Actually you're probably making things worse because the guy running your
appliance is from the past. Get the process right — it's not about the product.

## The role leak and its privileges

It's difficult to comment on how the commands were executed on the service that
led to the leaking of the `*-WAF-Role`. Was this insecure software? Was it an
insecure server? Weak or leaked credentials? Why did it have so much access?
What the fuck even is this? Maybe we'll know more later.

<!-- IMAGE 3 -->

I'll leave it to the reader to ponder, only adding that we shouldn't run
insecure software and consider it secure because it's behind a firewall, we
should be following the principle of least privilege, and we should consider
what our own `*-WAF-Role`s are doing and whether it's worth it.

Let's be honest though, it was probably some shitty security product. ;)

## Unencrypted PII data

There's pretty much no excuse to have unencrypted data in an S3 bucket. You can
enforce encryption as part of the bucket policy and you should use KMS to do
this. Even if the data isn't PII, it's just good hygiene. People that don't do
it probably aren't washing their hands after the bathroom either.

The real question is how do you ensure your engineers adhere to this? You might
notice a pattern here.

- **Peer review.** It is not difficult. Set up a terraform repo and pipeline to
  undertake creating pre-secured S3 buckets.
- **SAST.** Code can be written to iterate each bucket and check the policy. You
  just need to define a standard and write the code. It is likely that this code
  already exists.
- **DAST.** Prowler and ScoutSuite should alert on non-encrypted and/or public
  buckets. Run it in your pipeline. Run it nightly.
- **Protective monitoring.** You can use CloudWatch and other tools to alert on
  buckets that are public or don't have the correct policies.

That sounded boringly familiar. Why aren't you doing it?

<!-- IMAGE 4 -->

## Not being aware of the data leakage

The FBI claim includes an email disclosure, so I'm assuming that's how Capital
One were made aware of the issue. This is completely fucked from a security
operations point of view.

If data is leaving your service and it's not through the standard path and of a
standard amount, you should be alerting on it. If not, do you even have
security operations?

But anyway, you don't, so let's figure out how we're going to set that up.

- **DAST.** Prowler and ScoutSuite aren't going to alert for this. What they
  will tell you is if you don't have VPC Flow Logs turned on, if you don't have
  CloudWatch turned on, etc. Pipeline. Nightly. You know the drill.
- **Protective monitoring.** Enable VPC Flow Logs. Enable NACL. Use CloudWatch
  to alert on them leaving anywhere they shouldn't. Alert on traffic spikes
  that are uncommon.

It's easy to meet the requirement of turning on VPC Flow Logs and CloudWatch
without actually enabling any real alerting. You need skilled people and time
to undertake these tasks. You also don't always need to use the Amazon tools to
achieve this. The practice is important, regardless of which tools you use to
achieve it.

## Summary

Pretty much everything mentioned here is just basic information that can be
gained by reading the AWS CIS Foundations Benchmark. If you haven't read it,
should you even be running cloud services?

It's important that we take the time to understand these topics. Sure, use
Agile practices. Great! Put them on your backlog. Amazing! But you have to
actually let engineers think. Don't get stuck on the feature delivery
treadmill, marking off features on the checklist like some automaton.

## Final words

I actually have no idea what's happening over at Capital One. Much like
everyone else, I'm just assuming bullshit and writing a blog post. What I do
know is I've worked with former Capital One engineers who are excellent, and I
have no doubt there are excellent people working there now.

It's totally fair to call bullshit on the "extremely sophisticated attack", but
we need to stop acting like our shit doesn't smell. I for one have smelt a lot
worse.

That doesn't make losing our data okay. Not at all. Fuck that. But it does
suggest that taking pause and learning from other mistakes is probably a good
idea. After all, these kinds of failures are failures of process, failures of
priorities, and failures of management. We should all be looking at fixing our
own messes — you don't have enough time to be pointing fingers.

That, or maybe you'll just be next.
