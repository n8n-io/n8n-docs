import os

DOCS_DIR = "docs"
OUTPUT_DOCS = "merged_docs.md"
OUTPUT_JSON = "all_workflow_examples.json"
INCLUDE_ROOT = True  # Set False if you don't want root-level files

def is_markdown_or_text(filename):
    return filename.endswith(".md") or filename.endswith(".txt")

def is_json(filename):
    return filename.endswith(".json")

def collect_files(base_dirs, filter_func):
    files = []
    for base_dir in base_dirs:
        for root, _, filenames in os.walk(base_dir):
            for fname in sorted(filenames):
                if filter_func(fname):
                    files.append(os.path.join(root, fname))
    return files

def collect_root_files(filter_func):
    return [f for f in sorted(os.listdir('.')) if filter_func(f) and os.path.isfile(f)]

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