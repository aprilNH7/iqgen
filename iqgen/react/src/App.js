import React from "react";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import './App.css';
// import './style/Style.css';
import "@fontsource/abeezee";
import "@fontsource/abeezee/400.css";
import "@fontsource/poppins";
import "@fontsource/poppins/500.css";
import "@fontsource/poppins/600.css";
import "@fontsource/poppins/700.css";
import "@fontsource/poppins/800.css";
import "@fontsource/poppins/900.css";
import "@fontsource/onest";
import "@fontsource/onest/400.css";
import "@fontsource/onest/500.css";
import "@fontsource/onest/600.css";
import "@fontsource/onest/700.css";
import "@fontsource/onest/800.css";
import "@fontsource/onest/900.css";
import "@fontsource/mulish";
import "@fontsource/mulish/400.css";
import "@fontsource/mulish/500.css";
import "@fontsource/mulish/600.css";
import "@fontsource/mulish/700.css";
import "@fontsource/mulish/800.css";
import "@fontsource/mulish/900.css";
import "@fontsource/inter";
import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "@fontsource/inter/600.css";
import "@fontsource/inter/700.css";
import "@fontsource/inter/800.css";
import "@fontsource/inter/900.css";
import "@fontsource/montserrat";
import "@fontsource/montserrat/400.css";
import "@fontsource/montserrat/500.css";
import "@fontsource/montserrat/600.css";
import "@fontsource/montserrat/700.css";
import "@fontsource/montserrat/800.css";
import "@fontsource/montserrat/900.css";
import "@fontsource/lato";
import "@fontsource/lato/400.css";
import "@fontsource/lato/700.css";
import "@fontsource/lato/900.css";
import "@fontsource/dm-sans";
import "@fontsource/dm-sans/400.css";
import "primereact/resources/themes/lara-light-indigo/theme.css"; // Choose your theme
import "primereact/resources/primereact.min.css"; // Core CSS


import AuthLayout from "./pages/Authlayout";
import SignupForm from "./pages/SignUp";
import SignInForm from "./pages/SignIn";
import Dashboard from "./pages/dashboard";
import DealDashboard from "./pages/deal/deal_dashboard";
import Deal from "./pages/deal/deals";
import Setting from "./pages/Setting";
import ImageDashboard from "./pages/images";
import ConversationDashboard from './pages/conversation';
import ConstructionFlow from "./pages/ConstructionFlow";
import ProfileSettings from "./pages/ProfileSettings";
import JobSettings from "./pages/JobSettings";
import ProtectedRoute from "./components/ProtectedRoute";
import ForgotPassword from './components/ForgotPassword';
import ResetPassword from './components/ResetPassword';
import LandingPage from "./pages/landingpage";




function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<LandingPage />} />
        <Route path="/sign-in" element={<SignInForm />} />
        <Route path="/sign-up" element={<SignupForm />} />

        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />

        <Route path="/" element={<AuthLayout />}>
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/deal-dashboard" element={<DealDashboard />} />
            <Route path="/deal-dashboard-residential" element={<Deal />} />
            {/* <Route path="/deal-dashboard-commercial" element={<Deal />} /> */}

            <Route path="/deal-dashboard-commercial/:id" element={<Deal />} />
            <Route path="/settings" element={<Setting />} />
           {/* <Route path="/photos" element={<ImageDashboard />} /> */}

            <Route path="/photos/:id" element={<ImageDashboard />} />

            {/* <Route path="/conversation" element={<ConversationDashboard />} /> */}
            <Route path="/conversation/:id" element={<ConversationDashboard />} />

           <Route path="/construction-flow/:id" element={<ConstructionFlow />} />
            {/* <Route path="/construction-flow" element={<ConstructionFlow />} /> */}
            <Route path="/job-settings" element={<JobSettings />} />
          </Route>
        </Route>

        <Route path="/profilesetting" element={<ProfileSettings />} />
      </Routes>
    </BrowserRouter>

  );
}

export default App;
