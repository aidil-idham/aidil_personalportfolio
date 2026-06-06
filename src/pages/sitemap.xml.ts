import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';

export const GET: APIRoute = async ({ site }) => {
  const blogPosts = await getCollection('blog');
  const storeItems = await getCollection('store');

  const base = site?.href.replace(/\/$/, '') ?? '';

  const staticUrls = [
    `${base}/`,
    `${base}/cv/`,
    `${base}/projects/`,
    `${base}/services/`,
    `${base}/blog/`,
    `${base}/store/`,
  ];

  const blogUrls = blogPosts.map((post) => `${base}/blog/${post.slug}/`);
  const storeUrls = storeItems.map((item) => `${base}/store/${item.slug}/`);

  const allUrls = [...staticUrls, ...blogUrls, ...storeUrls];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allUrls.map((url) => `  <url>\n    <loc>${url}</loc>\n  </url>`).join('\n')}
</urlset>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
    },
  });
};
