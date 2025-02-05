#!/usr/bin/env python3
import os
import yaml
import argparse
import re
import glob
import csv

OUTPUT_CSV = "pageinfo.csv"

def extract_frontmatter_and_content(filepath):
    """Extracts frontmatter and main content from a Markdown file."""
    with open(filepath, "r", encoding="utf-8") as f:
        content = f.read()

    # Match YAML frontmatter with regex (--- as delimiter)
    match = re.match(r"^---\n(.*?)\n---\n(.*)", content, re.DOTALL)
    
    if match:
        try:
            frontmatter = yaml.safe_load(match.group(1))  # Parse YAML
        except yaml.YAMLError:
            frontmatter = None  # Invalid YAML
        main_content = match.group(2).strip()
    else:
        frontmatter = None
        main_content = content.strip()

    return frontmatter, main_content

def count_words(text):
    """Counts the number of words in the given text."""
    # yes, this is fairly simplistic, but a general idea is fine for most uses 
    return len(text.split())

def find_markdown_files(directory):
    """Recursively finds all markdown files in the given directory."""
    return glob.glob(os.path.join(directory, "**", "*.md"), recursive=True)

def save_to_csv(data, filename=OUTPUT_CSV):
    """Saves extracted data to a CSV file with dynamic contentType columns."""
    max_types = max((len(row[1]) if isinstance(row[1], list) else 1) for row in data)
    headers = ["Filename", "WordCount"] + [f"ContentType_{i+1}" for i in range(max_types)]

    with open(filename, "w", newline="", encoding="utf-8") as csvfile:
        writer = csv.writer(csvfile)
        writer.writerow(headers)  # Write CSV header

        for filename, content_type, word_count in data:
            if isinstance(content_type, list):
                row = [filename, word_count] + content_type + [""] * (max_types - len(content_type))
            else:
                row = [filename, word_count, content_type] + [""] * (max_types - 1)
            writer.writerow(row)

def main(directory,print_output):
    """Finds Markdown files, extracts 'contentType' and word count, then prints and saves results."""
    md_files = find_markdown_files(directory)
    extracted_data = []

    for file in md_files:
        frontmatter, main_content = extract_frontmatter_and_content(file)
        word_count = count_words(main_content)

        if frontmatter and "contentType" in frontmatter:
            content_type = frontmatter["contentType"]
        else:
            content_type = ""

        # Convert list to comma-separated string for printing
        if isinstance(content_type, list):
            content_str = ", ".join(content_type)
        else:
            content_str = str(content_type)

        if print_output:
            print(f"File: {file}")
            print(f"Word Count: {word_count}")
            print(f"contentType: {content_str}\n")

        extracted_data.append([file, content_type, word_count])

    if extracted_data:
        save_to_csv(extracted_data)
        print(f"Results saved to {OUTPUT_CSV}")

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Extract contentType and word count from Markdown files.")
    parser.add_argument("--dir", type=str, default="../docs", help="Directory to scan (default: '../docs')")
    parser.add_argument("--print", action="store_true", help="Print output to console (default: False, only CSV)")

    args = parser.parse_args()
    main(args.dir, args.print)

