---
contentType: tutorial
nodeTitle: Deploy to Heroku
originalFilePath: hosting/installation/server-setups/heroku.md
originalUrl: 'https://docs.n8n.io/hosting/installation/server-setups/heroku'
url: >-
  https://docs.n8n.io/deploy/host-n8n/install-options/use-a-cloud-provider/deploy-to-heroku
layout:
  description:
    visible: false
---

# Hosting n8n on Heroku <a href="#hosting-n8n-on-heroku" id="hosting-n8n-on-heroku"></a>

This hosting guide shows you how to self-host n8n on Heroku. It uses:


- [Docker Compose](https://docs.docker.com/compose/) to create and define the application components and how they work together.
- [Heroku's PostgreSQL service](https://devcenter.heroku.com/categories/heroku-postgres) to host n8n's data storage.
- A **Deploy to Heroku** button offering a one click, with minor configuration, deployment.

{% include "https://app.gitbook.com/s/GixZThfitWP21x2gQFpD/~/reusable/4aeKXmptxbjmVpQ2Tfgn/" %}

{% include "https://app.gitbook.com/s/GixZThfitWP21x2gQFpD/~/reusable/CcSOA8s7oK44B90i5WIm/" %}


## Use the deployment template to create a Heroku project <a href="#use-the-deployment-template-to-create-a-heroku-project" id="use-the-deployment-template-to-create-a-heroku-project"></a>

The quickest way to get started with deploying n8n to Heroku is using the **Deploy to Heroku** button:

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://dashboard.heroku.com/new?template=https://github.com/n8n-io/n8n-heroku/tree/main)

This opens the **Create New App** page on Heroku. Set a name for the project, and choose the region to deploy the project to.

### Configure environment variables <a href="#configure-environment-variables" id="configure-environment-variables"></a>

Heroku pre-fills the configuration options defined in the `env` section of the `app.json` file, which also sets default values for the environment variables n8n uses.

You can change any of these values to suit your needs. You must change the following values:

- **N8N_ENCRYPTION_KEY**, which n8n uses to [encrypt user account details](../../configure-n8n/basic-configuration/use-environment-variables/deployment.md) before saving to the database.
- **WEBHOOK_URL** should match the application name you create to ensure that webhooks have the correct URL.

### Deploy n8n <a href="#deploy-n8n" id="deploy-n8n"></a>

Select **Deploy app**.

After Heroku builds and deploys the app it provides links to **Manage App** or **View** the application.

{% hint style="info" %}
**Heroku and DNS**

Refer to the [Heroku documentation](https://devcenter.heroku.com/categories/networking-dns) to find out how to connect your domain to a Heroku application.
{% endhint %}
## Changing the deployment template <a href="#changing-the-deployment-template" id="changing-the-deployment-template"></a>

You can make changes to the deployment template by forking the [repository](https://github.com/n8n-io/n8n-heroku) and deploying from you fork.

### The Dockerfile <a href="#the-dockerfile" id="the-dockerfile"></a>

By default the Dockerfile pulls the latest n8n image, if you want to use a different or fixed version, then update the image tag on the top line of the `Dockerfile`.

### Heroku and exposing ports <a href="#heroku-and-exposing-ports" id="heroku-and-exposing-ports"></a>

Heroku doesn't allow Docker-based applications to define an exposed port with the `EXPOSE` command. Instead, Heroku provides a `PORT` environment variable that it dynamically populates at application runtime. The `entrypoint.sh` file overrides the default Docker image command to instead set the port variable that Heroku provides. You can then access n8n on port 80 in a web browser.

{% hint style="info" %}
**Docker limitations with Heroku**

[Read this guide](https://devcenter.heroku.com/articles/container-registry-and-runtime#unsupported-dockerfile-commands) for more details on the limitations of using Docker with Heroku.
{% endhint %}
### Configuring Heroku <a href="#configuring-heroku" id="configuring-heroku"></a>

The `heroku.yml` file defines the application you want to create on Heroku. It consists of two sections:

* `setup` > `addons` defines the Heroku addons to use. In this case, the PostgreSQL database addon.
* The `build` section defines how Heroku builds the application. In this case it uses the Docker buildpack to build a `web` service based on the supplied `Dockerfile`.

## Next steps <a href="#next-steps" id="next-steps"></a>

{% include "https://app.gitbook.com/s/GixZThfitWP21x2gQFpD/~/reusable/yiPh3sntkE3OYC67RAnX/" %}
