# .env File
A special file which contains configuration information in the form of environment [variables](#Variable).

n8n uses the .env file to control how n8n works. See the [n8n docs](https://docs.n8n.io/reference/server-setup.html#_6-create-env-file) for more details.

**See also:**
- [Variable](#Variable)

# Account
Service which allows a user to connect to a computer system or network. User's identity is confirmed through shared [credentials](#Credentials).

Many of the [nodes](#Node) in n8n require you to have an account with the service for which the [node](#Node) was built.

**See also:**
- [Credentials](#Credentials)

# API
An acronym for *Application Programming Interface*, it is a framework for sharing text information by providing a specifically formatted URL to retrieve desired information.

APIs are a critical part of many n8n [nodes](#Node) and [workflows](#Workflow). The [nodes](#Node) talk to the API that is provided by a service on the internet and n8n [workflows](#Workflow) allow these APIs to talk to each other.

**See also:**
- [Header](#Header)
- [URL](#URL)

# Certificate
A file or character string that is used to encrypt and decrypt information between two entities (e.g. computers, applications, users, etc.). It is used to ensure that anyone who intercepts the information between the two entities will not be able to read the information.

n8n uses certificates to keep user information safe when working in the [Editor UI](#editor-ui).

**See also:**
- [Encryption Key](#Encryption-Key)
- [SSL](#SSL)

# CLI
An acronym for *Command Line Interface*, it is a text-based form of processing computer commands entered traditionally via a keyboard.

It is possible to [start a workflow or change its status](https://docs.n8n.io/reference/start-workflows-via-cli.html) using the CLI in n8n.

# Connection
A link between two or more [nodes](#Node) that allows data to flow from one [node](#Node) to another.

This is a core concept in n8n.

# Credentials
Unique pieces of information that identifies a user or a service. A common form of credentials is a [username](#Username) and password pair.

n8n stores encrypted credentials so that it can automate tasks that require this information to run properly.

**See also:**
- [Username](#Username)
- [Password](#Password)
- [Token](#Token)

# Docker
A system to build, run and share applications with all of the services bundled to support the application in one package.

n8n has created a docker installation so that users who have a docker environment can quickly and easily install and run n8n.

# Editor UI
In n8n, this is the web interface used to create [workflows](#Workflow). It is accessed through a web browser at a designated website address.

# Encryption Key
A piece of data, either string or binary, which is used to encode information so that it cannot be easily read. [Encryption keys](#encryption-key) are often long string of seemingly random characters.

n8n will sometimes use [encryption keys](#encryption-key) for accessing [APIs](#API) when required.

**See also:**
- [SSL](#SSL)
- [Certificate](#Certificate)
- [API](#API)

# Execution
A completed run of a [workflow](#Workflow) from start to finish.

n8n logs [workflow](#Workflow) executions and allows the user to see if the [workflow](#Workflow) completed successfully or not.

n8n also has the ability to execute one [workflow](#Workflow) from another [workflow](#Workflow).

# Expression
A string of characters and symbols in a programming language that represents a value depending upon its input.

n8n uses expressions extensively when a [node](#Node) is referring to another [node](#Node) for input.

# Fair-code
A programming language license very similar to open source which allows developers to receive remuneration for use in a for profit product.

n8n is licensed under the fair-code model. See [https://faircode.io/](https://faircode.io/) for more details.

# Function
In programming, a set of reusable commands designed to be run together and launched by other commands in the code. It may or may not receive input from the command that launches it.

Many of the nodes in n8n behave like functions, receiving specific input to generate a specific output.

# IP Address
A string of numbers and letters which represents the location of an electronic device on a TCP/IP network.

n8n will often refer to IP addresses when accessing information on a system other than itself. This is more common when the service is on the local network rather than on the internet.

# JavaScript
A modern programming language popular with web platforms used to create interactive web interfaces.

While n8n is written in TypeScript, the final code generated is JavaScript and the [Function node](https://docs.n8n.io/nodes/n8n-nodes-base.function/) uses JavaScript to create customized [nodes](#Node).

# JSON
An open standard file and data format commonly used with [JavaScript](#JavaScript). It is easy for humans to read and for computers to parse.

The majority of data that is transferred from one [node](#Node) to another in n8n is most likely in the JSON format.

# Header
Section of an HTTP request message that defines allows extra information to be passed between the transmitter and receiver.

n8n has the ability to send custom header information to many [APIs](#API)

**See also:**
- [API](#API)

# Node
The basic building block for n8n. Each [node](#Node) is designed with a specific purpose of receiving, processing or outputting data.

# NodeJS
A package of [JavaScript](#JavaScript) file used to provide everything needed to run [JavaScript](#JavaScript) code without a web browser.

n8n runs on top of NodeJS and uses its libraries extensively.

**See also:**
- [JavaScript](#JavaScript)
- [TypeScript](#TypeScript)

# npm
A program that installs, updates and removes [JavaScript](#JavaScript) [Packages](#Package).

n8n is [installed](https://docs.n8n.io/getting-started/quickstart.html#install-with-npm) and updated using npm.

**See also:**
- [JavaScript](#JavaScript)
- [npx](#npx)
- [Package](#Package)

# npx
A program that will download, run, then delete a [JavaScript](#JavaScript) [Packages](#Package). Often used for quickly testing what a package will do without completely installing it.

You can [try out n8n without installing it](https://docs.n8n.io/getting-started/quickstart.html#give-n8n-a-spin) to your system using npx.

**See also:**
- [JavaScript](#JavaScript)
- [npm](#npm)
- [Package](#Package)

# Package
A group of [JavaScript](#JavaScript) files which are designed to work together for a specific purpose.

n8n is distributed as an [npm](#npm) package.

**See also:**
- [JavaScript](#JavaScript)
- [npm](#npm)
- [npx](#npx)

# Parameter
Data that is passed to a program or script which is used for processing and directly effects the output or results generated.

Many n8n [nodes](#Node) accept parameters to customize their output.

The n8n [CLI](#CLI) also accepts parameters so that it knows how to properly execute.

# Password
A secret string of characters provided to prove one's identity. Often used to gain access to restricted applications and systems.

The n8n [Editor UI](#editor-ui) can be password protected so that only authorized users can access the interface.

n8n also stores passwords as a part of [credentials](#Credentials) for some services.

**See also:**
- [Credentials](#Credentials)
- [Username](#Username)
- [Token](#Token)

# REST API
See *[API](#API)*

# Root User
In *NIX operating system, the user [account](#Account) that has no restrictions placed upon it within the system. The root user is typically only used for performing maintenance and upgrade tasks as improperly run applications using the root user [account](#Account) can cause significant damage to the system.

For the protection of the system, it is generally not recommended that n8n be run by the root user.

# SSL
An acronym for *Secure Socket Layer*, it is the primary way that web based services are secured. A SSL [certificate](#Certificate) is often used on websites to encrypt the information that is travelling between a web server and a web page.

n8n uses SSL [certificates](#Certificate) to secure the n8n [UI](#UI) so that any information that is passed between the n8n server and the user's web browser is encrypted and cannot be spied upon when it is travelling between the two.

# Token
A unique identifier, typically a long string of characters, used to increase the security of systems that request or transmit data. It is usually a shared secret between the sender and the receiver to allow either system to determine if they should be requesting/transmitting data. Tokens can also sometimes be used as [encryption keys](#encryption-key) to make the data which is transmitted illegible to thoses without the token.

n8n uses tokens often when requesting or sending data using [APIs](#API) or [webhooks](#Webhook).

# Trigger
A specific type of [node](#Node) that starts a [workflow](#Workflow) when it receives data from a source outside of the workflow itself.

A good example of a trigger [node](#Node) in n8n is a [webhook](#Webhook). It listens for data coming into it and then starts a [workflow](#Workflow) when it sees data.

# Tunnel
An encrypted session between two systems used to secure data transmission.

n8n uses a tunnel to allow external users to access n8n installations that are behind firewalls, typically for triggering [webhooks](#Webhook).

# TypeScript
An open source programming language that extends the [JavaScript](#JavaScript) programming language.

n8n is written in TypeScript.

**See also:**
- [JavaScript](#JavaScript)

# UI
An acronym for *User Interface", it is the method or tool a person uses to interact with a computer system and its software.

n8n has a web based UI, meaning that you program and interact with n8n using a web browser.

# URL
An acronym for *Universal Resource Locator*, it is a string of characters that represents a network location. Most people's experience with URLs is in the form of a website address (e.g. https://n8n.io)

n8n's [Editor UI](#editor-ui) is accessed via an URL entered into a web browser (often https://localhost:5678).

Some [nodes](#Node) in n8n access resources on the internet using an URL.

# Username
A character string representing an [account](#Account) on a computer system. It is often paired with a [password](#Password) to allow a person to access information and services that the person has permissions to use.

n8n also stores usernames as a part of [credentials](#Credentials) for some services.

**See also:**
- [Credentials](#Credentials)
- [Password](#Password)
- [Token](#Token)

# Variable
In computer programming, a variable represents a piece of data that can be changed or manipulated by the computer code. Variables are used to temporarily store information for processing.

n8n uses variables extensively throughout its programming and nodes.

**See also:**
- [.env](#.env)

# Webhook
A service that listens for data input from an external source used to trigger an action in a system. Webhooks allow external systems to provide real-time alerts and updates to the system that does not limit the updates to regular polling intervals. Webhooks are often referenced by push notifications.

n8n has the ability to create webhooks that can be used to start workflows and receive data from systems outside of the n8n system itself.

# Workflow
A collection of [nodes](#Node) connected together to produce a specific outcome.

n8n's primary form of programming uses a workflow model to represent both code and data flow.
