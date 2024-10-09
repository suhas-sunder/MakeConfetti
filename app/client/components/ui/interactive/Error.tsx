import { Link } from "react-router-dom";

function Error() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-3 bg-gray-100 text-center">
      <span className="text-9xl mb-8 animate-scalePulse">☠️</span>
      <h1 className="text-6xl font-bold text-rose-500">Uh Oh, 404</h1>
      <h2 className="mt-4 text-2xl font-semibold text-gray-800">
        Page Not Found...
      </h2>
      <p className="mt-2 text-gray-600">
        The page you are looking for does not exist.
      </p>
      <Link
        to="/"
        className="mt-6 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition duration-300"
      >
        Go Back Home
      </Link>
    </div>
  );
}

export default Error;
