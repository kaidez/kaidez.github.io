# Build Report: 2026-03-27T18-46-33

**Status:** <span style="color: red;">FAILED</span>
**Command:** `npm run build:prod`
**Triggered by:** `npm install`

## Output

```

> kaidez.com@4.0.0 build:prod
> npm run compile-main && NODE_ENV=production eleventy && npm run purge-css && npm run minify-js


> kaidez.com@4.0.0 compile-main
> esbuild ts_src/main.ts --bundle --platform=browser --outfile=src/assets/js/main.js


  src/assets/js/main.js  1.2kb

⚡ Done in 8ms
[11ty] Eleventy Fatal Error (CLI):
[11ty] 1. Error processing a plugin (via EleventyPluginError)
[11ty] 2. Invalid EleventyConfig.addPlugin signature. Should be a function or a valid Eleventy plugin object. (via UserConfigError)
[11ty] 
[11ty] Original error stack trace: UserConfigError: Invalid EleventyConfig.addPlugin signature. Should be a function or a valid Eleventy plugin object.
[11ty]     at UserConfig._executePlugin (file:///Users/kaigittens/sites/kaidez.github.io/node_modules/@11ty/eleventy/src/UserConfig.js:765:10)
[11ty]     at TemplateConfig.processPlugins (file:///Users/kaigittens/sites/kaidez.github.io/node_modules/@11ty/eleventy/src/TemplateConfig.js:350:27)
[11ty]     at async TemplateConfig.mergeConfig (file:///Users/kaigittens/sites/kaidez.github.io/node_modules/@11ty/eleventy/src/TemplateConfig.js:515:3)
[11ty]     at async TemplateConfig.init (file:///Users/kaigittens/sites/kaidez.github.io/node_modules/@11ty/eleventy/src/TemplateConfig.js:232:17)
[11ty]     at async Eleventy.initializeConfig (file:///Users/kaigittens/sites/kaidez.github.io/node_modules/@11ty/eleventy/src/Eleventy.js:264:3)
[11ty]     at async Eleventy.init (file:///Users/kaigittens/sites/kaidez.github.io/node_modules/@11ty/eleventy/src/Eleventy.js:504:4)
[11ty]     at async exec (/Users/kaigittens/sites/kaidez.github.io/node_modules/@11ty/eleventy/cmd.cjs:97:3)
```
