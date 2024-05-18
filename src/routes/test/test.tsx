import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/test/test")({
  component: Test,
});

function Test() {
  <div className="p-2">
    <h3>Test Page!</h3>
  </div>;
}

