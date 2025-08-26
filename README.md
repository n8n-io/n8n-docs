
![Banner image](https://user-images.githubusercontent.com/10284570/173569848-c624317f-42b1-45a6-ab09-f0ea3c247648.png)

# n8n Docs

This repository hosts the documentation for [n8n](https://n8n.io/), an extendable workflow automation tool that enables you to connect anything to everything.  

The documentation is live at [docs.n8n.io](https://docs.n8n.io/).

---

## 📂 Repository Structure

```

n8n-docs/
│
├── docs/                # Main Markdown content (guides, tutorials, references)
│   ├── guides/          # Beginner and advanced guides
│   ├── integrations/    # Integration-specific documentation
│   ├── reference/       # API references and technical details
│   └── tutorials/       # Step-by-step tutorials and walkthroughs
│
├── overrides/           # Theme overrides and templates for mkdocs-material
│   └── partials/        # Reusable UI components
│
├── mkdocs.yml           # MkDocs site configuration file
├── requirements.txt     # Python dependencies for building the site
├── CONTRIBUTING.md      # Contribution guidelines
├── .editorconfig        # Consistent formatting rules
├── .gitignore           # Ignored files for git
└── ...other configs     # Additional configuration files

````

---

## 🛠️ Previewing and Building the Docs Locally

### Prerequisites

- **Python 3.8+**
- **Pip** (Python package manager)
- [MkDocs Material theme](https://squidfunk.github.io/mkdocs-material/)
- Recommended: A Python virtual environment (`venv`)

> ⚠️ Important:  
> The repo includes an `.editorconfig`. Ensure your editor does **not override** these rules.  
> - Do **not** replace tabs with spaces in code samples (n8n nodes require tabs).  
> - One tab = four spaces.  

---

### Setup

#### 🔑 For n8n GitHub Organization Members

Members get access to the **Insiders version** of the Material theme.

```bash
# Clone with submodules
git clone --recurse-submodules git@github.com:n8n-io/n8n-docs.git
cd n8n-docs

# Create & activate a virtual environment
python -m venv venv
source venv/bin/activate   # On Linux/Mac
venv\Scripts\activate      # On Windows

# Install dependencies
pip install -r requirements.txt
pip install _submodules/insiders
````

#### 🌍 For External Contributors

External contributors can use the free version of Material for MkDocs.

```bash
git clone https://github.com/<your-username>/n8n-docs.git
cd n8n-docs

# Create & activate a virtual environment
python -m venv venv
source venv/bin/activate   # On Linux/Mac
venv\Scripts\activate      # On Windows

# Install dependencies
pip install -r requirements.txt
pip install mkdocs-material
```

---

### ▶️ Run Local Preview

```bash
mkdocs serve --strict
```

Preview will be available at:
👉 [http://127.0.0.1:8000](http://127.0.0.1:8000)

---

## ⚡ Troubleshooting

### Missing Features or Build Errors

* n8n Docs use the **Insiders theme** of MkDocs Material.
* External contributors may hit errors because certain features are only available in **Insiders**.
* See: [Material Insiders Benefits](https://squidfunk.github.io/mkdocs-material/insiders/benefits/).

**Workarounds:**

* Use PR preview builds (recommended).
* Temporarily comment out unsupported features in `mkdocs.yml` (don’t commit with them commented out).

---

### ⏱️ Build Time Optimization

If local builds are slow:

#### Dirty builds (only rebuild changed files):

```bash
mkdocs serve --strict --dirty
```

#### Exclude integrations library temporarily:

In `mkdocs.yml`:

```yaml
plugins:
  exclude:
    - integrations/builtin/*
```

#### Skip integration data fetch:

```bash
# Bash
export NO_TEMPLATE=true && mkdocs serve --strict

# PowerShell
$env:NO_TEMPLATE='true'; mkdocs serve --strict
```

---

## 🤝 Contributing

* Please read our [CONTRIBUTING.md](CONTRIBUTING.md) guide.
* Style guidance: [Wiki – Writing Styles](https://github.com/n8n-io/n8n-docs/wiki/Styles).
* Follow commit conventions for consistency.

---

## 💬 Support

* If you have issues or questions, visit our community forum:
  👉 [n8n Community](https://community.n8n.io)

---

## 📜 License

This project is [fair-code](https://faircode.io/) licensed under the [**Sustainable Use License**](https://github.com/n8n-io/n8n/blob/master/LICENSE.md).

See full license details here: [License Documentation](https://docs.n8n.io/reference/license/).


