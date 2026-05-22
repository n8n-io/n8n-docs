#!/usr/bin/env python3
"""Compare nav.yml and latestNav.yml to find missing .md entries"""

from collections import defaultdict

def extract_md_entries(filename):
    """Extract all .md file paths and their line numbers from a YAML file"""
    md_entries = {}
    
    with open(filename, 'r') as f:
        lines = f.readlines()
    
    for line_num, line in enumerate(lines, start=1):
        stripped = line.strip()
        # Check if line ends with .md (excluding URLs and other non-path entries)
        if stripped.endswith('.md') and not stripped.startswith('http'):
            # Extract just the .md file path, removing any label/prefix
            if ': ' in stripped:
                # Format: "Label: path/to/file.md"
                path = stripped.split(': ', 1)[1]
            elif '- ' in stripped:
                # Format: "- path/to/file.md"
                path = stripped.replace('- ', '', 1)
            else:
                path = stripped
            
            # Clean up any leading/trailing whitespace
            path = path.strip()
            
            # Store line number for this path (keep first occurrence)
            if path not in md_entries:
                md_entries[path] = line_num
    
    return md_entries

# Extract entries from both files
print("Reading nav.yml...")
nav_entries = extract_md_entries('nav.yml')
print(f"Found {len(nav_entries)} unique .md entries in nav.yml")

print("Reading latestNav.yml...")
latest_nav_entries = extract_md_entries('latestNav.yml')
print(f"Found {len(latest_nav_entries)} unique .md entries in latestNav.yml")

# Find entries in nav.yml that are NOT in latestNav.yml
missing_entries = {}
for path, line_num in nav_entries.items():
    if path not in latest_nav_entries:
        missing_entries[path] = line_num

# Write results to file
with open('nav_diff_missing_in_latest.txt', 'w') as f:
    f.write("Entries in nav.yml that are NOT in latestNav.yml\n")
    f.write("=" * 80 + "\n\n")
    f.write(f"Summary:\n")
    f.write(f"  Total entries in nav.yml: {len(nav_entries)}\n")
    f.write(f"  Total entries in latestNav.yml: {len(latest_nav_entries)}\n")
    f.write(f"  Missing in latestNav.yml: {len(missing_entries)}\n\n")
    f.write("=" * 80 + "\n\n")
    
    if not missing_entries:
        f.write("No missing entries found. All .md files from nav.yml are in latestNav.yml.\n")
    else:
        f.write(f"Found {len(missing_entries)} entries in nav.yml that are missing in latestNav.yml:\n\n")
        
        # Sort by line number
        sorted_missing = sorted(missing_entries.items(), key=lambda x: x[1])
        
        for idx, (path, line_num) in enumerate(sorted_missing, start=1):
            f.write(f"{idx}. {path}\n")
            f.write(f"   Line number in nav.yml: {line_num}\n")
            f.write("-" * 80 + "\n")

print(f"\nAnalysis complete. Found {len(missing_entries)} missing entries.")
print("Results written to: nav_diff_missing_in_latest.txt")
