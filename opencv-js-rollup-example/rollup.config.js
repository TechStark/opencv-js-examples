import commonjs from "@rollup/plugin-commonjs";
import { nodeResolve } from "@rollup/plugin-node-resolve";

export default {
  input: "src/index.js",
  output: [
    {
      dir: "dist",
      format: "cjs",
      sourcemap: true,
    },
  ],
  plugins: [
    nodeResolve(),
    commonjs({
      ignore: ["fs", "path", "crypto"],
    }),
  ],
};
