import { RemixBrowser } from "@remix-run/react";
import { startTransition, StrictMode, useEffect } from "react";
import { hydrateRoot } from "react-dom/client";
import { posthog } from "posthog-js";

function PosthogInit() {
  useEffect(() => {
    const timer = setTimeout(() => {
      posthog.init("phc_gS5Po7Dghk8Jm2NIy7tdnai9uuwjMttdx4KDfp5cZNZ", {
        api_host: "https://us.i.posthog.com",
        person_profiles: "identified_only", // or 'always' for anonymous users
      });
    }, 5000); // 5 seconds delay

    return () => clearTimeout(timer); // Cleanup on unmount
  }, []);

  return null;
}

startTransition(() => {
  hydrateRoot(
    document,
    <StrictMode>
      <RemixBrowser />
      <PosthogInit />
    </StrictMode>
  );
});
