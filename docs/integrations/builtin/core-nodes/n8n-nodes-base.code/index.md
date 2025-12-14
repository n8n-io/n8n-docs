// The n8n Code node automatically wraps your code in an 'execute' function.
// We are expecting one input item, which is common after a Set node.
const inputItem = $input.first().json;

// 1. Accessing Input Data
// We access the 'task' property from the data of the first input item.
const userTask = inputItem.task;

// 2. Core Logic (Example Data Processing)
// Replace this section with the logic your original Python code was performing.
// REMINDER: No file I/O operations (fs.readFile, etc.) are allowed here.

let processedResult = "";
let wordCount = 0;

if (userTask) {
  // Example 1: Convert the task to a title-case format
  processedResult = userTask.toLowerCase().split(' ').map(word =>
    word.charAt(0).toUpperCase() + word.slice(1)
  ).join(' ');

  // Example 2: Simple calculation (Word Count)
  wordCount = userTask.trim().split(/\s+/).length;
} else {
  processedResult = "No task provided.";
}

// 3. Output Result
// We create a new item to pass to the next node.
// All n8n Code nodes must return an array of objects.
return [{
  json: {
    // The original task we received
    originalTask: userTask,
    // The result of our JavaScript logic
    modifiedTask: processedResult,
    // The calculated word count
    count: wordCount,
    // Add any other key/value pairs you need for the rest of your workflow
  }
}];
