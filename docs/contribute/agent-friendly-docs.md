---
description: What n8n Docs means by agent-friendly documentation, and how the standard relates to the style guide.
layout:
  description:
    visible: false
---

# Agent-friendly docs

People and AI agents both read n8n Docs. What each user type needs from documentation overlaps more than it diverges. However, agents have some particular needs for effectively parsing and navigating the documentation. 

This page sets out what agent-friendly means to n8n Docs, and why it matters. These guidelines are useful to contributors writing for the docs, or any user interested in our approach.

## Why this matters for n8n Docs

Two overlapping audiences now read n8n Docs through an agent instead of a browser:

* **People ask an AI agent instead of searching.** A growing share of documentation traffic comes from AI assistants and search agents retrieving pages to answer a question, not from someone clicking through a site's navigation. 
* **People build with n8n using a coding agent.** Someone writing a workflow, a node, or an integration increasingly does it with an AI coding tool. These tools retrieve n8n Docs directly to ground their answers in current, accurate information instead of outdated training data.

## What "agent-friendly" means

The standard breaks down into four layers.

### Machine-readable delivery

Agents need a way to fetch content without rendering a full web page. n8n Docs provides several routes in:

* Every page is available as clean Markdown, not just rendered HTML.
* [llms.txt and llms-full.txt](https://docs.n8n.io/llms.txt) list every published page for agents that support the format.
* An MCP server exposes docs directly to MCP clients. See [Connect to the n8n docs MCP server](https://docs.n8n.io/connect/connect-to-n8n-docs-mcp-server).
* AI-powered search (Kapa.ai) answers questions directly from docs, the blog, and the community forum.
* [Context7](https://context7.com/) indexes n8n Docs so in-editor coding agents can retrieve current docs while someone builds.

### Site-wide consistency

An agent has no way to know that two different terms mean the same thing unless the docs are consistent about it.

* n8n Docs uses the same term for the same concept everywhere. See [Terminology and naming](terminology.md).
* URLs stay stable across a page rename, with a redirect in place whenever a URL does change.
* A fact that depends on an n8n version or plan says so at the point it applies, not only once at the top of the page. See [Feature availability](style-guide-for-n8n-docs.md#feature-availability).
* New pages and modifications are reviewed for consistency and technical accuracy before they're published, on n8n Docs' [open-access GitHub repository](https://github.com/n8n-io/n8n-docs), by both human reviewers and our AI-reviewer [cubic](https://www.cubic.dev/).

### Structure and navigation

* n8n Docs splits content into focused pages that are short enough for an agent to retrieve without truncating them or losing them in a wall of unrelated content. See [Page length and granularity](style-guide-for-n8n-docs.md#page-length-and-granularity).
* Each section stands on its own, without relying on information "as mentioned above". See [Keep each section self-contained](style-guide-for-n8n-docs.md#keep-each-section-self-contained).
* Pages link explicitly to prerequisites, next steps, and related topics, so an agent can follow a path instead of guessing a URL. See [Link to related pages, prerequisites, and next steps](style-guide-for-n8n-docs.md#link-to-related-pages-prerequisites-and-next-steps).

### Content and examples

* Instructions live in text, not images. Screenshots confirm what the reader should already know from the words on the page, not the other way round. See [Images](style-guide-for-n8n-docs.md#images).
* n8n Docs strives to ensure that features with code, expression, or configuration surfaces have worked examples, covering the common case and the ones that break. See [Show worked examples for each feature](style-guide-for-n8n-docs.md#show-worked-examples-for-each-feature).
* Tabbed content stays sparse and short, since a person sees one tab but an agent reads every one. See [Tabbed content](style-guide-for-n8n-docs.md#tabbed-content).

## How this relates to the style guide

This page explains the reasoning. The [style guide](style-guide-for-n8n-docs.md) has the specific rules to follow. Several of those rules, including page length, self-contained sections, internal linking, feature availability, images, and tabbed content, exist specifically because they make docs work for agents as well as people. If you're contributing, follow the style guide directly. Come back to this page when you want the reasoning behind a rule, or when you're weighing whether something new is worth adding as a rule at all.

## Where this is still evolving

Not every guideline has a settled answer yet. n8n Docs is continuously testing and researching what makes agent-friendly documentation, and developing new systems to help ensure our docs meet these standards. Agent-friendliness is a fast-moving area of documentation practice, and this page will change as the practice matures.
