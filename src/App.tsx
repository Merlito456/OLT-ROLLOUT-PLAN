// src/App.tsx
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
                <Routes>
                    {/* Public routes - No Navigation */}
                    <Route path="/login" element={<Login />} />
                    <Route path="/about" element={<AboutPage />} />
                    
                    {/* Protected routes with Navigation */}
                    <Route path="/" element={
                        <ProtectedRoute>
                            <>
                                <Navigation />
                                <Dashboard />
                            </>
                        </ProtectedRoute>
                    } />
                    <Route path="/sites" element={
                        <ProtectedRoute>
                            <>
                                <Navigation />
                                <SiteMasterlist />
                            </>
                        </ProtectedRoute>
                    } />
                    <Route path="/sites/add" element={
                        <ProtectedRoute>
                            <>
                                <Navigation />
                                <SiteAdd />
                            </>
                        </ProtectedRoute>
                    } />
                    <Route path="/sites/:id" element={
                        <ProtectedRoute>
                            <>
                                <Navigation />
                                <SiteDetails />
                            </>
                        </ProtectedRoute>
                    } />
                    <Route path="/raawa" element={
                        <ProtectedRoute>
                            <>
                                <Navigation />
                                <RaawaMonitoring />
                            </>
                        </ProtectedRoute>
                    } />
                    <Route path="/towerco" element={
                        <ProtectedRoute>
                            <>
                                <Navigation />
                                <TowercoMonitoring />
                            </>
                        </ProtectedRoute>
                    } />
                    <Route path="/deployment/plan" element={
                        <ProtectedRoute>
                            <>
                                <Navigation />
                                <PlanDeployment />
                            </>
                        </ProtectedRoute>
                    } />
                    <Route path="/deployment/actual" element={
                        <ProtectedRoute>
                            <>
                                <Navigation />
                                <ActualDeployment />
                            </>
                        </ProtectedRoute>
                    } />
                    <Route path="/engineer" element={
                        <ProtectedRoute>
                            <>
                                <Navigation />
                                <EngineerPage />
                            </>
                        </ProtectedRoute>
                    } />
                    <Route path="/personnel" element={
                        <ProtectedRoute>
                            <>
                                <Navigation />
                                <PersonnelManagement />
                            </>
                        </ProtectedRoute>
                    } />
                    <Route path="/reports" element={
                        <ProtectedRoute>
                            <>
                                <Navigation />
                                <ProjectReport />
                            </>
                        </ProtectedRoute>
                    } />
                    <Route path="*" element={<Navigate to="/" />} />
                </Routes>
            </Router>
        </AuthProvider>
    );
}

export default App;
