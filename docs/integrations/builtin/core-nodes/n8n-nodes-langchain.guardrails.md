---
title: Guardrails node documentation
description: Documentation for the Guardrails node in n8n, a workflow automation platform. Includes guidance on usage, and links to examples.
contentType: [integration, reference]
---

# Guardrails node

Use the Guardrails node to enforce safety, security, and content policies on text. You can use it to validate user input _before_ sending it to an AI model, or to check the _output_ from an AI model before using it in your workflow.

/// note | Chat Model Connection Required
This node requires a Chat Model node to be connected to its Model input. Many guardrail checks (like Jailbreak, NSFW, and Prompt Injection) are LLM-based and use this connection to evaluate the input text.
///

## Node parameters

Use these parameters to configure the Guardrails node.

### Input Text

The text to be evaluated by the guardrails. You will typically map this using an expression from a previous node, such as text from a user query or a response from an AI model.

### Behavior on Violation

This setting determines how the node behaves when a guardrail check fails (a "violation" is detected).

- **Pass/Fail Output**: The node will have two distinct output branches.
    - **Output $0$ (Pass)**: The workflow continues from this output if _no_ guardrails are violated.
    - **Output $1$ (Fail)**: The workflow continues from this output if _any_ guardrail is violated. The output data will contain details of the violation.
- **Throw Error**: The node will stop the workflow execution and throw an error if any guardrail is tripped.
    

### Guardrails

Select one or more guardrails to apply to the **Input Text**. When you add a guardrail from the list, its specific configuration options will appear below.

- Keywords: Checks if specified keywords appear in the input text.
    - **Keywords**: A comma-separated list of words to block.
        
- Jailbreak: Detects attempts to bypass AI safety measures or exploit the model.
    - **Prompt**: A preset prompt used for the jailbreak detection model.
    - **Threshold**: A value between $0.0$ and $1.0$. This represents the confidence level required from the AI model to flag the input as a jailbreak attempt. A higher threshold is stricter. 

- NSFW: Detects attempts to generate Not Safe For Work (NSFW) content.
    - **Prompt**: A preset prompt for the NSFW detection model.
    - **Threshold**: A value between $0.0$ and $1.0$ representing the confidence level required to flag the content as NSFW.
- PII: Detects Personally Identifiable Information (PII) in the text.
    - **Mode**: Choose how to handle detected PII:
        - **Block**: Fails the guardrail check if PII is found.
        - **Redact**: Replaces the detected PII with placeholders (e.g., `<SECRET>`) and allows the check to pass.
    - **Type**: Choose which PII entities to scan for:
        - **All**: Scans for all available entity types.
        - **Selected**: Allows you to choose specific entities from a list.
    - **Entities**: (Appears if **Type** is **Selected**) A multi-select list of PII types to detect (e.g., `CREDIT_CARD`, `EMAIL_ADDRESS`, `PHONE_NUMBER`, `US_SSN`, etc.).
    - **Custom Regex**: (Optional) Add a custom regular expression to detect specific patterns not covered by the built-in entities.
- Prompt Injection: Detects attempts to inject malicious or manipulative instructions into the input.
    - **Prompt**: A preset prompt for the injection detection model.    
    - **Threshold**: A value between $0.0$ and $1.0$ representing the confidence level required to flag the input as a prompt injection.
- Secret Keys: Detects the presence of secret keys or API credentials in the text.
    - **Mode**: Choose how to handle detected secret keys:
        - **Block**: Fails the guardrail check if secret keys are found.
        - **Redact**: Replaces the detected secret keys with placeholders (e.g., `<SECRET>`) and allows the check to pass.
    - **Permissiveness**: How strict or permissive the secret keys should be flagged:
        - **Strict**
        - **Permissive**
        - **Balanced**
- Topical Alignment: Ensures the conversation stays within a predefined scope or topic (also known as "business scope").
    - **Prompt**: A preset prompt that defines the _allowed_ topic. The guardrail will check if the **Input Text** is aligned with this prompt.
    - **Threshold**: A value between $0.0$ and $1.0$ representing the confidence level required to flag the input as _off-topic_.
- URLs: Manages URLs found in the input text.
    - **Mode**: Choose how to handle detected URLs:
        - **Block**: Fails the guardrail check if a disallowed URL is found.
        - **Redact**: Replaces the disallowed URL with a placeholder and allows the check to pass.
    - **Allowed URLs**: (Optional) A comma-separated list of URLs that are permitted.
    - **Allowed Schemes**: Select the URL schemes to permit (e.g., `https`, `http`, `ftp`, `mailto`).
    - **Block userinfo**: (Boolean) If enabled, blocks URLs containing user credentials (e.g., `user:pass@example.com`) to prevent credential injection.
    - **Allow subdomain**: (Boolean) If enabled, automatically allows subdomains of any URL in the **Allowed URLs** list (e.g., `sub.example.com` would be allowed if `example.com` is in the list).
- Custom: Define your own custom, LLM-based guardrail.
    - **Name**: A descriptive name for your custom guardrail (e.g., "Check for rude language").
    - **Prompt**: A prompt that instructs the AI model what to check for.
    - **Threshold**: A value between $0.0$ and $1.0$ representing the confidence level required to flag the input as a violation.
