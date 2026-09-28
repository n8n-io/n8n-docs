---
title: Use Browser Use
description: >-
  Connect the n8n Browser Use extension so n8n Assistant can work in your
  browser and set up credentials for you.
status: preview
tags:
  - tag: preview
    primary: true
layout:
  description:
    visible: false
---

# Use Browser Use

Browser Use lets n8n Assistant work in your own browser. After you install the **n8n Browser Use** Chrome extension and connect it, n8n Assistant can open tabs, navigate sites, click, type, read pages, and set up credentials for you.

Browser Use runs in your real browser profile, so it can use the sites you're already signed in to. You don't need to install any other software.

{% hint style="info" %}
**Feature availability**

Browser Use is available on:

- **n8n Cloud:** Starter, Pro

It isn't available on self-hosted n8n.
{% endhint %}

{% hint style="info" %}
**Preview status**

Browser Use is part of n8n Assistant, which is in Preview. It can make mistakes, and behavior may change while the feature is in development.
{% endhint %}

## What Browser Use can do

With Browser Use connected, you can ask n8n Assistant to:

- **Set up credentials:** create an API key or app in a service's console and save it as an n8n credential. See [Set up credentials with Browser Use](#set-up-credentials-with-browser-use).
- **Browse and research:** open pages, follow links, and read page content.
- **Fill in forms:** type text, select options, upload files, and submit forms.
- **Work with tabs:** open, switch between, and close tabs.

## Requirements

- Google Chrome or another Chromium-based browser, such as Microsoft Edge or Brave. Browser Use isn't available on phones and tablets.
- An instance admin must turn on **Browser use** in **Settings** > **Assistant**.

## Connect Browser Use

1. In n8n Assistant, select **+** beside the chat input, then select **Connect browser**.
2. If you don't have the extension yet, select **Install Chrome extension** and add [n8n Browser Use](https://chromewebstore.google.com/detail/n8n-browser-use/cegmdpndekdfpnafgacidejijecomlhh) from the Chrome Web Store. Then return to n8n.
3. The extension opens a popup asking you to allow n8n to access your browser. In the popup:
   1. Optional: select **Always allow `<your-instance-host>`** to connect without this prompt next time.
   2. Optional: expand **Allow access to existing tabs** and select tabs you want to share.
   3. Select **Allow connection**.

n8n shows **Browser Use is connected** when the connection succeeds.

If the popup closes or doesn't appear, select **Try again** in n8n.

## Set up credentials with Browser Use

To have n8n Assistant create a credential for you, ask for it in the chat. For example:

```text
Use my browser to create an OpenAI API key and save it as an n8n credential.
```

n8n Assistant then:

1. Opens the service's website and follows the steps to create the key or app. If it needs a choice from you, such as a project or app name, it asks in the chat.
2. Pauses when you need to sign in, complete two-factor authentication, or solve a CAPTCHA, and asks you to do it in the browser. Reply in the chat when you're done.
3. Captures the secret from the page and asks you to approve creating the credential.

The secret goes straight from the page into the n8n credential. n8n Assistant never sees it, and you never need to paste it into the chat.

## Control what Browser Use can access

- **Tabs:** n8n Assistant can only use tabs it opens itself and tabs you share when you connect. Shared tabs apply to the current connection only.
- **Sites:** before n8n Assistant uses a new site, it asks **Allow n8n Assistant to access `<domain>`?** Select **Allow once**, **Always allow `<domain>`**, **Allow all domains**, or **Deny**.
- **Secrets on pages:** n8n hides API keys, passwords, and other secrets from n8n Assistant when it reads a page. It also blocks screenshots of pages that show secrets.
- **Admin permissions:** in **Settings** > **Assistant**, instance admins can set **Fetch URLs** and **Create credentials from a browser session** to **Allow**, **Ask first**, or **Block**.

{% hint style="warning" %}
Browser Use acts with your signed-in sessions. Check which site and action n8n Assistant is asking about before you approve a request.
{% endhint %}

## Disconnect Browser Use

To disconnect, select **+** beside the chat input and select **Disconnect** next to Browser Use. You can also select **Disconnect** in the extension popup.

If you selected **Always allow** for an instance, the extension connects to it without asking. To change this, open the extension and remove the instance from **Allowed instances**.

## Limitations

- n8n Assistant can't sign in, complete two-factor authentication, or solve CAPTCHAs for you. It asks you to do these steps.
- It can't read files you download or open internal browser pages, such as `chrome://` pages.
- Browser Use only works while your browser is open and connected. It can't run as part of a published workflow.
- You can connect one browser at a time.

## Troubleshooting

### We can't detect the extension

n8n can't find the n8n Browser Use extension. Check that it's installed and enabled in your browser's extension settings, then select **Try again**.

### Browser Use requires Google Chrome or another Chromium-based browser

You're using a browser that doesn't support the extension, such as Safari or Firefox. Open n8n in Google Chrome, Microsoft Edge, or Brave.

### Browser Use setup failed

n8n couldn't create a connection link. Select **Try again**. If the problem continues, reload the page.

### Can't connect to your instance

The extension shows **Can't connect to `<host>`** when the instance isn't an n8n Cloud instance. Browser Use isn't available on self-hosted n8n.

## Related resources

* [Use n8n Assistant](../n8n-assistant.md)
