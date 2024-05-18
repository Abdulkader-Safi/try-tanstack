import { createRootRoute, Link, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";

import "./../main.css";

export const Route = createRootRoute({
  component: () => (
    <>
      <div className="w-full p-2 flex justify-around items-center gap-2">
        <Link to="/" className="[&.active]:font-bold">
          Home
        </Link>
        <Link to="/table" className="[&.active]:font-bold">
          Table
        </Link>
      </div>
      <hr className="m-10" />
      <Outlet />
      <TanStackRouterDevtools />
    </>
  ),
});
