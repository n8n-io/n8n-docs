---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
title: Sustainable Use License
description: The n8n Sustainable Use License.
contentType: explanation
---

<!-- vale off -->

# Sustainable Use License

/// note | Proprietary licenses for Enterprise
Proprietary licenses are available for enterprise customers. [Get in touch](mailto:license@n8n.io) for more information.
///

n8n's [Sustainable Use License](https://github.com/n8n-io/n8n/blob/master/LICENSE.md){:target=\_blank .external-link} and [n8n Enterprise License](https://github.com/n8n-io/n8n/blob/master/LICENSE_EE.md){:target=\_blank .external-link} are based on the [fair-code](https://faircode.io/) model.

## License FAQs

### What license do you use?

n8n uses the [Sustainable Use License](https://github.com/n8n-io/n8n/blob/master/LICENSE.md) and [n8n Enterprise License](https://github.com/n8n-io/n8n/blob/master/LICENSE_EE.md){:target=_blank .external-link}. These licenses are based on the [fair-code](https://faircode.io/) model.


### What source code is covered by the Sustainable Use License? 

The [Sustainable Use License](https://github.com/n8n-io/n8n/blob/master/LICENSE.md) applies to all our source code hosted in our [main GitHub repository](https://github.com/n8n-io/n8n) except:

* Content of branches other than master.
* Source code files that contain `.ee.` in their file name. These are licensed under the [n8n Enterprise License](https://github.com/n8n-io/n8n/blob/master/LICENSE_EE.md){:target=_blank .external-link}.

### What is the Sustainable Use License?

The Sustainable Use License is a fair-code software license created by n8n in 2022. You can read more about why we did this [here](#why-did-you-create-a-license). The license allows you the free right to use, modify, create derivative works, and redistribute, with three limitations:

* You may use or modify the software only for your own internal business purposes or for non-commercial or personal use.
* You may distribute the software or provide it to others only if you do so free of charge for non-commercial purposes.
* You may not alter, remove, or obscure any licensing, copyright, or other notices of the licensor in the software. Any use of the licensor's trademarks is subject to applicable law.

We encourage anyone who wants to use the Sustainable Use License. If you are building something out in the open, it makes sense to think about licensing earlier in order to avoid problems later. Contact us at [license@n8n.io](mailto:license@n8n.io) if you would like to ask any questions about it. 


### What is and isn't allowed under the license in the context of n8n's product?

Our license restricts use to "internal business purposes". In practice this means all use is allowed unless you are selling a product, service, or module in which the value derives entirely or substantially from n8n functionality. Here are some examples that wouldn't be allowed:

* White-labeling n8n and offering it to your customers for money.
* Hosting n8n and charging people money to access it.

All of the following examples are allowed under our license: 

* Using n8n to sync the data you control as a company, for example from a CRM to an internal database.
* Creating an n8n node for your product or any other integration between your product and n8n.
* Providing consulting services related to n8n, for example building workflows, custom features closely connect to n8n, or code that gets executed by n8n.
* Supporting n8n, for example by setting it up or maintaining it on an internal company server.

#### Can I use n8n to act as the back-end to power a feature in my app?

Usually yes, as long as the back-end process doesn't use users' own credentials to access their data.

Here are two examples to clarify:

##### Example 1: Sync ACME app with HubSpot

Bob sets up n8n to collect a user's HubSpot credentials to sync data in the ACME app with data in HubSpot.

<span style="color: #BF2F51;">**NOT ALLOWED**</span> under the Sustainable Use License. This use case collects the user's own HubSpot credentials to pull information to feed into the ACME app.

##### Example 2: Embed AI chatbot in ACME app

Bob sets up n8n to embed an AI chatbot within the ACME app. The AI chatbot's credentials in n8n use Bob's company credentials. ACME app end-users only enter their questions or queries to the chatbot.

<span style="color: #1C9985;">**ALLOWED**</span> under the Sustainable Use License. No user credentials are being collected.

### What if I want to use n8n for something that's not permitted by the license?

You must sign a separate commercial agreement with us. We actively encourage software creators to embed n8n within their products; we just ask them to sign an agreement laying out the terms of use, and the fees owed to n8n for using the product in this way. We call this mode of use n8n Embed. You can learn more, and contact us about it [here](https://n8n.io/embed). 

If you are unsure whether the use case you have in mind constitutes an internal business purpose or not, take a look at [the examples](#what-is-and-isnt-allowed-under-the-license-in-the-context-of-n8ns-product), and if you're still unclear, email us at [license@n8n.io](mailto:license@n8n.io).

### Why don't you use an open source license?

n8n's mission is to give everyone who uses a computer technical superpowers. We've decided the best way for us to achieve this mission is to make n8n as widely and freely available as possible for users, while ensuring we can build a sustainable, viable business. By making our product free to use, easy to distribute, and source-available we help everyone access the product. By operating as a business, we can continue to release features, fix bugs, and provide reliable software at scale long-term.

### Why did you create a license?

Creating a license was our least favorite option. We only went down this path after reviewing the possible existing licenses and deciding nothing fit our specific needs. There are two ways in which we try to mitigate the pain and friction of using a proprietary license:

1. By using plain English, and keeping it as short as possible.
2. By promoting [fair-code](https://faircode.io/) with the goal of making it a well-known umbrella term to describe software models like ours.

Our goals when we created the Sustainable Use License were:

1. To be as permissive as possible.
2. Safeguarding our ability to build a business.
3. Being as clear as possible what use was permitted or not.

### My company has a policy against using code that restricts commercial use – can I still use n8n?

Provided you are using n8n for internal business purposes, and not making n8n available to your customers for them to connect their accounts and build workflows, you should be able to use n8n. If you are unsure whether the use case you have in mind constitutes an internal business purpose or not, take a look at [the examples](#what-is-and-isnt-allowed-under-the-license-in-the-context-of-n8ns-product), and if you're still unclear, email us at [license@n8n.io](mailto:license@n8n.io).


### What happens to the code I contribute to n8n in light of the Sustainable Use License?

Any code you contribute on GitHub is subject to GitHub's [terms of use](https://docs.github.com/en/site-policy/github-terms/github-terms-of-service#d-user-generated-content). In simple terms, this means you own, and are responsible for, anything you contribute, but that you grant other GitHub users certain rights to use this code. When you contribute code to a repository containing notice of a license, you license the code under the same terms.

n8n asks every contributor to sign our [Contributor License Agreement](https://github.com/n8n-io/n8n/blob/master/CONTRIBUTOR_LICENSE_AGREEMENT.md). In addition to the above, this gives n8n the ability to change its license without seeking additional permission. It also means you aren't liable for your contributions (e.g. in case they cause damage to someone else's business).

It's easy to get started contributing code to n8n [here](https://github.com/n8n-io), and we've listed broader ways of participating in our community [here](https://docs.n8n.io/reference/contributing.html).


### Why did you switch to the Sustainable Use License from your previous license arrangement (Apache 2.0 with Commons Clause)?

n8n was licensed under Apache 2.0 with Commons Clause until 17 March 2022. Commons Clause was initiated by various software companies wanting to protect their rights against cloud providers. The concept involved adding a commercial restriction on top of an existing open source license.

However, the use of the Commons Clause as an additional condition to an open source license, as well as the use of wording that's open to interpretation, created some confusion and uncertainty regarding the terms of use. The Commons Clause also restricted people's ability to offer consulting and support services: we realized these services are critical in enabling people to get value from n8n, so we wanted to remove this restriction.

We created the Sustainable Use License to be more permissive and more clear about what use is allowed, while continuing to ensure n8n gets the funding needed to build and improve our product.

### What are the main differences between the Sustainable Use License and your previous license arrangement (Apache 2.0 with Commons Clause)?

There are two main differences between the Sustainable Use License and our previous license arrangement. The first is that we have tightened the definition of how you can use the software. Previously the Commons Clause restricted users ability to "sell" the software; we have redefined this to restrict use to internal business purposes. The second difference is that our previous license restricted people's ability to charge fees for consulting or support services related to the software: we have lifted that restriction altogether.

That means you are now free to offer commercial consulting or support services (e.g. building n8n workflows) without the need for a separate license agreement with us. If you are interested in joining our community of n8n experts providing these services, you can learn more here.

### Is n8n open source?

Although n8n's source code is available under the Sustainable Use License, according to the [Open Source Initiative](https://opensource.org/) (OSI), open source licenses can't include limitations on use, so we do not call ourselves open source. In practice, n8n offers most users many of the same benefits as OSI-approved open source.

We coined the term ['fair-code'](https://faircode.io/) as a way of describing our licensing model, and the model of other companies who are source-available, but restrict commercial use of their source code.

### What is fair-code, and how does the Sustainable Use License relate to it?

Fair-code isn't a software license. It describes a software model where software:

* Is generally free to use and can be distributed by anybody.
* Has its source code openly available.
* Can be extended by anybody in public and private communities.
* Is commercially restricted by its authors.

The Sustainable Use License is a fair-code license. You can read more about it and see other examples of fair-code licenses [here](https://faircode.io/).

We're always excited to talk about software licenses, fair-code, and other principles around sharing code with interested parties. To get in touch to chat, email [license@n8n.io](mailto:license@n8n.io).

### Can I use n8n's Sustainable Use License for my own project?

Yes! We're excited to see more software use the Sustainable Use License. We'd love to hear about your project if you're using our license: [license@n8n.io](mailto:license@n8n.io).

<!-- vale on -->
