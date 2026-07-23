---
description: >-
  Learn how approvers can approve or decline n8n workflow actions directly
  inside Slack with the Slack node's Send and Wait for Response operation.
layout:
  description:
    visible: false
---

# Approvals in Slack

{% hint style="info" %}
**This feature is in preview**

Preview features may change in future releases. Avoid relying on them in production workflows. n8n is rolling this feature out gradually, so it may not be available on your instance yet.
{% endhint %}

With the **Message** > **Send and Wait for Response** operation, approvers can approve or decline directly inside Slack. No browser page opens: the workflow resumes immediately, and the output records who responded.

## How it differs from link buttons

| What | Link buttons (default) | Approvals in Slack |
|------|------------------------|--------------------|
| Where the decision happens | Opens an n8n page in the browser | One click inside Slack |
| Who can respond | Anyone who can click the link | Only the approvers you list (an empty list lets anyone who can see the message respond). Anyone else gets a private "not authorized" note and the workflow keeps waiting. |
| Output | `approved` and `respondedAt` | Adds who responded (ID, name, username, and email) plus the channel and message |
| The message after the decision | Unchanged. The buttons stay clickable, but later clicks show a "no action required" page. The first decision stands. | Locked and updated to show the outcome and the responder |
| Security | Signed links: no one can tamper with the URL or its action, but anyone who has the link can respond, and n8n can't tell who clicked | n8n verifies every callback came from Slack (using Slack's request signing) and checks the responder against your approver list |

## Requirements

To approve within Slack, you need:

- Your n8n instance must be reachable from Slack over public HTTPS. Slack calls your instance back when someone responds, so an instance running on localhost won't work.
- A Slack credential, using either an API access token or OAuth2.
- The **Signature Secret** field of your Slack credential must contain your Slack app's signing secret, found in **Settings** > **Basic Information**. Without it, the buttons render but clicks don't resume the workflow.
- **Response Type** set to **Approval**.
- The `users:read` and `users:read.email` scopes. The responder's ID, name, and username come from Slack's interaction payload; the email comes from the Slack API and needs these scopes. Missing scopes just mean the output omits the email. If you use an OAuth2 credential created before this feature existed, reconnect it so it picks up the `users:read.email` scope.

## Set up approvals

### 1. Create a Slack app and credential

Follow [Using API access token](../../credentials/slack.md#using-api-access-token) or [Using OAuth2](../../credentials/slack.md#using-oauth2) to create a Slack app and set up your credential. When you configure your app's scopes, add `users:read` and `users:read.email` so the output can include the responder's email.

### 2. Turn on Interactivity

1. Go to [Your Apps](https://api.slack.com/apps) in Slack and select the app you want to use.
2. Go to **Features** > **Interactivity & Shortcuts** and turn on **Interactivity**.
3. In **Request URL**, enter `https://<your-n8n-instance>/webhook-waiting-slack`. All workflows on the instance share this one URL. If you changed the `N8N_ENDPOINT_WEBHOOK_WAIT` environment variable, adjust the path to match.
4. Select **Save Changes**.

{% hint style="info" %}
Slack allows one **Request URL** per app, so one Slack app serves one n8n instance.
{% endhint %}

### 3. Add the signing secret to your credential

1. In your Slack app, go to **Settings** > **Basic Information** and copy the **Signing Secret** from the **App Credentials** section.
2. In n8n, paste it into the **Signature Secret** field of your Slack credential.

n8n uses the signing secret to verify that each callback really comes from Slack. n8n rejects callbacks that fail verification, and the workflow keeps waiting.

### 4. Configure the node

In the Slack node, select the **Message** resource with the **Send and Wait for Response** operation, and set **Response Type** to **Approval**. Turn on **Capture Who Responded** to switch the approval buttons to Slack interactive buttons and record who responded. To restrict who can act, select users in **Approver Names or IDs**. You can also specify user IDs with an expression. Anyone not on the list who clicks gets a private notice, and the workflow keeps waiting.

If you leave the approver list empty, anyone who can see the message can approve or decline. In a channel, that's every member. The list controls who can respond, not who can see the request, so post sensitive approvals to a private channel or direct message.

### 5. Test it

Execute the workflow, select **Approve** in Slack, and check the node output.

## Node output

When someone responds in Slack, the node outputs the decision and the responder:

```json
{
	"data": {
		"approved": true,
		"respondedAt": "2025-07-13T12:34:56.000Z",
		"channel": "C0123ABC456",
		"messageId": "1752407696.123456",
		"responder": {
			"id": "U0123ABC456",
			"name": "Jo Doe",
			"username": "jo.doe",
			"email": "jo@example.com",
			"source": "slack"
		}
	}
}
```

With link buttons, the output contains only `approved` and `respondedAt`.

## When you get link buttons instead

The node behaves as before, sending buttons that open an n8n confirmation page, when any of these apply:

- The feature isn't enabled on your instance yet.
- **Response Type** is **Free Text** or **Custom Form**.
- **Capture Who Responded** is off.

Existing workflows keep working unchanged.

## Troubleshooting

- **The buttons don't do anything, or Slack shows a warning**: the **Request URL** is wrong, your instance isn't publicly reachable over HTTPS, or the **Signature Secret** is missing or wrong. Slack shows the same warning for a rejected callback as for an unreachable URL.
- **Someone gets a "not authorized" reply**: that user isn't listed in **Approver Names or IDs**.
- **The workflow never resumes although someone responded**: the **Signature Secret** is missing or doesn't match your app's **Signing Secret**. n8n rejects callbacks it can't verify, and the workflow keeps waiting.
