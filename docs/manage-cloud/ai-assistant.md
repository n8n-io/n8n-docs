---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
contentType: explanation
---

# AI Assistant

The n8n AI Assistant helps you build, debug, and optimize your workflows seamlessly. From answering questions about n8n to providing help with coding and [expressions](/glossary.md#expression-n8n), the AI Assistant can streamline your workflow-building process and support you as you navigate n8n's capabilities.

## Current capabilities

The AI Assistant offers a range of tools to support you:

- **Debug helper**: Identify and troubleshoot node execution issues in your workflows to keep them running without issues.
- **Answer n8n questions**: Get instant answers to your n8n-related questions, whether they're about specific features or general functionality.
- **Coding support**: Receive guidance on coding, including SQL and JSON, to optimize your nodes and data processing.
- **Expression assistance**: Learn how to create and refine [expressions](/code/expressions.md) to get the most out of your workflows.
- **Credential setup tips**: Find out how to set up and manage node [credentials](/integrations/builtin/credentials/index.md) securely and efficiently.

## Tips for getting the most out of the Assistant

1. **Engage in a conversation**: The AI Assistant can collaborate with you step-by-step. If a suggestion isn't what you need, let it know! The more context you provide, the better the recommendations will be.
<!-- vale from-microsoft.FirstPerson = NO -->
2. **Ask specific questions**: For the best results, ask focused questions (for example, "How do I set up credentials for Google Sheets?"). The assistant works best with clear queries.
3. **Iterate on suggestions**: Don't hesitate to build on the assistant's responses. Try different approaches and keep refining based on the assistant's feedback to get closer to your ideal solution.
4. **Things to try out**:
    - Debug any error you're seeing
    - Ask how to setup credentials
    - "Explain what this workflow does."
    - "I need your help to write code: [Explain your code here]"
    - "How can I build X in n8n?"
<!-- vale from-microsoft.FirstPerson = YES -->

## FAQs

<!-- vale from-microsoft.HeadingPunctuation = NO -->
### What context does the Assistant have?

The AI Assistant has access to all elements displayed on your n8n screen, excluding actual input and output data values (like customer information). To learn more about what data n8n shares with the Assistant, refer to [AI in n8n](https://docs.n8n.io/privacy-security/privacy/#ai-in-n8n).

<!-- vale from-microsoft.FirstPerson = NO -->
### Who can use the Assistant?
<!-- vale from-microsoft.FirstPerson = YES -->

Any user on a Cloud plan can use the assistant.

### How does the Assistant work?

The underlying logic of the assistant is build with the advanced AI capabilities of n8n. It uses a combination of different [agents](/glossary.md#ai-agent), specialized in different areas of n8n, RAG to gather knowledge from the docs and the community forum, and custom prompts, [memory](/glossary.md#ai-memory) and context.
<!-- vale from-microsoft.HeadingPunctuation = YES -->
