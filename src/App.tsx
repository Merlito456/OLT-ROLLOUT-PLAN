// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/auth/ProtectedRoute';
import Login from './components/auth/Login';
import Dashboard from './components/dashboard/Dashboard';
import SiteMasterlist from './components/sites/SiteMasterlist';
import SiteAdd from './components/sites/SiteAdd';
import SiteDetails from './components/sites/SiteDetails';
import RaawaMonitoring from './components/raawa/RaawaMonitoring';
import TowercoMonitoring from './components/towerco/TowercoMonitoring';
import PlanDeployment from './components/deployment/PlanDeployment';
import ActualDeployment from './components/deployment/ActualDeployment';
import EngineerPage from './components/engineers/EngineerPage';
import PersonnelManagement from './components/personnel/PersonnelManagement';
import ProjectReport from './components/reports/ProjectReport';
import AboutPage from './components/about/AboutPage';
import Navigation from './components/Navigation';
import './App.css';

function App() {
    return (
        <AuthProvider>
            <Router>
                <Navigation />
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
                    <Route path="/sites" element={<ProtectedRoute><SiteMasterlist /></ProtectedRoute>} />
                    <Route path="/sites/add" element={<ProtectedRoute><SiteAdd /></ProtectedRoute>} />
                    <Route path="/sites/:id" element={<ProtectedRoute><SiteDetails /></ProtectedRoute>} />
                    <Route path="/raawa" element={<ProtectedRoute><RaawaMonitoring /></ProtectedRoute>} />
                    <Route path="/towerco" element={<ProtectedRoute><TowercoMonitoring /></ProtectedRoute>} />
                    <Route path="/deployment/plan" element={<ProtectedRoute><PlanDeployment /></ProtectedRoute>} />
                    <Route path="/deployment/actual" element={<ProtectedRoute><ActualDeployment /></ProtectedRoute>} />
                    <Route path="/engineer" element={<ProtectedRoute><EngineerPage /></ProtectedRoute>} />
                    <Route path="/personnel" element={<ProtectedRoute><PersonnelManagement /></ProtectedRoute>} />
                    <Route path="/reports" element={<ProtectedRoute><ProjectReport /></ProtectedRoute>} />
                    <Route path="/about" element={<AboutPage />} />
                    <Route path="*" element={<Navigate to="/" />} />
                </Routes>
            </Router>
        </AuthProvider>
    );
}

export default App;
