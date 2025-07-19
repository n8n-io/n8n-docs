import os

DOCS_DIR = "docs"
LLMS_DIR = "llms"
os.makedirs(LLMS_DIR, exist_ok=True)

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
    "main.py",
    "README.md",
}

def should_exclude_dir(dirname):
    return dirname.startswith("_")

def gather_files(root_dir):
    gathered = []
    for dirpath, dirnames, filenames in os.walk(root_dir):
        # Exclude any subfolders starting with _
        dirnames[:] = [d for d in dirnames if not should_exclude_dir(d)]
        for fname in filenames:
            if (fname.endswith('.md') or fname.endswith('.txt')) and fname not in EXCLUDED_FILES:
                gathered.append(os.path.join(dirpath, fname))
    return gathered

def merge_top_level_folders():
    for entry in os.listdir(DOCS_DIR):
        entry_path = os.path.join(DOCS_DIR, entry)
        if os.path.isdir(entry_path) and not should_exclude_dir(entry):
            files = gather_files(entry_path)
            if files:
                out_file = os.path.join(LLMS_DIR, f"{entry}.md")
                with open(out_file, "w", encoding="utf-8") as outfile:
                    for path in sorted(files):
                        rel_path = os.path.relpath(path, DOCS_DIR)
                        outfile.write(f"\n\n# {rel_path}\n\n")
                        with open(path, "r", encoding="utf-8") as infile:
                            outfile.write(infile.read())
                print(f"Merged {len(files)} files into {out_file}")

def main():
    merge_top_level_folders()

if __name__ == "__main__":
    main()