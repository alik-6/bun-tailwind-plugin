import postcss from "postcss";
import autoprefixer from "autoprefixer";
import tailwind from "tailwindcss";
import { type BunPlugin } from "bun";
import { exists, mkdir } from "node:fs/promises";
import { parse, join } from "node:path";

export type TailwindPluginConfig = {
  tailwindConfig: tailwind.Config;
  outputFile?: string;
  configPath?: string;
  inputFile: string;
};
// TODO: Make it return the valid path instead of main
const createTailwindConfig = async (config: TailwindPluginConfig) => {
  const inputSrc = parse(config.inputFile);
  if (!(await exists(config.inputFile))) {
    mkdir(inputSrc.dir, { recursive: true }).catch((error) =>
      console.error(error)
    );
    Bun.write(
      Bun.file(config.inputFile),
      "@tailwind base;\n@tailwind components;\n@tailwind utilities;"
    );
  }
  if (!config.configPath) config.configPath = inputSrc.dir;
  
  Bun.write(
    Bun.file(`${config.configPath}/tailwind.config.js`),
    `/** @type {import('tailwindcss').Config} */
  module.exports = ${JSON.stringify(config.tailwindConfig)}`
  );
  return parse(config.inputFile);
};
/**

 * @description The Tailwind Plugin for Bun is a plugin designed to integrate Tailwind CSS with the Bun.

 * @param {TailwindPluginConfig} config - The configuration object for the Tailwind Plugin.

 * @returns {BunPlugin} - The Bun plugin instance.

 */
const TailwindPlugin = (config: TailwindPluginConfig): BunPlugin => {
  return {
    name: "@alik6/bun-tailwind-plugin",
    target: undefined,
    setup(build) {
      createTailwindConfig(config).then(async (inputFile) => {
        let outputPath = !config.outputFile
          ? build.config.outdir ?? "dist/"
          : config.outputFile;
        if (outputPath.endsWith("/")) {
          outputPath = join(outputPath, inputFile.base);
        }
        const inputStylesheetContent = await Bun.file(config.inputFile).text();
        const processedCss = await postcss([
          autoprefixer(),
          tailwind({
            ...config.tailwindConfig,
          }),
        ]).process(inputStylesheetContent, {
          from: config.inputFile,
          to: outputPath,
        });
        await Bun.write(Bun.file(outputPath), processedCss.css);
      });
    },
  };
};

export { TailwindPlugin as tailwind };
