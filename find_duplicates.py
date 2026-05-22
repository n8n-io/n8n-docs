#!/usr/bin/env python3
"""Find duplicate .md entries in latestNav.yml"""

from collections import defaultdict

# Read the file
with open('latestNav.yml', 'r') as f:
    lines = f.readlines()

# Dictionary to store entries and their line numbers
md_entries = defaultdict(list)

# Process each line
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
        
        # Store line number for this path
        md_entries[path].append(line_num)

# Find duplicates
duplicates = {path: lines for path, lines in md_entries.items() if len(lines) > 1}

# Write results to file
with open('duplicate_md_entries.txt', 'w') as f:
    f.write("Duplicate .md Entries in latestNav.yml\n")
    f.write("=" * 80 + "\n\n")
    
    if not duplicates:
        f.write("No duplicate entries found.\n")
    else:
        f.write(f"Found {len(duplicates)} duplicate entries:\n\n")
        
        # Sort by number of occurrences (descending) then by path
        sorted_duplicates = sorted(duplicates.items(), 
                                   key=lambda x: (-len(x[1]), x[0]))
        
        for path, line_numbers in sorted_duplicates:
            f.write(f"Path: {path}\n")
            f.write(f"Occurrences: {len(line_numbers)}\n")
            f.write(f"Line numbers: {', '.join(map(str, line_numbers))}\n")
            f.write("-" * 80 + "\n")

print(f"Analysis complete. Found {len(duplicates)} duplicate entries.")
print("Results written to: duplicate_md_entries.txt")
