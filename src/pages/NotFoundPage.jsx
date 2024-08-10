import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div className="flex flex-col gap-y-4 justify-center items-center h-svh">
      <h1 className="sm:text-4xl text-2xl">404 | Page Not Found</h1>
      <Link
        to="/"
        className="text-blue-500 hover:underline text-xs sm:text-base">
        &larr; Back to home
      </Link>
    </div>
  );
};

export default NotFoundPage;
