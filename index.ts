import postcss from "postcss";
import autoprefixer from "autoprefixer";
import tailwind from "tailwindcss";
import { type BunPlugin } from "bun";
import { exists, mkdir } from "node:fs/promises";
import { parse, join } from "node:path";

export type TailwindPluginConfig = {
  tailwindConfig: tailwind.Config;
  outputFile?: string;
  inputFile: string;
};

const createTailwindConfig = (filePath: string) =>
  exists(filePath).then((exists) => {
    if (exists) return;
    const directory = parse(filePath).dir;
    mkdir(directory, { recursive: true }).catch((error) =>
      console.error(error)
    );
    Bun.write(
      Bun.file(filePath),
      "@tailwind base;\n@tailwind components;\n@tailwind utilities;"
    );
  });
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
      createTailwindConfig(config.inputFile).then(async () => {
        const inputStylesheetPath = parse(config.inputFile);
        let outputPath = !config.outputFile
          ? build.config.outdir ?? "dist/"
          : config.outputFile;
        if (outputPath.endsWith("/")) {
          outputPath = join(outputPath, inputStylesheetPath.base);
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
