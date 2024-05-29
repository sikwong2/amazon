# [UCSC Amazon](https://www.ucsc-amazon.com)

This project is a clone of Amazon developed as a school project by CSE187 Group 2. The project is structured as with multiple services and applications, including account microservice, order microservice, product microservice, and separate front-end applications for admin, vendor, and shopper interfaces. The project leverages Docker for containerization. Each service has a docker-compose.yml that is only used during testing that occurs with npm run test-with-docker. The outer root directory docker-compose.yml and dockerfile contain the database that is used for production and dev. 

## Table of Contents

- [Getting Started](#getting-started)
- [Scripts](#scripts)
  - [Docker](#docker)
  - [Development](#development)
  - [CI/CD](#cicd)
  - [Build](#build)
  - [Start](#start)
  - [Test](#test)
  - [Clean](#clean)
  - [Package](#package)
  - [Containerized](#containerized)
- [DevDependencies](#devdependencies)

## Getting Started

To get started with the UCSC Amazon project, you need to have Docker and Node.js LTS installed on your system. 

1. Clone the repository:
   ```sh
   git clone https://gitlab.com/cse1871/amazon.git
   cd ucsc-amazon
   ```

2. Install dependencies:
   ```sh
   npm run installs
   ```

## Scripts

### Docker

- **Start Docker Root Directory Postgres Database**:
  ```sh
  npm run docker
  ```

- **Stop Docker Root Directory Containers**:
  ```sh
  npm run docker-down
  ```

### Development

- **First Run Docker and Start the Root Database for Dev**:
  ```sh
  npm run docker
  ```

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

### CI/CD

- **Install dependencies for all services and apps**:
  ```sh
  npm run cis
  ```

- **Install dependencies for individual services and apps**:
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

- **Test with Docker for account and product services**:
  ```sh
  npm run test-with-docker
  ```

- **Test with Docker for individual services**:
  ```sh
  npm run test-with-docker-accounts
  npm run test-with-docker-orders
  npm run test-with-docker-products
  ```

### Clean

- **Clean all services and apps**:
  ```sh
  npm run clean
  ```

- **Clean individual services and apps**:
  ```sh
  npm run clean-accounts
  npm run clean-orders
  npm run clean-products
  npm run clean-vendor
  npm run clean-admin
  npm run clean-shopper
  npm run clean-vendor-api
  ```

- **Clean all Docker containers**:
  ```sh
  npm run clean-all
  npm run clean-docker
  ```

### Package

- **Build Docker image and save as tar**:
  ```sh
  npm run package
  ```

### Containerized

- **Build and start all services and apps inside of Docker**:
  ```sh
  npm run containerized
  ```

## DevDependencies

- **concurrently**: Used to run multiple npm scripts concurrently. 

```json
"devDependencies": {
  "concurrently": "*"
}
```

This README provides an overview of the functionality of the `package.json` for the UCSC Amazon project. Reference `package.json` for exact details. 