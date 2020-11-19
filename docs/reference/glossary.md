# .env File
A special file which contains configuration information in the form of environment variables.

n8n uses the .env file to control how n8n works. See the [n8n docs](https://docs.n8n.io/reference/server-setup.html#_6-create-env-file) for more details.

**See also:**
- [Variables](#Variables)

# Account
Service which allows a user to connect to a computer system or network. User's identity is confirmed through shared credentials.

**See also:**
- [Credentials](#Credentials)

# API
An acronym for *Application Programming Interface*, it is a framework for sharing text information by providing a specifically formatted URL to retrieve desired information.

**See also:**
- [Header](#Header)
- [URL](#URL)

# Certificate
A file or character string that is used to encrypt and decrypt information between two entities (e.g. computers, applications, users, etc.). It is used to ensure that anyone who intercepts the information between the two entities will not be able to read the information.

**See also:**
- [Encryption Key](#Encryption-Key)
- [SSL](#SSL)

# CLI
An acronym for *Command Line Interface*, it is a text-based form of processing computer commands entered traditionally via a keyboard.

# Connection
A link between two or more nodes that allows data to flow from one node to another.

# Credentials
Unique pieces of information that identifies a user or a service. A common form of credentials is a username and password pair.

**See also:**
- [Username](#Username)
- [Password](#Password)
- [Token](#Token)

# Docker
A system to build, run and share applications with all of the services bundled to support the application in one package.

# Editor UI
In n8n, this is the web interface used to create workflows. It is accessed through a web browser at a designated website address.

# Encryption Key
A piece of data, either string or binary, which is used to encode information so that it cannot be easily read. Encryption keys are often long string of seemingly random characters.

**See also:**
- [SSL](#SSL)
- [Certificate](#Certificate)

# Execution
A completed run of a workflow from start to finish.

# Expression
A string of characters and symbols in a programming language that represents a value depending upon its input.

# Fair-code
A programming language license very similar to open source which allows developers to receive remuneration for use in a for profit product.

# Function
In programming, a set of reusable commands designed to be run together and launched by other commands in the code. It may or may not receive input from the command that launches it.

# IP Address
A string of numbers and letters which represents the location of an electronic device on a TCP/IP network.

# JavaScript
A modern programming language popular with web platforms used to create interactive web interfaces.

# JSON
An open standard file and data format commonly used with [JavaScript](#JavaScript). It is easy for humans to read and for computers to parse.

# Header
Section of an HTTP request message that defines allows extra information to be passed between the transmitter and receiver.

**See also:**
- [API](#API)

# Node
The basic building block for n8n. Each node is designed with a specific purpose of receiving, processing or outputting data.

# NodeJS
A package of [JavaScript](#JavaScript) file used to provide everything needed to run [JavaScript](#JavaScript) code without a web browser.

**See also:**
- [JavaScript](#JavaScript)
- [TypeScript](#TypeScript)

# npm
A program that installs, updates and removes [JavaScript](#JavaScript) [Packages](#Package)

**See also:**
- [JavaScript](#JavaScript)
- [npx](#npx)
- [Package](#Package)

# npx
A program that will download, run, then delete a [JavaScript](#JavaScript) [Packages](#Package). Often used for quickly testing what a package will do without completely installing it.

**See also:**
- [JavaScript](#JavaScript)
- [npm](#npm)
- [Package](#Package)

# Password
A secret string of characters provided to prove one's identity. Often used to gain access to restricted applications and systems.

**See also:**
- [Credentials](#Credentials)
- [Username](#Username)
- [Token](#Token)

# Package
A group of [JavaScript](#JavaScript) files which are designed to work together for a specific purpose.

**See also:**
- [JavaScript](#JavaScript)
- [npm](#npm)
- [npx](#npx)

# Parameter
Data that is passed to a program or script which is used for processing and directly effects the output or results generated.

# REST API
See *[API](#API)*

# Root User
In *NIX operating system, the user account that has no restrictions placed upon it within the system. The root user is typically only used for performing maintenance and upgrade tasks as improperly run applications using the root user account can cause significant damage to the system.
# SSL
An acronym for *Secure Socket Layer*, it is the primary way that web based services are secured. A SSL certificate is often used on websites to encrypt the information that is travelling between a web server and a web page.

n8n uses SSL certificated to secure the n8n [UI](#UI) so that any information that is passed between the n8n server and the user's web browser is encrypted and cannot be spied upon when it is travelling between the two.

# Token
A unique identifier, typically a long string of characters, used to increase the security of systems that request or transmit data. It is usually a shared secret between the sender and the receiver to allow either system to determine if they should be requesting/transmitting data. Tokens can also sometimes be used as encryption keys to make the data which is transmitted illegible to thoses without the token.

n8n uses tokens often when requesting or sending data using [APIs](#API) or [webhooks][#Webhook].

# Trigger
A specific type of node that starts a workflow when it receives data from a source outside of the workflow itself.

A good example of a trigger node in n8n is a [webhook][#Webhook]. It listens for data coming into it and then starts a workflow when it sees data.

# Tunnel
An encrypted session between two systems used to secure data transmission.

n8n uses a tunnel to allow external users to access n8n installations that are behind firewalls, typically for triggering [webhooks][#Webhook].

# TypeScript
An open source programming language that extends the [JavaScript](#JavaScript) programming language.

n8n is written in TypeScript.

# UI
An acronym for *User Interface", it is the method or tool a person uses to interact with a computer system and its software.

n8n has a web based UI, meaning that you program and interact with n8n using a web browser.

# URL
An acronym for *Universal Resource Locator*, it is a string of characters that represents a network location. Most people's experience with URLs is in the form of a website address (e.g. https://n8n.io)

# Username
A character string representing an account on a computer system. It is often paired with a [password](#Password) to allow a person to access information and services that the person has permissions to use.

**See also:**
- [Credentials](#Credentials)
- [Password](#Password)
- [Token](#Token)

# Variable
In computer programming, a variable represents a piece of data that can be changed or manipulated by the computer code. Variables are used to temporarily store information for processing.

**See also:**
- [.env](#.env)

# Webhook
A service that listens for data input from an external source used to trigger an action in a system. Webhooks allow external systems to provide real-time alerts and updates to the system that does not limit the updates to regular polling intervals. Webhooks are often referenced by push notifications.

n8n has the ability to create webhooks that can be used to start workflows and receive data from systems outside of the n8n system itself.

# Workflow
A collection of nodes connected together to produce a specific outcome.

n8n's primary form of programming uses a workflow model to represent both code and data flow.
