import os

DOCS_DIR = "docs"
OUTPUT_DOCS = "merged_docs.md"
OUTPUT_JSON = "all_workflow_examples.json"
INCLUDE_ROOT = True  # Set False if you don't want root-level files

# Files to exclude (by exact filename, case-sensitive)
EXCLUDED_FILES = {
    "LICENSE.md",
    "CODE_OF_CONDUCT.md",
    "CONTRIBUTING.md",
    "CONTRIBUTOR_LICENSE_AGREEMENT.md",
    ".gitignore",
    ".editorconfig",
    ".vale.ini",
    "mkdocs.yml",
    "mkdocs-test.yml",
    "nav.yml",
    "netlify.toml",
    "requirements.txt",
    "runtime.txt",
    "lychee.toml",
    "CNAME",
    "main.py",  # usually code, not docs
    "README.md",  # optional: remove from list if you want to keep it
}

# Folder names to skip (case-sensitive)
EXCLUDED_DIRS = {
    "_doctools",
    "_overrides",
    "_submodules",
    "styles",
    "archive",
    "docs-site-feature-tests",
}

def is_markdown_or_text(filename):
    return filename.endswith(".md") or filename.endswith(".txt")

def is_json(filename):
    return filename.endswith(".json")

def should_exclude_file(filepath):
    # Exclude files by name
    if os.path.basename(filepath) in EXCLUDED_FILES:
        return True
    # Exclude if any parent directory is in EXCLUDED_DIRS
    parts = os.path.normpath(filepath).split(os.sep)
    for part in parts:
        if part in EXCLUDED_DIRS:
            return True
    return False

def collect_files(base_dirs, filter_func):
    files = []
    for base_dir in base_dirs:
        for root, dirnames, filenames in os.walk(base_dir):
            # Remove excluded directories from traversal
            dirnames[:] = [d for d in dirnames if d not in EXCLUDED_DIRS]
            for fname in sorted(filenames):
                fullpath = os.path.join(root, fname)
                if filter_func(fname) and not should_exclude_file(fullpath):
                    files.append(fullpath)
    return files

def collect_root_files(filter_func):
    return [
        f for f in sorted(os.listdir('.'))
        if filter_func(f) and os.path.isfile(f) and not should_exclude_file(f)
    ]

def main():
    # Collect docs
    docs_files = []
    json_files = []
    if INCLUDE_ROOT:
        docs_files.extend(collect_root_files(is_markdown_or_text))
        json_files.extend(collect_root_files(is_json))
    if os.path.exists(DOCS_DIR):
        docs_files.extend(collect_files([DOCS_DIR], is_markdown_or_text))
        json_files.extend(collect_files([DOCS_DIR], is_json))

    with open(OUTPUT_DOCS, "w", encoding="utf-8") as docs_out:
        for filepath in docs_files:
            docs_out.write(f"\n\n# {filepath}\n\n")
            with open(filepath, "r", encoding="utf-8") as infile:
                docs_out.write(infile.read())

    with open(OUTPUT_JSON, "w", encoding="utf-8") as json_out:
        for filepath in json_files:
            json_out.write(f"\n\n// {filepath}\n")
            with open(filepath, "r", encoding="utf-8") as infile:
                json_out.write(infile.read())
    print(f"Merged {len(docs_files)} docs into {OUTPUT_DOCS}")
    print(f"Merged {len(json_files)} JSON files into {OUTPUT_JSON}")

if __name__ == "__main__":
    main()