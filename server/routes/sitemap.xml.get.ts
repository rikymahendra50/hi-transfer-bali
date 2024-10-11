export default defineEventHandler(async (event) => {
  // perform async logic

  const config = useRuntimeConfig(event);

  const domains = config.public.DOMAIN;

  const routes: string[] = ["/"];

  // copy the logic from the module above though you might consider,
  // if relevant, using your CMS's modified date for <lastmod> instead
  const timestamp = new Date().toISOString();
  const sitemap = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...routes.map((route) =>
      [
        "<url>",
        `  <loc>${"https://haitransferbali.com" + route}</loc>`,
        `  <lastmod>${timestamp}</lastmod>`,
        "</url>",
      ].join("")
    ),
    "</urlset>",
  ].join("");

  setHeader(event, "content-type", "application/xml");
  return sitemap;
});
