import "./tailwind.css";
import NavBar from "./client/components/navigation/NavBar";
import Footer from "./client/components/navigation/Footer";
import cloudflareR2API from "./client/components/api/cloudflareR2API";
import { ungzip } from "pako";

import {
  Outlet,
  Links,
  Meta,
  Scripts,
  ScrollRestoration,
  json,
  ClientLoaderFunctionArgs,
} from "@remix-run/react";
import {
  ThemeProvider,
  useTheme,
} from "./client/components/context/ThemeContext";
import localforage from "localforage";
import { SettingsProvider } from "./client/components/context/SettingsContext";
import { StatsProvider } from "./client/components/context/StatsContext";
import ErrorBoundary from "./client/components/utils/errors/ErrorBoundary";

// Loader function to fetch and return data
export const loader = async () => {
  let words = {};

  // Fetch gzipped file from Cloudflare R2 if not cached
  const response = await cloudflareR2API.get(
    "/word-skull/sortedWords.json.gz",
    {
      method: "GET",
      responseType: "arraybuffer",
    }
  );

  const responseData = new Uint8Array(response.data);

  // Check if the response data is Gzipped
  const isGzip = responseData[0] === 0x1f && responseData[1] === 0x8b;

  if (isGzip) {
    const decompressedData = ungzip(responseData, { to: "string" });
    words = JSON.parse(decompressedData);
  } else {
    const textData = new TextDecoder().decode(responseData);
    words = JSON.parse(textData);
  }

  return json(
    { words }, // Return initial empty array or modify as needed
    {
      headers: {
        "Cache-Control": "max-age=3600, public",
      },
    }
  );
};

export const action = async ({ request }: { request: Request }) => {
  if (request.method !== "POST") {
    return new Response("Method Not Allowed", { status: 405 });
  }

  // Handle POST request (bot or other unknown POST routes)
  return new Response("Not Found", { status: 404 });
};

export async function clientLoader({ serverLoader }: ClientLoaderFunctionArgs) {
  const cacheKey = "words";

  try {
    // Check if words are already cached in localForage
    const cachedWords = await localforage.getItem(cacheKey);

    if (cachedWords) {
      return { words: cachedWords };
    } else {
      const { words }: { words: { [keys: number]: string[] } } =
        await serverLoader();

      // Store the words in localForage for future use
      await localforage.setItem(cacheKey, words);

      return { words };
    }
  } catch (error) {
    console.error("Error fetching or decompressing words data:", error);
    return { words: [] }; // Return an empty array in case of failure
  }
}

export function Body({ children }: { children: React.ReactNode }) {
  const { darkThemeActive } = useTheme();

  return (
    <body className={`pt-6 ${darkThemeActive && "bg-slate-900"}`}>
      <NavBar />
      <div>{children}</div>
      <ScrollRestoration />
      <Scripts />
      <Footer />
    </body>
  );
}


// Layout Component for rendering HTML structure
export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>{" "}
      <ErrorBoundary>
        <ThemeProvider>
          <SettingsProvider>
            <StatsProvider>
              <Body>{children}</Body>
            </StatsProvider>
          </SettingsProvider>
        </ThemeProvider>
      </ErrorBoundary>
    </html>
  );
}

// App Component for managing application state
export default function App() {

  return <Outlet />;
}
