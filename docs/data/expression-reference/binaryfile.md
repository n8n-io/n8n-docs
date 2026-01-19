# BinaryFile

## fileType

* **Description:** A string representing the type of the file, for example,  <code>image</code>. Corresponds to the first part of the MIME type.
* **Syntax:** binaryFile.fileType
* **Returns:** String
* **n8n or JavaScript method:** n8n

## mimeType

* **Description:** A string representing the format of the file’s contents, for example,  <code>image/jpeg</code>
* **Syntax:** binaryFile.mimeType
* **Returns:** String
* **n8n or JavaScript method:** n8n

## fileName

* **Description:** The name of the file, including extension
* **Syntax:** binaryFile.fileName
* **Returns:** String
* **n8n or JavaScript method:** n8n

## fileSize

* **Description:** A string representing the size of the file
* **Syntax:** binaryFile.fileSize
* **Returns:** String
* **n8n or JavaScript method:** n8n

## id

* **Description:** The unique ID of the file. Used to identify the file when it's stored on disk or in a storage service such as S3.
* **Syntax:** binaryFile.id
* **Returns:** String
* **n8n or JavaScript method:** n8n

## fileExtension

* **Description:** The suffix attached to the filename (for example,  <code>txt</code>)
* **Syntax:** binaryFile.fileExtension
* **Returns:** String
* **n8n or JavaScript method:** n8n

## directory

* **Description:** The path to the directory that the file is stored in. Useful for distinguishing between files with the same name in different directories. Not set if n8n is  configured to store files in its database. 
* **Syntax:** binaryFile.directory
* **Returns:** String
* **n8n or JavaScript method:** n8n

