# Micra Remix PoC

## Development

### Install dependencies

```sh
yarn
```

### Setting up the database

To start, make sure you have run the migrations:

```sh
yarn db:merge-schemas && yarn db:up
```

### Running the app

Start the development server by running:

```sh
yarn dev
```

This starts your app in development mode, which will purge the server require cache when Remix rebuilds assets so you don't need a process manager restarting the HTTP server.

## Modules

### Module structure

Micra introduces a module system to organize your code. Modules are a collection of files that are grouped together by a common theme. For example, you might have an `account` module that contains all the files related to account management. Foundational modules unrelated to business logic are defined in the `core` directory whereas the application domain module are defined in the `domains` folder.

At its root, the module contains a `configurations*.ts` file that defines the module's configuration, a `index*.ts` file that exports the module's public API, a `service-provider*.ts` file that registers the module's services on the application container and a `register.d.ts` file that registers the module's types with TypeScript. These files can be `*.ts` (for isomorphic modules), `*.server.ts` for server-specific exports or `*.client.ts` for client-specific exports.

### Services

#### App

#### Authentication

#### Caching

#### Cookies

#### Database

#### Encryption

#### Environment

#### Events

#### Hashing

#### Kernel

#### Logging

#### Session

#### Translation

TODO: Create a translation module

#### UI

TODO: Method to add custom providers without changing the kernel

#### Validation

### Domains

#### Account

Domain responsible for managing user accounts.

#### Dashboard

Domain responsible for managing the dashboard structure.

## Deployment

First, build your app for production:

```sh
npm run build
```

Then run the app in production mode:

```sh
npm start
```

Now you'll need to pick a host to deploy it to.
