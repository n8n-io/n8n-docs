* **Sampling Temperature**: controls the randomness of the sampling process. A higher temperature creates more diverse sampling, but increases the risk of hallucinations.
* **Top K**: limits the number of highest probability vocabulary tokens to consider at each step. A higher value increases diversity but may reduce coherence. Set to `-1` to disable. Valid range is between -1 and 100.
* **Top P**: chooses from the smallest possible set of tokens whose cumulative probability exceeds the probability top_p. Helps generate more human-like text by reducing repetitions. Valid range is between 0 and 1.
* **Frequency Penalty**: adjusts the penalty for tokens that have already appeared in the generated text. Higher values discourage repetition. Must be a non-negative number.
* **Keep Alive**: specifies the duration to keep the loaded model in memory after use. Useful for frequently used models. Format: 1h30m (1 hour 30 minutes).
* **Low VRAM Mode**: whether to activate low VRAM mode, which reduces memory usage at the cost of slower generation speed. Useful for GPUs with limited memory.
* **Main GPU ID**: specifies the ID of the GPU to use for the main computation. Only change this if you have multiple GPUs.
* **Context Batch Size**: sets the batch size for prompt processing. Larger batch sizes may improve generation speed but increase memory usage.
* **Context Length**: the maximum number of tokens to use as context for generating the next token. Smaller values reduce memory usage, while larger values provide more context to the model.
* **Number of GPUs**: specifies the number of GPUs to use for parallel processing. Set to `-1` for autodetection.
* **Max Tokens to Generate**: the maximum number of tokens to generate. Set to `-1` for no limit. Be cautious when setting this to a large value, as it can lead to long outputs.
* **Number of CPU Threads**: specifies the number of CPU threads to use for processing. Set to `0` for autodetection.
* **Penalize Newlines**: reduce the chances of the model generating newline characters, encouraging longer continuous sequences of text.
* **Presence Penalty**: adjusts the penalty for tokens based on their presence in the generated text so far. Positive values penalize tokens that have already appeared, encouraging diversity.
