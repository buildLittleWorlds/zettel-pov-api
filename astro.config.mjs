import { defineConfig } from 'astro/config';
import node from "@astrojs/node";

export default defineConfig({
    output: 'server',
    adapter: node({
        mode: 'standalone' // You can also use 'middleware' if you're integrating with an existing Node.js server
    }),
});