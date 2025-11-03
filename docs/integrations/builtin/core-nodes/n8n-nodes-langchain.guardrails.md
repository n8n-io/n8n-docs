---
title: Guardrails node documentation
description: Documentation for the Guardrails node in n8n, a workflow automation platform. Includes guidance on usage, and links to examples.
contentType: [integration, reference]
---

# Guardrails node

Use the Guardrails node to enforce safety, security, and content policies on text. You can use it to validate user input _before_ sending it to an AI model, or to check the _output_ from an AI model before using it in your workflow.

/// note | Chat Model Connection Required for LLM-based Guardrails
This node requires a Chat Model node to be connected to its Model input when using the **Check Text for Violations** operation with LLM-based guardrails. Many guardrail checks (like Jailbreak, NSFW, and Topical Alignment) are LLM-based and use this connection to evaluate the input text.
///

## Node parameters

Use these parameters to configure the Guardrails node.

### Operation

The operation mode for this node to define its behavior.

- **Check Text for Violations**: Provides a full set of guardrails. Any violation will send items to **Fail** branch.
- **Sanitize Text**: Provides a subset of guardrails that can detect URLs, Regex, secret keys, or PII, such as phone numbers, credit card, etc. Detected violations will be replaced with placeholders. 

### Text To Check

The text to be evaluated by the guardrails. You will typically map this using an expression from a previous node, such as text from a user query or a response from an AI model.

### Guardrails

Select one or more guardrails to apply to the **Text To Check**. When you add a guardrail from the list, its specific configuration options will appear below.

- Keywords: Checks if specified keywords appear in the input text.
    - **Keywords**: A comma-separated list of words to block.
- Jailbreak: Detects attempts to bypass AI safety measures or exploit the model.
    - **Customize Prompt**: (Boolean) If enabled, shows a text input with the default prompt for the jailbreak detection model and allows changing it to fine-tune the guardrail. 
    - **Threshold**: A value between 0.0 and 1.0. This represents the confidence level required from the AI model to flag the input as a jailbreak attempt. A higher threshold is stricter. 
- NSFW: Detects attempts to generate Not Safe For Work (NSFW) content.
    - **Customize Prompt**: (Boolean) If enabled, shows a text input with the default prompt for the NSFW detection model and allows changing it to fine-tune the guardrail. 
    - **Threshold**: A value between 0.0 and 1.0 representing the confidence level required to flag the content as NSFW.
- PII: Detects Personally Identifiable Information (PII) in the text.
    - **Type**: Choose which PII entities to scan for:
        - **All**: Scans for all available entity types.
        - **Selected**: Allows you to choose specific entities from a list.
    - **Entities**: (Appears if **Type** is **Selected**) A multi-select list of PII types to detect (for example, `CREDIT_CARD`, `EMAIL_ADDRESS`, `PHONE_NUMBER`, `US_SSN`, etc.).
- Secret Keys: Detects the presence of secret keys or API credentials in the text.
    - **Permissiveness**: How strict or permissive the secret keys should be flagged:
        - **Strict**
        - **Permissive**
        - **Balanced**
- Topical Alignment: Ensures the conversation stays within a predefined scope or topic (also known as "business scope").
    - **Prompt**: A preset prompt that defines the _allowed_ topic. The guardrail will check if the **Text To Check** is aligned with this prompt.
    - **Threshold**: A value between 0.0 and 1.0 representing the confidence level required to flag the input as _off-topic_.
- URLs: Manages URLs found in the input text. It detects all URLs as violations, unless they're specified in **Block All URLs Except**.
    - **Block All URLs Except**: (Optional) A comma-separated list of URLs that are permitted.
    - **Allowed Schemes**: Select the URL schemes to permit (for example, `https`, `http`, `ftp`, `mailto`).
    - **Block userinfo**: (Boolean) If enabled, blocks URLs containing user credentials (for example, `user:pass@example.com`) to prevent credential injection.
    - **Allow subdomain**: (Boolean) If enabled, automatically allows subdomains of any URL in the **Block All URLs Except** list (for example, `sub.example.com` would be allowed if `example.com` is in the list).
- Custom: Define your own custom, LLM-based guardrail.
    - **Name**: A descriptive name for your custom guardrail (for example, "Check for rude language").
    - **Prompt**: A prompt that instructs the AI model what to check for.
    - **Threshold**: A value between 0.0 and 1.0 representing the confidence level required to flag the input as a violation.
- Custom Regex: Define your own custom Regex patterns.
    - **Name**: A name for your custom pattern. This name will be used as a placeholder in the **Sanitize Text** mode.
    - **Regex**: Your Regex pattern.

### Customize System Message

If enabled, shows a text input with a message that's used by the guardrail to enforce thresholds and JSON output according to schema. Change it to modify the global guardrails behavior.