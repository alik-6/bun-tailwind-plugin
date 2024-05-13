# Tailwind Plugin for Bun

The Tailwind Plugin for Bun is a plugin designed to integrate [Tailwind CSS](https://github.com/tailwindlabs/tailwindcss) with the [Bun](https://github.com/oven-sh/bun). This plugin simplifies the process of using Tailwind CSS within your Bun projects, allowing you to easily compile Tailwind CSS files during the build process.

## Installation

You can install the Tailwind Plugin via Bun:

```bash
bun install @alik6/bun-tailwind-plugin
```

# Usage

## Importing

```ts
import { tailwind } from "@alik6/bun-tailwind-plugin";
```

## Configuration

```ts
import { tailwind } from "@alik6/bun-tailwind-plugin";
import { build } from "bun";

build({
  entrypoints: ["src/main.tsx"],
  // If not explicitly set in 'outputFile', defaults to 'outdir/' if defined, otherwise 'dist/'.
  outdir: "dist/",
  plugins: [
    tailwind({
      // tailwind Configuration
      tailwindConfig: { content: ["src/**/*.{tsx,html}"] },
      // path for output css file
      outputFile: "dist/styles.css",
      // path of input file, created if not found with the default tailwind headers
      inputFile: "src/styles.css",
    }),
  ],
}).catch((e) => console.error(e));
```

# Contributing to @alik6/bun-tailwind-plugin

Welcome to @alik6/bun-tailwind-plugin, We appreciate your interest in contributing.

## Ways to Contribute

1. **Reporting Bugs:** If you encounter a bug, please open an issue on GitHub and provide detailed information about the problem, including steps to reproduce it.

2. **Requesting Features:** If you have an idea for a new feature or enhancement, you can submit a feature request on GitHub. Provide a clear description of the proposed feature and its use case.

3. **Submitting Pull Requests:** If you'd like to contribute code, you can fork the repository, create a new branch, and submit a pull request with your changes. Please ensure that your code adheres to our coding standards and include relevant tests.

## Getting Started

To get started with contributing, follow these steps:

1. Fork the repository on GitHub.

2. Clone your forked repository to your local machine.

3. Create a new branch for your changes (`git checkout -b feature/my-feature`).

4. Make your changes and commit them (`git commit -am 'Add my feature'`).

5. Push your changes to your forked repository (`git push origin feature/my-feature`).

6. Submit a pull request on GitHub.

## License

By contributing to @alik6/bun-tailwind-plugin, you agree that your contributions will be licensed under the [MIT License](LICENSE.md).
