# [UCSC Amazon](https://www.ucsc-amazon.com)

This project is a clone of Amazon developed as a school project by CSE187 Group 2. The project is structured as with multiple services and applications, including account microservice, order microservice, product microservice, and separate front-end applications for admin, vendor, and shopper interfaces. The project leverages Docker for containerization. The outer root directory docker-compose.yml contains the database used by all services.

## Table of Contents

- [Getting Started](#getting-started)
- [Scripts](#scripts)
  - [Docker](#docker)
  - [Development](#development)
  - [Install](#install)
  - [Build](#build)
  - [Start](#start)
  - [Test](#test)
  - [Clean](#clean)
  - [Package](#package)
  - [Containerised](#containerised)

## Getting Started

To get started with the UCSC Amazon project, you need to have Docker and Node.js/NPM LTS installed on your system.

1. Clone the repository:

   ```sh
   git clone https://gitlab.com/cse1871/amazon.git
   cd ucsc-amazon
   ```

2. Install dependencies:
   ```sh
   npm install
   ```

## Scripts

### Docker

- **Start Docker Root Directory Postgres Database**:

  ```sh
  npm run docker-up
  ```

- **Stop Docker Root Directory Postgres Database**:
  ```sh
  npm run docker-down
  ```

### Development

- **Run all services and apps for development**:

  ```sh
  npm run dev
  ```

- **Run account service and vendor app**:

  ```sh
  npm run vendor
  ```

- **Run account service and admin app**:

  ```sh
  npm run admin
  ```

- **Run account service and shopper app**:

  ```sh
  npm run shopper
  ```

- **Run individual services and apps**:
  ```sh
  npm run accounts
  npm run orders
  npm run products
  npm run admin-app
  npm run vendor-app
  npm run shopper-app
  npm run vendor-api
  ```

### Install

- **Install package.json dependencies for all services and apps**:

  ```sh
  npm install # or npm i or npm run install
  ```

- **Install package.json dependencies for individual services and apps**:

  ```sh
  npm run install-vendor
  npm run install-admin
  npm run install-shopper
  npm run install-accounts
  npm run install-orders
  npm run install-products
  npm run install-vendor-api
  ```

- **Install package-lock.json dependencies for all services and apps**:

  ```sh
  npm run cis
  ```

- **Install package-lock.json dependencies for individual services and apps**:
  ```sh
  npm run ci-vendor
  npm run ci-admin
  npm run ci-shopper
  npm run ci-accounts
  npm run ci-orders
  npm run ci-products
  npm run ci-vendor-api
  ```

### Build

- **Build all services and apps**:

  ```sh
  npm run build
  ```

- **Build individual services and apps**:
  ```sh
  npm run build-vendor
  npm run build-admin
  npm run build-shopper
  npm run build-accounts
  npm run build-orders
  npm run build-products
  npm run build-vendor-api
  ```

### Start

- **Start all services and apps**:

  ```sh
  npm run start
  ```

- **Start individual services and apps**:
  ```sh
  npm run start-vendor
  npm run start-admin
  npm run start-shopper
  npm run start-accounts
  npm run start-orders
  npm run start-products
  npm run start-vendor-api
  ```

### Test

- **Test account and product services**:

  ```sh
  npm run test
  ```

- **Test individual services and apps**:
  ```sh
  npm run test-accounts
  npm run test-orders
  npm run test-products
  npm run test-vendor
  npm run test-admin
  npm run test-shopper
  ```

### Package

- **Build Docker image and save as tar**:
  ```sh
  npm run package
  ```

### Containerised

- **Build and start all services and apps inside of Docker**:
  ```sh
  npm run containerised
  ```

This README provides an overview of the functionality of the `package.json` for the UCSC Amazon project. Reference `package.json` for exact details.
