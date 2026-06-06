import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
  site: process.env.SITE || 'https://aidilidhamportfolio.netlify.app',
  integrations: [mdx(), tailwind()]
});