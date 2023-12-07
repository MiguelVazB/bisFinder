import React, { lazy, Suspense } from "react";
import { HashRouter, Route, Routes } from "react-router-dom";
import LoadingComponent from "./components/LoadingComponent";
import Layout from "./components/Layout";
import { GoogleOAuthProvider } from "@react-oauth/google";
import "./App.css";

const HomePage = lazy(() => import("./pages/HomePage"));
const BusinessPage = lazy(() => import("./pages/BusinessPage"));
const DetailsPage = lazy(() => import("./pages/DetailsPage"));
const NotFoundPage = lazy(() => import("./pages/NotFoundPage"));

function App() {
  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_API_TOKEN}>
      <HashRouter>
        <Suspense fallback={<LoadingComponent />}>
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<HomePage />} />
              <Route path="city">
                <Route
                  path="LA"
                  element={<BusinessPage city="Los Angeles" />}
                />
                <Route path="SD" element={<BusinessPage city="San Diego" />} />
                <Route path="SJ" element={<BusinessPage city="San Jose" />} />
                <Route
                  path="SF"
                  element={<BusinessPage city="San Francisco" />}
                />
                <Route path="Fresno" element={<BusinessPage city="Fresno" />} />
              </Route>
              <Route path="city/:city/bis/:bis" element={<DetailsPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Route>
          </Routes>
        </Suspense>
      </HashRouter>
    </GoogleOAuthProvider>
  );
}

export default App;
