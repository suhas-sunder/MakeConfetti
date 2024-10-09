import fs from "fs";
import path from "path";

// Function to get pages from the routes directory
const getPages = (dir) => {
  const pages = [];
  const files = fs.readdirSync(dir);

  files.forEach((file) => {
    const fullPath = path.join(dir, file);

    if (fs.lstatSync(fullPath).isDirectory()) {
      pages.push(...getPages(fullPath)); // Recursively add sub-pages
    } else if (file.endsWith(".tsx") || file.endsWith(".mdx")) {
      let route = fullPath
        .replace(/^.*routes/, "")
        .replace(".tsx", "")
        .replace("$", "")
        .replace(".mdx", "");
      if (route.endsWith("/index")) route = route.replace("/index", "");
      if (route === "/index") route = "/";
      route = route.replace(/\\/g, "/");
      pages.push(route);
    }
  });

  return pages;
};
const pages = getPages("app/routes");

// Function to create the sitemap XML
const createSitemap = (pages) => {
  let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
  xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

  pages.forEach((page) => {
    xml += `  <url>\n`;
    xml += `    <loc>${`https://www.wordskull.com${page}`}</loc>\n`;
    xml += `    <lastmod>${new Date().toISOString()}</lastmod>\n`;
    xml += `  </url>\n`;
  });

  xml += `</urlset>`;
  return xml;
};

// Generate the sitemap XML
const sitemapXml = createSitemap(pages);

// Define the path for the sitemap.xml file
const sitemapPath = path.join(process.cwd(), "public/sitemap.xml");

// Write the sitemap XML to the file (overwrites or creates the file)
fs.writeFileSync(sitemapPath, sitemapXml, "utf-8");

console.log(`Sitemap has been created/updated successfully: ${sitemapPath}`);
