/**
 * 【注意】：使用 ts 后缀名格式的 rollup 配置文件 rollup.config.ts，使用 rollup -c 命令打包时要添加如下参数：
 * rollup --config rollup.config.ts --configPlugin @rollup/plugin-typescript --bundleConfigAsCjs
 * 并且，需要执行 npm i tslib -D 安装 tslib 库，
 * 否则打包出错，无法识别 ts 后缀名格式的 rollup 配置文件，要改为 js 后缀 rollup.config.js
 */

import { defineConfig } from 'rollup';

// typescript 配置插件
import typescript from '@rollup/plugin-typescript';

// 代码压缩插件
import terser from '@rollup/plugin-terser';

/****** 打包前先删除之前生成的文件夹 ******/
import { execSync } from 'node:child_process';
import fs from 'node:fs';
// 打包生成的目录，如果 tsconfig.json 配置了 outDir，要一致
const build_dir = 'dist';
// 根据操作系统平台使用对应的删除目录命令
const rm_dir_cmd = process.platform === 'win32' ? 'rmdir /s /q' : 'rm -rf';
// 如果打包目录存在，则删除
if (fs.existsSync(build_dir)) {
    execSync(`${rm_dir_cmd} ${build_dir}`, { stdio: 'inherit' });
}

export default defineConfig({
    input: {
        index: 'src/index.ts'
    },
    output: [
        {
            dir: build_dir,
            // file: 'index.umd.js',
            format: 'umd',
            // format 为 umd 和 iife，必须加 name 属性，表示在浏览器中挂载打包index中导出的对象到
            // window.keyToHumpOrLine 中
            name: 'keyToHumpOrLine',
            entryFileNames: '[name].[format].js',
            sourcemap: true,
            // src/index.ts 有 export default 默认导出，加以下这个表示为命名分别导出，不会提示警告
            exports: 'named',
        },
        {
            dir: build_dir,
            format: 'es',
            entryFileNames: '[name].[format].js',
            sourcemap: true
        }
    ],
    plugins: [
        typescript({
            // tsconfig 配置项：是否继承 ./tsconfig.json 配置或使用自定义 ts 配置文件，类型为 string | false;
            // 不指定该选项或默认值为 undefined，表示使用 ./tsconfig.json 配置；
            // 设置为 false，表示不使用默认的 ./tsconfig.json 配置后，必须在这里指定 compilerOptions 配置项
            // tsconfig: './tsconfig.json',

            // 指定不同于 ./tsconfig.json 中的配置
            compilerOptions: {
                target: 'es5',
                // 上面 output 项配置了 umd 和 es 两种打包格式的文件，以下和 tsconfig.json 中的 module 要配置为 esnext，
                // moduleResolution 要配置为 node，否则如果 module 配置为 commonjs 打包会有
                // @rollup/plugin-typescript: Rollup requires that TypeScript produces ES Modules. Unfortunately your configuration specifies a "module" other than "esnext". Unless you know what you're doing, please change "module" to "esnext" in the target tsconfig.json file or plugin options.
                // 的警告
                module: 'esnext',
                moduleResolution: 'node',
                rootDir: './src',
                outDir: build_dir,
                // lib: ['es5', 'es6', 'dom'],
                declaration: true,
                declarationDir: `${build_dir}/types`,
                sourceMap: true,
                removeComments: true,
            },
        }),
        /* terser({
            compress: {
                // 压缩时删除 console.log/warn/error 控制台输出项，默认不删除
                drop_console: true
            }
        }), */
    ]
});