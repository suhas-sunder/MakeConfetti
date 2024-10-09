import { useEffect, useState } from "react";

//Prevents hydration issues during SSR by only some components rendering on the client
function useOnlyOnClient() {
  const [isClient, setIsClient] = useState(false);

  // Check if we're on the client side
  useEffect(() => {
    setIsClient(true); // Now we know we're in the browser
  }, []);

  // Don't render the portal on the server (during SSR)
  return isClient;
}

export default useOnlyOnClient;
