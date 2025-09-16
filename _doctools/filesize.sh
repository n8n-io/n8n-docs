#!/bin/bash
# This is a simple script to work out the average file sizes in a directory. 
# It is intended to keep track of the size of the built docs, so run on
# the _site directory after an mkdocs build.
# Check if a directory is provided, otherwise use the current directory
dir=${1:-.}

# Find all files recursively and calculate total size and count
file_info=$(find "$dir" -type f -printf "%s\n" 2>/dev/null)

total_size=0
file_count=0

# Sum up sizes and count files
while read -r size; do
    total_size=$((total_size + size))
    ((file_count++))
done <<< "$file_info"

# Calculate and display average file size
if [[ $file_count -eq 0 ]]; then
    echo "No files found in the directory."
else
    avg_size=$((total_size / file_count))
    echo "Total files: $file_count"
    echo "Total size: $total_size bytes"
    echo "Average file size: $avg_size bytes"
fi