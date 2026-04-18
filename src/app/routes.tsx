import { createBrowserRouter } from "react-router";
import { Layout } from "./components/Layout";
import { Landing } from "./pages/Landing";
import { Auth } from "./pages/Auth";
import { Onboarding } from "./pages/Onboarding";
import { Dashboard } from "./pages/Dashboard";
import { Explore } from "./pages/Explore";
import { CreateRequest } from "./pages/CreateRequest";
import { RequestDetail } from "./pages/RequestDetail";
import { Messaging } from "./pages/Messaging";
import { Leaderboard } from "./pages/Leaderboard";
import { AICenter } from "./pages/AICenter";
import { Notifications } from "./pages/Notifications";
import { Profile } from "./pages/Profile";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Landing />,
  },
  {
    path: "/auth",
    element: <Auth />,
  },
  {
    path: "/onboarding",
    element: <Onboarding />,
  },
  {
    path: "/app",
    element: <Layout />,
    children: [
      { index: true, element: <Dashboard /> },
      { path: "explore", element: <Explore /> },
      { path: "create", element: <CreateRequest /> },
      { path: "request/:id", element: <RequestDetail /> },
      { path: "messages", element: <Messaging /> },
      { path: "leaderboard", element: <Leaderboard /> },
      { path: "ai-center", element: <AICenter /> },
      { path: "notifications", element: <Notifications /> },
      { path: "profile", element: <Profile /> },
    ],
  },
]);
