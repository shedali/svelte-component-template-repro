import {terser} from "rollup-plugin-terser";
import commonjs from "rollup-plugin-commonjs";
import livereload from "rollup-plugin-livereload";
import pkg from "./package.json";
import resolve from "rollup-plugin-node-resolve";
import rollup_start_dev from "./rollup_start_dev";
import svelte from "rollup-plugin-svelte";
import typescript from "@rollup/plugin-typescript";

import {createEnv, preprocess, readConfigFile} from "@pyoner/svelte-ts-preprocess";

const env = createEnv();
const compilerOptions = readConfigFile(env);
const opts = {
    env,
    compilerOptions: {
        ...compilerOptions,
        allowNonTsExtensions: true
    }
};


const production = !process.env.ROLLUP_WATCH;

const name = pkg.name
    .replace(/^(@\S+\/)?(svelte-)?(\S+)/, "$3")
    .replace(/^\w/, m => m.toUpperCase())
    .replace(/-\w/g, m => m[1].toUpperCase());

export default {
    input: !production ? "src/main.ts" : "src/components/components.module.ts",
    output: !production
        ? {
            sourcemap: true,
            format: "iife",
            name: "app",
            file: "public/bundle.js"
        }
        : [
            {
                file: pkg.module,
                format: "es",
                sourcemap: true,
                name
            },
            {
                file: pkg.main,
                format: "umd",
                sourcemap: true,
                name
            }
        ],
    plugins: [
        svelte({
            preprocess: preprocess(opts),
            dev: !production,
            css: css => {
                css.write("public/bundle.css");
            }
        }),
        // https://github.com/rollup/rollup-plugin-commonjs
        commonjs(),
        resolve({
            modulesOnly: true,
            browser: true,
            dedupe: importee =>
                importee === "svelte" || importee.startsWith("svelte/")
        }),
        // commonjs(),
        typescript({}),

        // In dev mode, call `npm run start:dev` once
        // the bundle has been generated
        !production && rollup_start_dev,

        // Watch the `public` directory and refresh the
        // browser on changes when not in production
        !production && livereload("public"),

        // If we're building for production (npm run build
        // instead of npm run dev), minify
        production && terser()
    ],
    watch: {
        clearScreen: false
    }
};
