import "./index.css";
import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.jsx";
import NotFound from "./components/NotFound.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";
import Setting from "./pages/Setting.jsx";
import Reminders from "./pages/Reminders.jsx";

const router = createBrowserRouter([
  { path: "/", element: <App />, errorElement: <NotFound /> },
  { path: "/login", element: <LoginPage /> },
  { path: "/register", element: <RegisterPage /> },
  { path: "/setting", element: <Setting /> },
  { path: "/reminders", element: <Reminders /> },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
