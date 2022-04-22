# AWS Transcribe

[AWS Transcribe](https://aws.amazon.com/transcribe/) is a service that recognizes speech in your audio or video and transcribes that speech into text.

!!! note "🔑 Credentials"
    You can find authentication information for this node [here](/workflow/integrations/credentials/aws/).


## Basic Operations

**Transcription Job**
- Create a transcription job
- Delete a transcription job
- Get a transcription job
- Get all transcriptions job


## Example Usage

This workflow allows you to create transcription jobs for all your audio and video files stored in AWS S3. You can also find the [workflow](https://n8n.io/workflows/1111) on Workflow².io. This example usage workflow uses the following nodes.
- [Start](/workflow/integrations/core-nodes/n8n-nodes-base.start/)
- [AWS S3](/workflow/integrations/nodes/n8n-nodes-base.awsS3/)
- [AWS Transcribe]()

The final workflow should look like the following image.

![A workflow with the AMQP Sender node](/_images/integrations/nodes/awstranscribe/workflow.png)

### 1. Start node

The start node exists by default when you create a new workflow.

### 2. AWS S3 node (getAll: file)

This node will retrieve all the files from an S3 bucket you specify.

1. First of all, you'll have to enter credentials for the AWS S3 node. You can find out how to do that [here](/workflow/integrations/credentials/aws/).
2. Select 'Get All' from the ***Operation*** dropdown list.
3. Enter the bucket name in the ***Bucket Name*** field.
4. Toggle ***Return All*** to `true`. This option will return information on all the files stored in the S3 bucket.
5. Click on ***Execute Node*** to run the node.

In the screenshot below, you will notice that the node returns information of all the files stored in the bucket you specified.

![Using the AWS S3 node to fetch information of files stored in a bucket](/_images/integrations/nodes/awstranscribe/awss3_node.png)

### 3. AWS Transcribe node (create: transcriptionJob)

This node will create a transcription job for the files that get returned by the previous node.

1. Select the credentials that you entered in the previous node.
2. Click on the gears icon next to the ***Job Name*** field and click on ***Add Expression***.
3. Enter `{{$json["Key"].replace(/\s/g,'-')}}` in the ***Expression*** field. The code snippet fetches the name of the file and replaces the white-spaces with a hyphen (-).
4. Click on the gears icon next to the ***Media File URI*** field and click on ***Add Expression***.
5. Enter `s3://{{$node["AWS S3"].parameter["bucketName"]}}/{{$json["Key"]}}` in the ***Expression*** field.
6. Toggle ***Detect Language*** to `true`.
7. Click on ***Execute Node*** to run the node.

In the screenshot below, you will notice that the node creates a transcription job for the files stored in an S3 bucket.

![Using the AWS Transcribe node to create a transcription job](/_images/integrations/nodes/awstranscribe/awstranscribe_node.png)
