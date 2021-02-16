# Glossary

## .env File
A special file which contains configuration information in the form of [environment variables](#environment-variables).

n8n uses the .env file to control how n8n works. You can set items such as username and password for the editor or your timezone using this file. See the [n8n docs](server-setup.html#_6-create-env-file) for more details.

To learn more about the *.env* file, read [Manage Environment Variables in your NodeJS Application with dotenv](https://itnext.io/manage-environment-variables-in-your-nodejs-application-with-dotenv-520914a9254b).

## Account
Service which allows a user to connect to a product. User's identity is confirmed through shared [credentials](#Credentials). Also known as a *user account*.

Many of the [nodes](#Node) in n8n require you to have an account with the service for which the node was built. For example, Typeform.

## API
An acronym for *Application Programming Interface*, it is a framework for sharing text information by providing a specifically formatted [URL](#URL) to retrieve desired information.

APIs are a critical part of many n8n [nodes](#Node) and [workflows](#Workflow). The nodes talk to the API that is provided by a service on the internet. n8n [workflows](#Workflow) allow these APIs to talk to each other.

For a more detailed understanding of APIs, see [What is API: Definition, Types, Specifications, Documentation](https://www.altexsoft.com/blog/engineering/what-is-api-definition-types-specifications-documentation/).

**See also:**
- [Header](#Header)

## Certificate
A file or character string that is used to encrypt and decrypt information between two entities (e.g. computers, applications, users, etc.). It is used to ensure that anyone who intercepts the information between the two entities will not be able to read the information.

n8n uses certificates to keep user information safe when working in the [Editor UI](#editor-ui). You can also [customize the cetificate](configuration.md) that you use in n8n.

For further information, see [What are certificates?](https://www.youtube.com/watch?v=LRMBZhdFjDI).

**See also:**
- [Encryption Key](#Encryption-Key)
- [SSL](#SSL)

## CLI
An acronym for *Command Line Interface*, it is a text-based form of processing computer commands.

It is possible to [start a workflow or change its status](start-workflows-via-cli.md) using the CLI in n8n.

To learn more, see [What is Command Line Interface (CLI)?](https://www.w3schools.com/whatis/whatis_cli.asp).

## Connection
A link between two or more [nodes](#Node) that allows data to flow from one node to another.

This is a [core concept](../getting-started/key-components.html#connection) in n8n.

## Credentials
Unique pieces of information that identifies a user or a service. A common form of credentials is a [username](#Username) and [password](#Password) pair.

n8n [stores encrypted credentials](../nodes/credentials/README.md) so that it can automate tasks that require this information to run properly.

For more information, see [Credentials](https://www.techopedia.com/definition/10259/credentials).

**See also:**
- [Token](#Token)

## Docker
A system to build, run and share applications with all of the services bundled to support the application in one package.

n8n has created a [docker image](docker.md) so that users who have a docker environment can quickly install and run n8n.

For more information, read [Docker overview](https://docs.docker.com/get-started/overview/) and [A Docker Tutorial for Beginners](https://docker-curriculum.com/).

## Editor UI
In n8n, this is the web interface used to create [workflows](#Workflow). It is accessed through a web browser at a designated website address.

To learn more about user interfaces, see [User interface](https://en.wikipedia.org/wiki/User_interface).

## Encryption Key
A piece of data, either string or binary, which is used to encode information so that it cannot be easily read. Encryption keys are often long string of seemingly random characters.

n8n will sometimes use encryption keys for accessing [APIs](#API) when required. It also uses a [personal encryption key](../nodes/node-basics.md#credentials) to secure credentials.

For more information, see [What are encryption keys and how do they work? 🔐](https://medium.com/codeclan/what-are-encryption-keys-and-how-do-they-work-cc48c3053bd6)

**See also:**
- [SSL](#SSL)
- [Certificate](#Certificate)

## Environment Variables
Environment variables are predetermined values that typically get used to provide the ability to configure your program from outside of your application. An environment variable consists of a key-value pair. For example, `N8N_BASIC_AUTH_USER=user`. Here, `N8N_BASIC_AUTH_USER` is the key and `user` is the value.

n8n uses environment variables that help you configure your self-hosted n8n instance. You can use environment variables to set [username](#username) and [password](#password) for your n8n instance, configure the timezone, and a lot more. Refer to the [configuration](https://docs.n8n.io/reference/configuration.html) page to learn more about the environment variables used in n8n.

## Execution
A completed run of a [workflow](#Workflow) from start to finish.

n8n logs workflow executions and allows the user to see if the workflow completed successfully or not.

n8n also has the ability to execute one workflow from another workflow.

To learn more, see [Execution (computing)](https://windowsreport.com/execution-computing/).

## Expression
A string of characters and symbols in a programming language that represents a value depending upon its input.

n8n uses [expressions](../nodes/expressions.md) extensively when a [node](#Node) is referring to another node for input.

Find out more about *expressions* by reading [Expression](https://www.techopedia.com/definition/1808/expression-computer-science).

## Fair-code
A software model very similar to open source which allows developers to receive remuneration for use in a for profit product.

n8n is licensed under the fair-code model. See [faircode.io](https://faircode.io/) for more details.

## Function
In programming, a set of reusable commands designed to be run together and launched by other commands in the code. It may or may not receive input from the command that launches it.

Many of the nodes in n8n behave like functions, receiving specific input to generate a specific output.

To learn more about *functions*, see [Computer Programming - Functions](https://www.tutorialspoint.com/computer_programming/computer_programming_functions.htm).

## IP Address
A string of numbers and letters which represents the location of an electronic device on a TCP/IP network.

n8n will often refer to [IP addresses](configuration.md) when accessing information on a system other than itself. This is more common when the service is on the local network rather than on the internet.

If you want to learn more about *IP addresses*, see [What Is an IP Address?](https://computer.howstuffworks.com/internet/basics/what-is-an-ip-address.htm).

## JavaScript
A modern programming language popular with web platforms used to create interactive web interfaces.

While n8n is written in TypeScript, the final code generated is JavaScript and the [Function node](../nodes/nodes-library/core-nodes/Function/README.md) uses JavaScript to create customized [nodes](#Node). [JavaScript](javascript-code-snippets.md) is used in the n8n's Function nodes.

To learn more about Javascript, visit [Javascript Tutorial](https://www.w3schools.com/js/DEFAULT.asp).

## JSON
An open standard file and data format commonly used with [JavaScript](#JavaScript). It is easy for humans to read and for computers to parse.

The majority of data that is transferred from one [node](#Node) to another in n8n is most likely in the JSON format.

For further reading, please see [Introducing JSON](https://www.json.org/json-en.html).

## Header
Section of an HTTP request message that defines allows extra information to be passed between the transmitter and receiver.

n8n has the ability to send custom header information to many [APIs](#API), specifically in the [HTTP Request node](../nodes/nodes-library/core-nodes/HTTPRequest/README.md).

For further information, see [Request header](https://developer.mozilla.org/en-US/docs/Glossary/Request_header).

## Node
The basic building block for n8n. Each [node](#Node) is designed with a specific purpose of receiving, processing or outputting data.

For more information, see [Node Basics](../nodes/node-basics.md).

## NodeJS
A package of [JavaScript](#JavaScript) file used to provide everything needed to run JavaScript code without a web browser.

n8n runs on top of NodeJS and uses its libraries extensively.

Read more at [About Node.js](https://nodejs.org/en/about/).

**See also:**
- [TypeScript](#TypeScript)

## npm
A program that installs, updates and removes [JavaScript](#JavaScript) [Packages](#Package).

n8n is [installed](../getting-started/quickstart.md#install-with-npm) and updated using npm.

Find out more at [About npm](https://docs.npmjs.com/about-npm).

**See also:**
- [npx](#npx)

## npx
A program that will download, run, then delete a [JavaScript](#JavaScript) [Packages](#Package). Often used for quickly testing what a package will do without completely installing it.

You can [try out n8n without installing it](../getting-started/quickstart.md#give-n8n-a-spin) to your system using npx.

For more information about *npx*, see [npx documentation](https://docs.npmjs.com/cli/v7/commands/npx).

**See also:**
- [npm](#npm)

## Package
A group of [JavaScript](#JavaScript) files which are designed to work together for a specific purpose.

n8n is also distributed as an [npm](#npm) package.

For more information, see [software package](https://www.techopedia.com/definition/4360/software-package).

**See also:**
- [npx](#npx)

## Parameter
Data that is passed to a program or script which is used for processing and directly effects the output or results generated.

Many n8n [nodes](#Node) accept parameters to customize their output.

The n8n [CLI](#CLI) also accepts parameters so that it knows how to properly execute.

For more information, see [Functions, procedures nad modules](https://www.bbc.co.uk/bitesize/guides/z9hykqt/revision/4).

## Password
A secret string of characters provided to prove one's identity. Often used to gain access to restricted applications and systems.

The n8n [Editor UI](#editor-ui) can be password protected so that only authorized users can access the interface.

n8n also stores passwords as a part of [credentials](#Credentials) for some services.

To read more about *passwords*, see [The Importance of passwords](https://it.uottawa.ca/security/identity-authentication-theft).

**See also:**
- [Username](#Username)
- [Token](#Token)

## REST API
See *[API](#API)*

## Root User
In *NIX operating system, the user [account](#Account) that has no restrictions placed upon it within the system. The root user is typically only used for performing maintenance and upgrade tasks as improperly run applications using the root user account can cause significant damage to the system.

For the protection of the system, it is generally not recommended that n8n be run by the root user.

For more information about *root*, see [root Definition](http://www.linfo.org/root.html).

## SSL
An acronym for *Secure Socket Layer*, it is the primary way that web based services are secured. A SSL [certificate](#Certificate) is often used on websites to encrypt the information that is travelling between a web server and a web page.

n8n uses SSL certificates to secure the n8n [UI](#UI) so that any information that is passed between the n8n server and the user's web browser is encrypted and cannot be spied upon when it is travelling between the two. It is possible to [customize](configuration.md) the SSL installation.

For further reading, see [SSL and SSL Certificates Explained For Beginners](http://www.steves-internet-guide.com/ssl-certificates-explained/).

## Token
A unique identifier, typically a long string of characters, used to increase the security of systems that request or transmit data. It is usually a shared secret between the sender and the receiver to allow either system to determine if they should be requesting/transmitting data. Tokens can also sometimes be used as [encryption keys](#encryption-key) to make the data which is transmitted illegible to thoses without the token.

n8n uses tokens often when requesting or sending data using [APIs](#API) or [webhooks](#Webhook).

For more information, see [token](https://whatis.techtarget.com/definition/token).

## Trigger
A specific type of [node](#Node) that starts a [workflow](#Workflow) when it receives data from a source outside of the workflow itself.

A good example of a [trigger node](https://docs.n8n.io/nodes/node-basics.html#trigger-nodes) in n8n is a [webhook](#Webhook). It listens for data coming into it and then starts a [workflow](#Workflow) when it sees data.

For more information about *triggers*, see [Event Driven Programming](https://en.wikipedia.org/wiki/Event-driven_programming).

## Tunnel
An encrypted session between two systems used to secure data transmission.

n8n [uses a tunnel](../getting-started/quickstart.md#starting-n8n-with-tunnel) to allow external users to access n8n installations that are behind firewalls, typically for triggering [webhooks](#Webhook). This setup is recommended for testing use only.

For further reading, see [VPN Tunnels explained: what are they and how can they keep your internet data secure](https://www.techradar.com/vpn/vpn-tunnels-explained-how-to-keep-your-internet-data-secure).

## TypeScript
An open source programming language that extends the [JavaScript](#JavaScript) programming language.

n8n is written in TypeScript.

Read more at [Typescript](https://www.typescriptlang.org/).

## UI
An acronym for *User Interface*, it is the method or tool a person uses to interact with a computer system and its software.

n8n has a web based UI, meaning that you program and interact with n8n using a web browser.

Learn more at [user interface (UI)](https://searchapparchitecture.techtarget.com/definition/user-interface-UI).

## URL
An acronym for *Universal Resource Locator*, it is a string of characters that represents a network location. Most people's experience with URLs is in the form of a website address (e.g. https://n8n.io)

n8n's [Editor UI](#editor-ui) is accessed via an URL entered into a web browser (often https://localhost:5678).

Some [nodes](#Node) in n8n access resources on the internet using an URL.

Read more at [What is a URL?](https://developer.mozilla.org/en-US/docs/Learn/Common_questions/What_is_a_URL).

## Username
A character string representing an [account](#Account) on a computer system. It is often paired with a [password](#Password) to allow a person to access information and services that the person has permissions to use.

n8n also stores usernames as a part of [credentials](#Credentials) for some services.

Read more at [Username](https://techterms.com/definition/username).

**See also:**
- [Token](#Token)

## Variable
In computer programming, a variable represents a piece of data that can be changed or manipulated by the computer code. Variables are used to temporarily store information for processing.

n8n uses variables extensively throughout its programming and nodes.

Read more at [Computer Programming - Variables](https://www.tutorialspoint.com/computer_programming/computer_programming_variables.htm).

**See also:**
- [.env](#.env)

## Webhook
A service that listens for data input from an external source used to trigger an action in a system. Webhooks allow external systems to provide real-time alerts and updates to the system that does not limit the updates to regular polling intervals. Webhooks are often referenced by push notifications.

n8n has the ability to create [webhooks](../nodes/nodes-library/core-nodes/Webhook/README.md) that can be used to start workflows and receive data from systems outside of the n8n system itself.

To learn more about *webhooks*, see [What's a Webhook?](https://sendgrid.com/blog/whats-webhook/).

## Workflow
A collection of [nodes](#Node) connected together to produce a specific outcome.

n8n's primary form of programming uses a [workflow model](workflow.md) to represent both code and data flow.

For more information, see [Workflow application](https://en.wikipedia.org/wiki/Workflow_application).
