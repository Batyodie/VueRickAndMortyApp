
# VueRickAndMortyApp

This project is a Vue 3 application built using TypeScript and Vite. It's designed to interface with the Rick and Morty API, showcasing a modern web application development setup with Vue 3's `<script setup>` SFCs.

## Features

- Vue 3 composition API
- TypeScript integration
- Vite for fast development and bundling
- Integration with Rick and Morty API
- End-to-end tests with Playwright
- State management with Pinia
- Routing with Vue Router
- UI components with PrimeVue

## Project Setup

To get started, clone the repository and install dependencies:

```bash
git clone https://github.com/Batyodie/VueRickAndMortyApp.git
cd VueRickAndMortyApp
npm install
```

## Running the Application

Run the development server with:

```bash
npm run dev
```

## Building for Production

To build for production, use:

```bash
npm run build
```

## Deployment

To deploy the project, ensure you have Node.js version 18 or higher installed. 

Install dependencies with:

```bash
npm ci
```

Then, run the build command:

```bash
npm run build
```

## Running Tests

To run tests locally:

- Ensure you have Node.js version 18 or higher.
- Install the necessary dependencies for Playwright:

  ```bash
  nps playwright install --with-deps
  ```

- To run the tests, execute:

  ```bash
  npm run test
  ```

## Contributing

Contributions to the project are welcome. Please ensure to follow the existing code style and add tests for new features.

## License

This project is open-source and available under the [MIT License](LICENSE).
