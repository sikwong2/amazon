#!/bin/bash

# Remove the output file if it already exists
rm -f all.sql

# Get the directory of the script
script_dir="$(dirname "$0")"

# Create a list of files
files=("../sql/databases.sql"
    "../AccountService/sql/schema.sql"
    "../AccountService/sql/data.sql"
    "../AccountService/sql/test.sql"
    "../OrderService/sql/schema.sql"
    "../OrderService/sql/data.sql"
    "../ProductService/sql/schema.sql"
    "../ProductService/sql/data.sql")

# Loop over the files and concatenate them into one .sql file
for file in "${files[@]}"; do
    # Append the file to all.sql
    cat "${script_dir}/${file}" >> all.sql

    # If the file does not end with a newline, add one
    if [ "$(tail -c1 "${script_dir}/${file}")" != "" ]; then
        echo "" >> all.sql
    fi
done