import re

def execute(input_data):
    """
    Simulates the logic of an n8n Code node using Python.
    The input_data is expected to be a list of dictionaries (items).

    Args:
        input_data (list): A list where each element is a dictionary
                           representing an input item (node data).

    Returns:
        list: A list of dictionaries representing the output items.
    """
    # 1. Accessing Input Data
    # In n8n, input_data[0] is often the first item.
    if not input_data:
        # Handle case where no input items are provided
        return [{
            "originalTask": None,
            "modifiedTask": "Error: No input data provided.",
            "count": 0
        }]

    # Access the JSON data of the first item
    input_item = input_data[0]

    # We access the 'task' property directly from the dictionary structure
    user_task = input_item.get('task')

    # 2. Core Logic (Example Data Processing)
    processed_result = ""
    word_count = 0

    if user_task and isinstance(user_task, str):
        # Example 1: Convert the task to a Title-Case format
        # This is equivalent to the JavaScript logic:
        # userTask.toLowerCase().split(' ').map(...).join(' ')
        # Python's title() method does this easily.
        processed_result = user_task.title()

        # Example 2: Simple calculation (Word Count)
        # Use regex to split by any whitespace character, ensuring accuracy.
        words = re.split(r'\s+', user_task.strip())
        # Filter out empty strings that might result from extra spaces
        word_count = len([word for word in words if word])
    else:
        processed_result = "No valid task string provided."

    # 3. Output Result
    # Python returns a list of dictionaries, matching the n8n output structure.
    output_item = {
        # The original task we received
        "originalTask": user_task,
        # The result of our Python logic
        "modifiedTask": processed_result,
        # The calculated word count
        "count": word_count,
    }

    # The function must return a list of items (even if it's just one item)
    return [output_item]

# --- Example Usage (For local testing only) ---
# Mock Input Data structure similar to what n8n provides to the code node
mock_input = [
    {"task": "this is a test sentence for title case and counting"},
    # Subsequent items would follow if you had multiple inputs
]

# Run the function and print the result
# print(execute(mock_input))

## Add your workflow to the n8n library

--8<-- "_snippets/workflows/templates/submit-templates.md"

## Self-hosted n8n: Use your own library

--8<-- "_snippets/workflows/templates/custom-templates-library.md"
