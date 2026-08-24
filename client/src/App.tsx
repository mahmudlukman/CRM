import { Toaster } from "react-hot-toast";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
  Outlet,
} from "react-router-dom";
import { useTokenRefresh } from "./utils/userRefreshToken";
import { useSelector } from "react-redux";
import type { RootState } from "./@types";
import NotFoundPage from "./pages/NotFound/NotFoundPage";
import LoginPage from "./pages/Login/LoginPage";
import RegisterPage from "./pages/Register/RegisterPage";
import Activation from "./pages/Activation/Activation";
import Dashboard from "./components/dashboard/Dashboard";
import LeadsPage from "./pages/Lead/LeadPage";
import PipelinePage from "./pages/Pipeline/PipelinePage";
import ContactPage from "./pages/Contact/ContactPage";
import NotesPage from "./pages/Notes/NotesPage";
import FollowUpsPage from "./pages/FollowUps/FollowUpsPage";
import SettingsPage from "./pages/Settings/SettingsPage";
import { AppShell } from "./components/ui/AppShell";

// Protected Route wrapper component
const ProtectedRoute = () => {
  const { user } = useSelector((state: RootState) => state.auth);

  return user ? <Outlet /> : <Navigate to="/login" replace />;
};

// Root redirect component
const RootRedirect = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  return user ? (
    <Navigate to="/dashboard" replace />
  ) : (
    <Navigate to="/login" replace />
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootRedirect />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
  {
    path: "/activation/:activation_token",
    element: <Activation />,
  },
  // Protected routes with AppShell
  {
    element: <ProtectedRoute />,
    children: [
      {
        element: <AppShell />,
        children: [
          { path: "dashboard", element: <Dashboard /> },
          { path: "leads", element: <LeadsPage /> },
          { path: "pipeline", element: <PipelinePage /> },
          { path: "contacts", element: <ContactPage /> },
          { path: "notes", element: <NotesPage /> },
          { path: "follow-ups", element: <FollowUpsPage /> },
          { path: "settings", element: <SettingsPage /> },
        ],
      },
    ],
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);

const App = () => {
  useTokenRefresh();

  return (
    <>
      <RouterProvider router={router} />
      <Toaster
        toastOptions={{
          style: { fontSize: "13px" },
        }}
      />
    </>
  );
};

export default App;
