// src/App.tsx
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/auth/ProtectedRoute';
import Layout from './components/Layout';
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
import './App.css';

function App() {
    return (
        <AuthProvider>
            <Router>
                <Routes>
                    {/* Public routes - No Layout */}
                    <Route path="/login" element={<Login />} />
                    <Route path="/about" element={<AboutPage />} />
                    
                    {/* Protected routes with Layout */}
                    <Route path="/" element={
                        <ProtectedRoute>
                            <Layout>
                                <Dashboard />
                            </Layout>
                        </ProtectedRoute>
                    } />
                    <Route path="/sites" element={
                        <ProtectedRoute>
                            <Layout>
                                <SiteMasterlist />
                            </Layout>
                        </ProtectedRoute>
                    } />
                    <Route path="/sites/add" element={
                        <ProtectedRoute>
                            <Layout>
                                <SiteAdd />
                            </Layout>
                        </ProtectedRoute>
                    } />
                    <Route path="/sites/:id" element={
                        <ProtectedRoute>
                            <Layout>
                                <SiteDetails />
                            </Layout>
                        </ProtectedRoute>
                    } />
                    <Route path="/raawa" element={
                        <ProtectedRoute>
                            <Layout>
                                <RaawaMonitoring />
                            </Layout>
                        </ProtectedRoute>
                    } />
                    <Route path="/towerco" element={
                        <ProtectedRoute>
                            <Layout>
                                <TowercoMonitoring />
                            </Layout>
                        </ProtectedRoute>
                    } />
                    <Route path="/deployment/plan" element={
                        <ProtectedRoute>
                            <Layout>
                                <PlanDeployment />
                            </Layout>
                        </ProtectedRoute>
                    } />
                    <Route path="/deployment/actual" element={
                        <ProtectedRoute>
                            <Layout>
                                <ActualDeployment />
                            </Layout>
                        </ProtectedRoute>
                    } />
                    <Route path="/engineer" element={
                        <ProtectedRoute>
                            <Layout>
                                <EngineerPage />
                            </Layout>
                        </ProtectedRoute>
                    } />
                    <Route path="/personnel" element={
                        <ProtectedRoute>
                            <Layout>
                                <PersonnelManagement />
                            </Layout>
                        </ProtectedRoute>
                    } />
                    <Route path="/reports" element={
                        <ProtectedRoute>
                            <Layout>
                                <ProjectReport />
                            </Layout>
                        </ProtectedRoute>
                    } />
                    <Route path="*" element={<Navigate to="/" />} />
                </Routes>
            </Router>
        </AuthProvider>
    );
}

export default App;
