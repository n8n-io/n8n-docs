# BinaryFile

## fileType

* **Description:** A string representing the type of the file, e.g. `image`. Corresponds to the first part of the MIME type.
* **Returns:** String
* **Source:** n8n

## mimeType

* **Description:** A string representing the format of the file’s contents, e.g. `image/jpeg`
* **Returns:** String
* **Source:** n8n

## fileName

* **Description:** The name of the file, including extension
* **Returns:** String
* **Source:** n8n

## fileSize

* **Description:** A string representing the size of the file
* **Returns:** String
* **Source:** n8n

## id

* **Description:** The unique ID of the file. Used to identify the file when it is stored on disk or in a storage service such as S3.
* **Returns:** String
* **Source:** n8n

## fileExtension

* **Description:** The suffix attached to the filename (e.g. `txt`)
* **Returns:** String
* **Source:** n8n

## directory

* **Description:** The path to the directory that the file is stored in. Useful for distinguishing between files with the same name in different directories. Not set if n8n is  configured to store files in its database. 
* **Returns:** String
* **Source:** n8n

