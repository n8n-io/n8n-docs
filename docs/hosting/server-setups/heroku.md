# Hosting n8n on Heroku

This hosting guide shows you how to self-host n8n on Heroku. It uses:

- [Docker Compose](https://docs.docker.com/compose/){:target="\_blank" .external-link} to create and define the application components and how they work together.
- [Heroku's PostgreSQL service](https://devcenter.heroku.com/categories/heroku-postgres){:target="\_blank" .external-link} to host n8n's data storage.
- A "[Deploy to Heroku](https://devcenter.heroku.com/articles/heroku-button){:target="\_blank" .external-link}" button to offer a one click, with minor configuration, deployment.

## Use deploy template to create a Heroku project

The quickest way to get started with deploying n8n to Heroku is to open the repository that contains the template code and click the `Deploy to Heroku` button at the top of the read me.

This opens the "Create New App" page on Heroku where you can set a name for the project that uses the template and the region to deploy the project to.

### Change environment variables

Heroku pre-fills the configuration options defined in the `setup` > `config` section of the `Dockerfile`, which also sets default values for the environment variables n8n uses.

You can change any of these values to suit your needs, but you should change the following values:

- **N8N_BASIC_AUTH_USER** and **N8N_BASIC_AUTH_PASSWORD** which define the admin user account details.
- **N8N_ENCRYPTION_KEY**, [which n8n uses to encrypt user account details](/hosting/configuration/#encryption-key) before saving to the database.
- **WEBHOOK_URL** should match the application name you create to ensure that webhooks have the correct URL.

When Heroku has built and deployed the app it provides links to manage or view the application.

!!! note "Heroku and DNS"
[Read this page of the Heroku documentation](https://devcenter.heroku.com/categories/networking-dns){:target="\_blank" .external-link} to find out how to connect your domain to a Heroku application.

## Changing the deployment template

You can make changes to the deployment template by forking the repository and deploying from you fork.

### The Dockerfile

By default the Dockerfile pulls the latest n8n image, if you want to use a different or fixed version, then update the image tag on the top line of the _Dockerfile_.

### Heroku and exposing ports

Heroku doesn't allow Docker-based applications to define an exposed port with the `EXPOSE` command. Instead, Heroku provides a `PORT` environment variable that it dynamically populates at application runtime. The _entrypoint.sh_ file overrides the default Docker image command to instead set the port variable that Heroku provides. You can then access n8n on port 80 in a web browser.

!!! note "Docker limitations with Heroku"
[Read this guide](https://devcenter.heroku.com/articles/container-registry-and-runtime#unsupported-dockerfile-commands){:target="\_blank" .external-link} for more details on the limitations of using Docker with Heroku.

### Configuring Heroku

The _heroku.yml_ file defines the application you want to create on Heroku. It consists of two sections.

`setup` > `addons` defines the Heroku addons to use, in this case, only the PostgreSQL database.

The `build` section defines how Heroku will build the application. In this case it uses the Docker buildpack to build a `web` service based on the supplied `Dockerfile`.
