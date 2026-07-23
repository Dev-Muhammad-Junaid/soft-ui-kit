import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { useState } from "react";
import { AppShell } from "./components/layout/AppShell";
import { ToastProvider } from "./components/ui";
import { CatalogPage } from "./pages/CatalogPage";
import { ChartsGalleryPage } from "./pages/ChartsGalleryPage";
import { EffectsPage } from "./pages/EffectsPage";
import { LandingPage } from "./pages/LandingPage";
import { SaasHubPage } from "./pages/SaasHubPage";
import { LoginPage, SignupPage } from "./pages/SignupPage";
import { AutumnInsightDashboard } from "./pages/saas/AutumnInsightDashboard";
import { FinanceDashboard } from "./pages/saas/FinanceDashboard";
import { KanbanDashboard } from "./pages/saas/KanbanDashboard";
import { TravelDashboard } from "./pages/saas/TravelDashboard";

const MARKETING = new Set(["/", "/signup", "/login"]);

export default function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { pathname } = useLocation();
  const isMarketing = MARKETING.has(pathname);

  if (isMarketing) {
    return (
      <ToastProvider>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </ToastProvider>
    );
  }

  return (
    <ToastProvider>
      <AppShell sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen}>
        <Routes>
          <Route path="/app" element={<Navigate to="/catalog" replace />} />
          <Route path="/catalog" element={<CatalogPage />} />
          <Route path="/charts" element={<ChartsGalleryPage />} />
          <Route path="/effects" element={<EffectsPage />} />
          <Route path="/saas" element={<SaasHubPage />} />
          <Route path="/saas/autumn" element={<AutumnInsightDashboard />} />
          <Route path="/saas/travel" element={<TravelDashboard />} />
          <Route path="/saas/finance" element={<FinanceDashboard />} />
          <Route path="/saas/kanban" element={<KanbanDashboard />} />
          <Route path="/components" element={<Navigate to="/catalog" replace />} />
          <Route path="/playground" element={<Navigate to="/catalog" replace />} />
          <Route path="/gallery" element={<Navigate to="/catalog" replace />} />
          <Route path="/themes" element={<Navigate to="/catalog" replace />} />
          <Route path="/flows" element={<Navigate to="/saas" replace />} />
          <Route path="*" element={<Navigate to="/catalog" replace />} />
        </Routes>
      </AppShell>
    </ToastProvider>
  );
}
