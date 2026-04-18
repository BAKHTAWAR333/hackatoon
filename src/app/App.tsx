import { RouterProvider } from "react-router";
import { router } from "./routes";
import { useEffect } from "react";
import { storage } from "./utils/storage";

export default function App() {
  useEffect(() => {
    storage.initializeDemoData();
  }, []);

  return <RouterProvider router={router} />;
}