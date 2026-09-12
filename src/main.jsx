import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import AOS from "aos";

import AuthProvider from "./contexts/AuthContext/AuthProvider.jsx";
import { router } from "./routes/router.jsx";

import "./index.css";
import "aos/dist/aos.css";
import "leaflet/dist/leaflet.css";

AOS.init({
  duration: 800,
  easing: "ease-in-out",
  once: true,
  offset: 50,
});

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />

      <Toaster
        position="top-center"
        reverseOrder={false}
      />
    </AuthProvider>
  </StrictMode>
);