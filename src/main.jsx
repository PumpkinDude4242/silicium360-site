import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

// ✅ importe ton site vitrine (depuis la racine du projet)
import Silicium360Site from "../site_vitrine_silicium_360.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Silicium360Site />
  </React.StrictMode>
);
