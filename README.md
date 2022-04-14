# Polydocs Docs



### Prerequisites

* Python 3.8 or above
* We recommend using a virtual environment when working with Python, such as [venv](https://docs.python.org/3/tutorial/venv.html).

### Steps

```bash
git clone https://github.com/n8n-io/n8n-docs.git
cd n8n-docs
pip install -r requirements.txt
# n8n organization members: 
# Outside your docs project, do:
git clone https://github.com/n8n-io/mkdocs-material-insiders.git mkdocs-material
# Navigate back into the docs project and run:
pip install -e <path-to-mkdocs-material>
# External contributors: rely on the preview builds on pull requests, or 
# use the free version of Material for MkDocs (most things are the same, some formatting may be missing)
pip install mkdocs-material
# Serve a local preview
mkdocs serve
# Or build
mkdocs build
```
