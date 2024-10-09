import { json, MetaFunction } from "@remix-run/node";
import Error from "../client/components/ui/interactive/Error";

export const meta: MetaFunction = () => {
  return [
    {
      title: "404 Page Not Found! 🥺",
    },
    {
      name: "description",
      content:
        "Oops! The page you are looking for doesn't exist. Please check the URL or return to the homepage! 🎉📲",
    },
  ];
};
export function loader() {
  // This will handle the request and return a 404 response
  return json({ error: "Not Found" }, { status: 404 });
}

export const action = async ({ request }: { request: Request }) => {
  if (request.method !== "POST") {
    return new Response("Method Not Allowed", { status: 405 });
  }

  // Handle POST request (bot or other unknown POST routes)
  return new Response("Not Found", { status: 404 });
};

export default function Wildcard() {
  return <Error />;
}
