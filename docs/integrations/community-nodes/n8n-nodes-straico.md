# Straico Chat Model node

Use the **Straico Chat Model** node to connect with Straico's powerful AI models for conversational tasks,. This node enables chat-based interactions for generating text, answering questions, summarizing content, and more — directly within your n8n workflows.

On this page, you'll find details about the node's parameters, authentication, and configuration options.

---

## Credentials

This node requires API credentials from Straico. You can generate and manage your API keys in your Straico account.

> For help setting up credentials, see: [Straico Authentication Guide](https://documenter.getpostman.com/view/5900072/2s9YyzddrR).

---

## Parameter resolution in sub-nodes

Sub-nodes behave differently from standard nodes when processing multiple input items using expressions.

Most nodes process all input items independently. For example, if you use the expression `{{ $json.name }}` with five inputs, it resolves each name individually.

However, sub-nodes always resolve expressions using the **first input item**. In the same example, `{{ $json.name }}` would return the first name for all five items.

---

## Node Parameters

- **Model**: Select the Straico model to use for generating completions. Available models are dynamically fetched via the Straico API. Refer to the [Straico Model Reference](https://documenter.getpostman.com/view/5900072/2s9YyzddrR#7527bcfd-0c71-4ee9-b67f-3ce21b41e5f2) for more information.

---

## Node Options

- **Frequency Penalty**: Reduces the likelihood of repeated phrases. Higher values increase penalty for repetition.
- **Maximum Number of Tokens**: Sets the length of the response. Straico models support up to 32,000 tokens.
- **Response Format**: Choose between `text` or `JSON`. Select `JSON` for structured responses.
- **Presence Penalty**: Encourages the model to talk about new topics by adjusting topic diversity.
- **Sampling Temperature**: Controls creativity. Lower values are more deterministic; higher values are more diverse (but may hallucinate).
- **Top P**: Sets nucleus sampling probability. Lower values reduce randomness.
- **Timeout**: Set a time limit for each API request (in milliseconds).
- **Max Retries**: Number of retry attempts in case of a failed request.

---

## Example Use Case

💡 **Customer Support Assistant**  
Use the Straico Chat Model node in a workflow with a webhook and a database to build an automated customer support assistant. Send user questions to Straico and receive high-quality, context-aware answers.

---

## Additional Resources

- [Straico API Documentation](https://documenter.getpostman.com/view/5900072/2s9YyzddrR)
- [Straico Website](https://straico.com)
- [n8n Community Nodes Guide](https://docs.n8n.io/integrations/community-nodes/)
