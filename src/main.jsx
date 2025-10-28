import "./index.css";
import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import App from "./App.jsx";
import NotFound from "./components/NotFound.jsx";

import Home from "./pages/Home.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";
import Setting from "./pages/Setting.jsx";
import MedicationListPage from "./pages/MedicationListPage.jsx";
import AddEditMedicationPage from "./pages/AddEditMedicationPage.jsx";
import RemindersPage from "./pages/RemindersPage.jsx";
import HistoryPage from "./pages/HistoryPage.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <NotFound />,
    children: [
      // Main pages
      { path: "/", element: <Home /> },
      { path: "/medications", element: <MedicationListPage /> },
      { path: "/reminders", element: <RemindersPage /> },
      { path: "/history", element: <HistoryPage /> },
      { path: "/settings", element: <Setting /> },

      // Auth pages
      { path: "/login", element: <LoginPage /> },
      { path: "/register", element: <RegisterPage /> },

      // Medication add/edit pages
      { path: "/medications/add", element: <AddEditMedicationPage /> },
      { path: "/medications/edit/:id", element: <AddEditMedicationPage /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);


