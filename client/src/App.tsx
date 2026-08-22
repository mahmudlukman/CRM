import { Toaster } from "react-hot-toast";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useTokenRefresh } from "./utils/userRefreshToken";
import PrivateRoute from "./components/auth/PrivateRoute";
import NotFoundPage from "./pages/NotFound/NotFoundPage";
import LoginPage from "./pages/Login/LoginPage";
import RegisterPage from "./pages/Register/RegisterPage";
import Dashboard from "./components/dashboard/Dashboard";
import LeadsPage from "./pages/Lead/LeadPage";
import PipelinePage from "./pages/Pipeline/PipelinePage";
import ContactPage from "./pages/Contact/ContactPage";
import NotesPage from "./pages/Notes/NotesPage";
import FollowUpsPage from "./pages/FollowUps/FollowUpsPage";
import SettingsPage from "./pages/Settings/SettingsPage";

const router = createBrowserRouter([
  { path: "/login", element: <LoginPage /> },
  { path: "/register", element: <RegisterPage /> },

  // admin protected routes
  {
    element: <PrivateRoute allowedRoles={["user", "admin"]} />,
    children: [
      { path: "dashboard", element: <Dashboard /> },
      { path: "leads", element: <LeadsPage /> },
      { path: "pipeline", element: <PipelinePage /> },
      { path: "contact", element: <ContactPage /> },
      { path: "notes", element: <NotesPage /> },
      { path: "follow-ups", element: <FollowUpsPage /> },
      { path: "settings", element: <SettingsPage /> },
    ],
  },
  // user protected routes
  { path: "*", element: <NotFoundPage /> },
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
