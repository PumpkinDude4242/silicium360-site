import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Silicium360Site from "../site_vitrine_silicium_360.jsx";
import MentionsLegalesPage from "./pages/MentionsLegales.jsx";
import PolitiqueConfidentialitePage from "./pages/PolitiqueConfidentialite.jsx";

import "./index.css"; // garde ton CSS global si tu l'as

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Silicium360Site />} />
        <Route path="/mentions-legales" element={<MentionsLegalesPage />} />
        <Route
          path="/politique-de-confidentialite"
          element={<PolitiqueConfidentialitePage />}
        />
        {/* fallback : toute autre route → home */}
        <Route path="*" element={<Silicium360Site />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
