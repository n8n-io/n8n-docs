# Compare Datasets

The Compare Datasets node helps you compare data from two input streams.

## Usage

1. Decide which fields to compare. In **Input A Field**, enter the name of the field you want to use from input stream 1. In **Input B Field**, enter the name of the field you want to use from input stream 2. 
2. **Optional**: you can compare by multiple fields. Select **Add Fields to Match** to set up more comparisons.
3. Choose how to handle differences between the datasets. In **When There Are Differences**, select one of the following:
	* **Use Input A Version**
	* **Use Input B Version**
	* **Use a Mix of Versions**
	* **Include Both Versions**


## Understand the output

There are four output options:

* **In A only Branch**: data that occurs only in the first input.
* **Same Branch**: data that is the same in both inputs.
* **Different Branch**: data that is different between inputs.
* **In B only Branch**: data that occurs only in the second output.
