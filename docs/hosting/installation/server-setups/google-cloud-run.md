---
contentType: tutorial
---

# Hosting n8n on Google Cloud Run

This hosting guide shows you how to self-host n8n on Google Cloud Run, a serverless container runtime. If you're just getting started with n8n and don't need a production-grade deployment, you can go with the "easy mode" option below for deployment. Otherwise, if you intend to use this n8n deployment at-scale, refer to the "durable mode" instructions further down.

If you want to deploy to Google Kubernetes Engine (GKE) instead, you can refer to [these instructions](/hosting/installation/server-setups/google-kubernetes-engine.md).

--8<-- "_snippets/self-hosting/warning.md"

--8<-- "_snippets/self-hosting/installation/latest-next-version.md"

## Before you begin: get a Google Cloud project

If you have not yet created a Google Cloud project, [do this first](https://developers.google.com/workspace/guides/create-project) (and ensure you have billing enabled on the project; even if your Cloud Run service runs for free you must have billing activated to deploy). Otherwise, navigate to the project where you want to deploy n8n.

## Easy mode

This is the fastest way to deploy n8n on Cloud Run. For this deployment, n8n's data is in-memory so this is only recommended for demo purposes. **Anytime this Cloud Run service scales to zero or is redeployed, the n8n data will be lost.** Refer to the durable mode instructions below if you need a production-grade deployment.

If you have not yet created a Google Cloud project, [do this first](https://developers.google.com/workspace/guides/create-project) (and ensure you have billing enabled on the project; even if your Cloud Run service will run for free you must have billing enabled to activated to deploy). Otherwise, navigate to the project where you want to deploy n8n.

Open the Cloud Shell Terminal (on the Google Cloud console, either type "G" then "S" or click on the terminal icon on the upper right).

Once your session is open, you may need to run this command first to login (and follow the steps it asks you to complete):

```sh
gcloud auth login
```

You can also explicitly enable the Cloud Run API (even if you don't do this, it will ask if you want this enabled when you deploy):

```sh
gcloud services enable run.googleapis.com
```

To deploy n8n:

```sh
gcloud run deploy n8n \
    --image=n8nio/n8n \
    --region=us-west1 \
    --allow-unauthenticated \
    --port=5678 \
    --no-cpu-throttling \
    --memory=2Gi
```

(you can specify whichever region you prefer, instead of "us-west1")

Once the deployment finishes, open another tab to navigate to the Service URL. n8n may still be loading and you will see a "n8n is starting up. Please wait" message, but shortly thereafter you should see the n8n login screen. 

Optional: If you want to keep this n8n service running for as long as possible to avoid data loss, you can also set manual scale to 1 to prevent it from autoscaling to 0. 

```sh
gcloud run deploy n8n \
    --image=n8nio/n8n \
    --region=us-west1 \
    --allow-unauthenticated \
    --port=5678 \
    --no-cpu-throttling \
    --memory=2Gi \
    --scaling=1
```

This does not prevent data loss completely, such as whenever the Cloud Run service is re-deployed/updated. If you want truly persistant data, you should refer to the instructions below for how to attach a database.

## Durable mode

The following instructions are intended for a more durable, production-grade deployment of n8n on Cloud Run. It includes resources such as a database for persistance and secret manager for sensitive data.

## Enable APIs and set env vars

Open the Cloud Shell Terminal (on the Google Cloud console, either type "G" then "S" or click on the terminal icon on the upper right) and run these commands in the terminal session:

```sh
## You may need to login first
gcloud auth login

gcloud services enable run.googleapis.com
gcloud services enable sqladmin.googleapis.com
gcloud services enable secretmanager.googleapis.com
```

You'll also want to set some environment variables for the remainder of these instructions:

```sh
export PROJECT_ID=your-project
export REGION=region-where-you-want-this-deployed
```

## Setup your Postgres database

Run this command to create the Postgres DB instance (it will take a few minutes to complete; also ensure you update the root-password field with your own desired password):

```sh
gcloud sql instances create n8n-db \
    --database-version=POSTGRES_13 \
    --tier=db-f1-micro \
    --region=$REGION \
    --root-password="change-this-password" \
    --storage-size=10GB \
    --availability-type=ZONAL \
    --no-backup \
    --storage-type=HDD
```

Once complete, you can add the database that n8n will use:

```sh
gcloud sql databases create n8n --instance=n8n-db
```

Create the DB user for n8n (change the password value, of course):

```sh
gcloud sql users create n8n-user \
    --instance=n8n-db \
    --password="change-this-password"
```

You can save the password you set for this n8n-user to a file for the next step of saving the password in Secret Manager. Be sure to delete this file later.

## Store sensitive data in Secret Manager

While not required, it's absolutely recommended to store your sensitive data in Secrets Manager.

Create a secret for the database password (replace "/your/password/file" with the file you created above for the n8n-user password):

```sh
gcloud secrets create n8n-db-password \
    --data-file=/your/password/file \
    --replication-policy="automatic"
```

Create an encryption key (you can use your own, this example generates a random one):

```sh
openssl rand -base64 -out my-encryption-key 42
```

Create a secret for this encryption key (replace "my-encryption-key" if you are supplying your own):

```sh
gcloud secrets create n8n-encryption-key \
    --data-file=my-encryption-key \
    --replication-policy="automatic"
```

Now you can delete my-encryption-key and the database password files you created. These values are now securely stored in Secret Manager.

## Create a service account for Cloud Run

You want this Cloud Run service to be restricted to access only the resources it needs. The following commands create the service account and adds the permissions necessary to access secrets and the database:

```sh
gcloud iam service-accounts create n8n-service-account \
    --display-name="n8n Service Account"

gcloud secrets add-iam-policy-binding n8n-db-password \
    --member="serviceAccount:n8n-service-account@$PROJECT_ID.iam.gserviceaccount.com" \
    --role="roles/secretmanager.secretAccessor"

gcloud secrets add-iam-policy-binding n8n-encryption-key \
    --member="serviceAccount:n8n-service-account@$PROJECT_ID.iam.gserviceaccount.com" \
    --role="roles/secretmanager.secretAccessor"

gcloud projects add-iam-policy-binding $PROJECT_ID \
    --member="serviceAccount:n8n-service-account@$PROJECT_ID.iam.gserviceaccount.com" \
    --role="roles/cloudsql.client"
```

## Deploy the Cloud Run service

Now you can deploy your n8n service:

```sh
gcloud run deploy n8n \
    --image=n8nio/n8n:latest \
    --command="/bin/sh" \
    --args="-c,sleep 5;n8n start" \
    --region=$REGION \
    --allow-unauthenticated \
    --port=5678 \
    --memory=2Gi \
    --no-cpu-throttling \
    --set-env-vars="N8N_PORT=5678,N8N_PROTOCOL=https,DB_TYPE=postgresdb,DB_POSTGRESDB_DATABASE=n8n,DB_POSTGRESDB_USER=n8n-user,DB_POSTGRESDB_HOST=/cloudsql/$PROJECT_ID:$REGION:n8n-db,DB_POSTGRESDB_PORT=5432,DB_POSTGRESDB_SCHEMA=public,GENERIC_TIMEZONE=UTC,QUEUE_HEALTH_CHECK_ACTIVE=true" \
    --set-secrets="DB_POSTGRESDB_PASSWORD=n8n-db-password:latest,N8N_ENCRYPTION_KEY=n8n-encryption-key:latest" \
    --add-cloudsql-instances=$PROJECT_ID:$REGION:n8n-db \
    --service-account=n8n-service-account@$PROJECT_ID.iam.gserviceaccount.com
```

Once the deployment finishes, open another tab to navigate to the Service URL. You should see the n8n login screen.