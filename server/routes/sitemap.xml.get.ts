import { defineEventHandler, setHeader } from "h3";
import { useRuntimeConfig } from "#imports";
import axios from "axios";

let cachedSitemap = null;
let lastFetchTime = null;
const cacheDuration = 24 * 60 * 60 * 1000;

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event);

  const now = Date.now();

  if (cachedSitemap && lastFetchTime && now - lastFetchTime < cacheDuration) {
    setHeader(event, "content-type", "application/xml");
    return cachedSitemap;
  }

  let routes = ["/"];

  try {
    const response = await axios.get(`${config.public.API_ENDPOINT}/tours`, {
      headers: {
        Accept: "application/json",
      },
    });

    const popularTours = response.data;

    if (popularTours.data && Array.isArray(popularTours.data)) {
      popularTours.data.forEach((tour: any) => {
        routes.push(`/tours/${tour.slug}`);
      });
    }
  } catch (error) {
    console.error("Error fetching popular tours:", error);
    // Optionally, you can add a fallback here if the API fails
    // routes = ["/"];
  }

  // Membuat sitemap
  const timestamp = new Date().toISOString();
  cachedSitemap = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...routes.map((route) =>
      [
        "<url>",
        `  <loc>${config.public.APP_DOMAIN + route}</loc>`,
        `  <lastmod>${timestamp}</lastmod>`,
        "</url>",
      ].join("")
    ),
    "</urlset>",
  ].join("");

  lastFetchTime = now;

  // Set header content-type untuk XML
  setHeader(event, "content-type", "application/xml");
  return cachedSitemap;
});
