import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import LandingPage from "./components/pages/LandingPage";
import LoginPage from "./components/pages/LoginPage";
import AppLayout from "./components/layout/AppLayout";
import DashboardPage from "./components/pages/DashboardPage";
import OrganizationsPage from "./components/pages/OrganizationsPage";
import SubscriptionPage from "./components/pages/SubscriptionPage";
import ProjectsPage from "./components/pages/ProjectsPage";
import AssessmentsPage from "./components/pages/AssessmentsPage";
import AssessmentDetailPage from "./components/pages/AssessmentDetailPage";
import AgentsPage from "./components/pages/AgentsPage";
import ReportsPage from "./components/pages/ReportsPage";
import SettingsPage from "./components/pages/SettingsPage";
import RegisterPage from "./components/pages/RegisterPage";
import PaymentPage from "./components/pages/PaymentPage";
import JavaEvolutionPage from "./components/pages/JavaEvolutionPage";
import PqcHistoryPage from "./components/pages/PqcHistoryPage";
import { OrganizationProvider } from "./context/OrganizationContext";
export default function App() {
    return (<BrowserRouter>

    <OrganizationProvider>
      <Routes>

        <Route path="/" element={<LandingPage />}/>
        
        <Route path="/register" element={<RegisterPage />}/>

        <Route path="/payment/:registrationId" element={<PaymentPage />}/>
        
        <Route path="/login" element={<LoginPage />}/>

        <Route path="/learn/java-evolution" element={<JavaEvolutionPage />}/>

        <Route path="/learn/pqc-history" element={<PqcHistoryPage />}/>

        <Route element={<AppLayout />}>
          <Route path="/dashboard" element={<DashboardPage />}/>

          <Route path="/organizations" element={<OrganizationsPage />}/>

          <Route path="/organization" element={<OrganizationsPage />}/>

          <Route path="/subscription" element={<SubscriptionPage />}/>

          <Route path="/projects" element={<ProjectsPage />}/>

          <Route path="/assessments" element={<AssessmentsPage />}/>

          <Route path="/assessments/:assessmentId" element={<AssessmentDetailPage />}/>

          <Route path="/agents" element={<AgentsPage />}/>

          <Route path="/reports" element={<ReportsPage />}/>

          <Route path="/settings" element={<SettingsPage />}/>
        </Route>

        <Route path="*" element={<Navigate to="/dashboard" replace/>}/>

      </Routes>
    </OrganizationProvider>
     </BrowserRouter>);
}
