# Creating n8n-nodes-module

In this guide, you’ll learn to create a custom n8n-nodes-module that can be installed separately alongside your n8n instance. The n8n-nodes-module is an npm package that contains the node. Your custom node will get loaded automatically when n8n starts.

Consider creating n8n-nodes-module if any of the following conditions satisfy your needs:
- The nodes are only for yourself, your organization, or a small group of people.
- The nodes require external dependencies that are not already available in n8n.

**NOTE:** n8n-nodes-module can only be installed in self-hosted n8n instances. This functionality is currently not available on n8n.cloud or the desktop app. There are plans to introduce this functionality in the future.

## Prerequisites

You may already be familiar with creating nodes in n8n. If you are unfamiliar with how to create n8n nodes, you can learn about it following the instructions mentioned in the [Creating Your First Node](https://docs.n8n.io/nodes/creating-nodes/create-node.html) tutorial.

Install the following tools:

- **Git:** You can find instructions on how to install Git [here](https://git-scm.com/downloads).
- **Node.js and npm:** You can find instructions how to install both using nvm (Node Version Manager) [here](https://github.com/nvm-sh/nvm). The current minimum version is `14.15`. In case you already have Node.js and npm installed, you can check the current version with the following command:
	```bash
	node -v
	npm -v
	```

**NOTE:** Use node version `14.x` and npm version `6.x`. If using npm version `7+`, you must enable legacy peer dependencies by setting: `npm config set legacy-peer-deps true`.

- **Lerna:** You can install lerna globally with the following command:
	```bash
	npm i
	```

- Install n8n: Create a new folder and install n8n using the command:

```bash
npm install n8n
```

## Create custom n8n-nodes-module

You can create multiple n8n-nodes-modules. Each individual n8n-nodes-module should get created in a separate folder since they are different npm packages. A single n8n-nodes-module can contain multiple nodes. If you’re creating multiple nodes in the same module, as a best practice create each node in a separate folder.

In this tutorial, you will create an n8n-nodes-module for the OpenWeatherMap API. You will name it ***n8n-nodes-weather***.

To quickly get started, clone the example starter using the following command:

```bash
git clone https://github.com/n8n-io/n8n-nodes-starter.git n8n-nodes-weather.
```

After the repo gets cloned, open the package.json file, and update the value of the name by replacing `n8n-nodes-starter` with `n8n-nodes-weather`.

**NOTE:** The name of the module has to start with `n8n-nodes-`.

Open the cloned repository in your code editor, and create a new folder called `Weather`, inside the ***nodes*** folder. Create `Weather.node.ts` file inside the Weather folder and paste the following code:

```ts
import {
	IExecuteFunctions,
} from 'n8n-core';
import {
	IDataObject,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
	NodeApiError,
	NodeOperationError,
} from 'n8n-workflow';

import { OptionsWithUri } from 'request';

export class Weather implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Weather',
		name: 'Weather',
		icon: 'fa:sun',
		group: ['input'],
		version: 1,
		description: 'Gets current and future weather information',
		defaults: {
			name: 'Weather',
			color: '#554455',
		},
		inputs: ['main'],
		outputs: ['main'],
		credentials: [
			{
				name: 'weatherApi',
				required: true,
			},
		],
		properties: [
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				options: [
					{
						name: 'Current Weather',
						value: 'currentWeather',
						description: 'Returns the current weather data',
					},
					{
						name: '5 day Forecast',
						value: '5DayForecast',
						description: 'Returns the weather data for the next 5 days',
					},
				],
				default: 'currentWeather',
				description: 'The operation to perform.',
			},
			{
				displayName: 'Format',
				name: 'format',
				type: 'options',
				options: [
					{
						name: 'Imperial',
						value: 'imperial',
						description: 'Fahrenheit | miles/hour',
					},
					{
						name: 'Metric',
						value: 'metric',
						description: 'Celsius | meter/sec',
					},
					{
						name: 'Scientific',
						value: 'standard',
						description: 'Kelvin | meter/sec',
					},
				],
				default: 'metric',
				description: 'The format in which format the data should be returned.',
			},

			// ----------------------------------
			//         Location Information
			// ----------------------------------
			{
				displayName: 'Location Selection',
				name: 'locationSelection',
				type: 'options',
				options: [
					{
						name: 'City Name',
						value: 'cityName',
					},
					{
						name: 'City ID',
						value: 'cityId',
					},
					{
						name: 'Coordinates',
						value: 'coordinates',
					},
					{
						name: 'Zip Code',
						value: 'zipCode',
					},
				],
				default: 'cityName',
				description: 'How to define the location for which to return the weather.',
			},

			{
				displayName: 'City',
				name: 'cityName',
				type: 'string',
				default: '',
				placeholder: 'berlin,de',
				required: true,
				displayOptions: {
					show: {
						locationSelection: [
							'cityName',
						],
					},
				},
				description: 'The name of the city to return the weather of.',
			},

			{
				displayName: 'City ID',
				name: 'cityId',
				type: 'number',
				default: 160001123,
				required: true,
				displayOptions: {
					show: {
						locationSelection: [
							'cityId',
						],
					},
				},
				description: 'The id of city to return the weather of. List can be downloaded here: http://bulk.openweathermap.org/sample/',
			},

			{
				displayName: 'Latitude',
				name: 'latitude',
				type: 'string',
				default: '',
				placeholder: '13.39',
				required: true,
				displayOptions: {
					show: {
						locationSelection: [
							'coordinates',
						],
					},
				},
				description: 'The latitude of the location to return the weather of.',
			},

			{
				displayName: 'Longitude',
				name: 'longitude',
				type: 'string',
				default: '',
				placeholder: '52.52',
				required: true,
				displayOptions: {
					show: {
						locationSelection: [
							'coordinates',
						],
					},
				},
				description: 'The longitude of the location to return the weather of.',
			},

			{
				displayName: 'Zip Code',
				name: 'zipCode',
				type: 'string',
				default: '',
				placeholder: '10115,de',
				required: true,
				displayOptions: {
					show: {
						locationSelection: [
							'zipCode',
						],
					},
				},
				description: 'The id of city to return the weather of. List can be downloaded here: http://bulk.openweathermap.org/sample/',
			},

			{
				displayName: 'Language',
				name: 'language',
				type: 'string',
				default: '',
				placeholder: 'en',
				required: false,
				description: 'The two letter language code to get your output in (eg. en, de, ...).',
			},

		],
	};


	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const returnData: IDataObject[] = [];

		const credentials = await this.getCredentials('openWeatherMapApi');

		if (credentials === undefined) {
			throw new NodeOperationError(this.getNode(), 'No credentials got returned!');
		}

		const operation = this.getNodeParameter('operation', 0) as string;

		let endpoint = '';
		let locationSelection;
		let language;

		let qs: IDataObject;

		for (let i = 0; i < items.length; i++) {

			try {

				// Set base data
				qs = {
					APPID: credentials.accessToken,
					units: this.getNodeParameter('format', i) as string,
				};

				// Get the location
				locationSelection = this.getNodeParameter('locationSelection', i) as string;
				if (locationSelection === 'cityName') {
					qs.q = this.getNodeParameter('cityName', i) as string;
				} else if (locationSelection === 'cityId') {
					qs.id = this.getNodeParameter('cityId', i) as number;
				} else if (locationSelection === 'coordinates') {
					qs.lat = this.getNodeParameter('latitude', i) as string;
					qs.lon = this.getNodeParameter('longitude', i) as string;
				} else if (locationSelection === 'zipCode') {
					qs.zip = this.getNodeParameter('zipCode', i) as string;
				} else {
					throw new NodeOperationError(this.getNode(), `The locationSelection "${locationSelection}" is not known!`);
				}

				// Get the language
				language = this.getNodeParameter('language', i) as string;
				if (language) {
					qs.lang = language;
				}

				if (operation === 'currentWeather') {
					// ----------------------------------
					//         currentWeather
					// ----------------------------------

					endpoint = 'weather';
				} else if (operation === '5DayForecast') {
					// ----------------------------------
					//         5DayForecast
					// ----------------------------------

					endpoint = 'forecast';
				} else {
					throw new NodeOperationError(this.getNode(), `The operation "${operation}" is not known!`);
				}

				const options: OptionsWithUri = {
					method: 'GET',
					qs,
					uri: `https://api.openweathermap.org/data/2.5/${endpoint}`,
					json: true,
				};

				let responseData;
				try {
					responseData = await this.helpers.request(options);
				} catch (error) {
					throw new NodeApiError(this.getNode(), error);
				}


				returnData.push(responseData as IDataObject);

			} catch (error) {
				if (this.continueOnFail()) {
					returnData.push({json:{ error: error.message }});
					continue;
				}
				throw error;
			}
		}

		return [this.helpers.returnJsonArray(returnData)];
	}
}
```

The OpenWeatherMap API requires credentials to return results successfully. Create `WeatherApi.credentials.ts` file in the ***Credentials*** folder and paste the following code:

```ts
import {
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';


export class WeatherApi implements ICredentialType {
	name = 'weatherApi';
	displayName = 'Weather API';
	properties: INodeProperties[] = [
		{
			displayName: 'Access Token',
			name: 'accessToken',
			type: 'string',
			default: '',
		},
	];
}
```

Add the newly created node and the credential to the package.json file. Add `"dist/nodes/Weather/Weather.node.js"` to the ***nodes*** array in the ***n8n*** object (`n8n.nodes`). Similarly, add `"dist/credentials/WeatherApi.credentials.js"` to the ***credentials*** array in the ***n8n*** object (`n8n.credentials`).

## Develop and test the module

Once you’ve created the n8n-nodes-module, you need to build the code and publish the package locally to test it. Run the following commands:

```bash
# Install dependencies
npm install

# Build the code
npm run build

# "Publish" the package locally
npm link
```

**NOTE:** If you get permission errors, run the command as a root user with `sudo`, for example `sudo npm link`.

In the terminal, open the folder where you installed n8n. Run the following command to install the locally published module.

```bash
# "Install" the above locally published module
npm link n8n-nodes-weather
```

Start n8n with the below command

```bash
./node_modules/n8n/bin/n8n start
```

You will now be able to test and use your newly created n8n-nodes-module.

## Publish the n8n-nodes-module

As mentioned, the n8n-nodes-module is an npm package. To make it available to others, you can publish it to the npm registry. Refer to the [Publishing unscoped public packages](https://docs.npmjs.com/creating-and-publishing-unscoped-public-packages#publishing-unscoped-public-packages) guide to learn about publishing packages.

Following the steps mentioned above, you can create multiple nodes within a single n8n-nodes-module. You can also create nodes that require dependencies that are not present in n8n. When creating an n8n-nodes-module make sure that you follow the following guidelines:

- The name of the module should start with `n8n-nodes-`.
- The `package.json` file has to contain a key `n8n` with the paths to nodes and credentials.
- The module has to be installed alongside n8n.

## Use the n8n-nodes-module in production

Once you test and publish your n8n-nodes-module you would want to use it in your production environment.

If you’re running n8n via Docker, you will have to create a Docker image with the node module installed in n8n. Follow the steps below to create your Docker image:

1. Create a Dockerfile and paste the code from [this Dockerfile](https://github.com/n8n-io/n8n/blob/master/docker/images/n8n/Dockerfile).
2. Add the following command in your Dockerfile before the font installation command.

```Dockerfile
RUN cd /usr/local/lib/node_modules/n8n && npm install n8n-nodes-weather
```

Your Dockerfile should be as follow:

```Dockerfile
FROM node:14.15-alpine

# ARG N8N_VERSION

RUN if [ -z "$N8N_VERSION" ] ; then echo "The N8N_VERSION argument is missing!" ; exit 1; fi

# Update everything and install needed dependencies
RUN apk add --update graphicsmagick tzdata git tini su-exec

# # Set a custom user to not have n8n run as root
USER root

# Install n8n and the also temporary all the packages
# it needs to build it correctly.
RUN apk --update add --virtual build-dependencies python build-base ca-certificates && \
	npm_config_user=root npm install -g full-icu n8n && ls -a && \
	apk del build-dependencies \
	&& rm -rf /root /tmp/* /var/cache/apk/* && mkdir /root;

# Install n8n-nodes-weather module
RUN cd /usr/local/lib/node_modules/n8n && npm install n8n-nodes-weather

# Install fonts
RUN apk --no-cache add --virtual fonts msttcorefonts-installer fontconfig && \
	update-ms-fonts && \
	fc-cache -f && \
	apk del fonts && \
	find  /usr/share/fonts/truetype/msttcorefonts/ -type l -exec unlink {} \; \
	&& rm -rf /root /tmp/* /var/cache/apk/* && mkdir /root

ENV NODE_ICU_DATA /usr/local/lib/node_modules/full-icu

WORKDIR /data

COPY docker-entrypoint.sh /docker-entrypoint.sh
RUN chmod +x /docker-entrypoint.sh
ENTRYPOINT ["tini", "--", "/docker-entrypoint.sh"]

EXPOSE 5678/tcp
```

**NOTE:** Replace n8n-nodes-weather with the name of your n8n-nodes-module

3. Build your Docker image using the `docker build .` command.

You will now be able to use your n8n-nodes-module in Docker.

If you’re running either by installing it globally or via PM2, make sure that you install your n8n-nodes-module inside n8n. n8n will find the module and load it automatically.