# mkdocs-feedback-buttons

A MkDocs plugin that adds feedback buttons to documentation pages. Users can rate pages as helpful or not helpful, and provide additional feedback.

## Installation

Install the plugin using pip:

```bash
pip install git+https://github.com/n8n-io/mkdocs_feedback_buttons.git
```

## Configuration

Add the following to your `mkdocs.yml`:

```yaml
plugins:
  - feedback-buttons:
      ga_property: "G-XXXXXXXXXX"  # Required: Your Google Analytics property ID
      question: "This page was"
      positive_button_text: "Helpful"
      negative_button_text: "Not helpful"
      input_placeholder: "This page needs..."
      input_hint: "We read all feedback personally, promise ✨"
      thank_you_message: "Thanks for your feedback!"
      min_content_length: 500  # Optional: Minimum content length in characters
```

### Configuration Options

| Option | Description | Default |
|--------|-------------|---------|
| `ga_property` | Google Analytics property ID (required) | "" |
| `question` | The question displayed above the feedback buttons | "This page was" |
| `positive_button_text` | Text for the positive feedback button | "Helpful" |
| `negative_button_text` | Text for the negative feedback button | "Not helpful" |
| `input_placeholder` | Placeholder text for the feedback input | "This page needs..." |
| `input_hint` | Hint text below the input | "We read all feedback personally, promise ✨" |
| `thank_you_message` | Message shown after submitting feedback | "Thanks for your feedback!" |
| `min_content_length` | Minimum content length in characters to show feedback buttons (0 = show on all pages) | 0 |

## Features

- Feedback buttons with thumbs up/down icons
- Optional text input for detailed feedback
- Google Analytics integration for tracking feedback
- Customizable text and messages
- Responsive design
- Configurable minimum content length

## Development

To install the plugin in development mode:

```bash
git clone https://github.com/n8n-io/mkdocs_feedback_buttons.git
cd mkdocs_feedback_buttons
pip install -e .
```

## License

MIT License 