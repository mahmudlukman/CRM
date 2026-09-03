import { Toaster } from "react-hot-toast";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
  Outlet,
} from "react-router-dom";
import { useTokenRefresh } from "./utils/userRefreshToken";
import { useSelector } from "react-redux";
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
import type { RootState } from "./redux/store";
import ProtectedRoute from "./components/auth/PrivateRoute";

const AuthLoader = () => (
  <div className="flex h-screen w-screen items-center justify-center">
    <span>Loading...</span>
  </div>
);

const PublicOnlyRoute = () => {
  const { user, isInitialized } = useSelector((state: RootState) => state.auth);

  if (!isInitialized) return <AuthLoader />;

  return user ? <Navigate to="/dashboard" replace /> : <Outlet />;
};

const RootRedirect = () => {
  const { user, isInitialized } = useSelector((state: RootState) => state.auth);

  if (!isInitialized) return <AuthLoader />;

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
    element: <PublicOnlyRoute />,
    children: [
      { path: "/login", element: <LoginPage /> },
      { path: "/register", element: <RegisterPage /> },
    ],
  },
  {
    path: "/activation/:activation_token",
    element: <Activation />,
  },
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
