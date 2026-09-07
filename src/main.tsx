import { createRoot, hydrateRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import "./i18n/config";

const root = document.getElementById("root");

if (!root) {
  throw new Error("No se ha encontrado el contenedor principal de la aplicación.");
}

if (root.hasChildNodes()) {
  hydrateRoot(root, <App />);
} else {
  createRoot(root).render(<App />);
}
