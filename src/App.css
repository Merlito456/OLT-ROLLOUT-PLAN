// src/components/dashboard/Dashboard.tsx
import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabaseClient';
import { SiteMasterlist, Project, Notification } from '../../types';
import { Link } from 'react-router-dom';
import { 
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  CartesianGrid 
} from 'recharts';

const Dashboard: React.FC = () => {
    const [, setSites] = useState<SiteMasterlist[]>([]);
    const [, setProjects] = useState<Project[]>([]);
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState({
        totalSites: 0,
        activeProjects: 0,
        pendingRaawa: 0,
        pendingTowerco: 0,
        inProgress: 0,
        completed: 0,
        totalEngineers: 0,
        sitesWithIssues: 0
    });

    useEffect(() => {
        fetchDashboardData();
    }, []);

    const fetchDashboardData = async () => {
        try {
            setLoading(true);
            
            const { data: sitesData } = await supabase
                .from('site_masterlist')
                .select('*')
                .limit(100);

            const { data: projectsData } = await supabase
                .from('projects')
                .select('*');

            const { data: notificationsData } = await supabase
                .from('notifications')
                .select('*')
                .eq('is_read', false)
                .order('created_at', { ascending: false })
                .limit(10);

            if (sitesData) setSites(sitesData);
            if (projectsData) setProjects(projectsData);
            if (notificationsData) setNotifications(notificationsData);

            setStats({
                totalSites: sitesData?.length || 0,
                activeProjects: projectsData?.filter((p: any) => p.status === 'ACTIVE').length || 0,
                pendingRaawa: sitesData?.filter((s: any) => !s.plaid).length || 0,
                pendingTowerco: sitesData?.filter((s: any) => !s.towerco).length || 0,
                inProgress: projectsData?.filter((p: any) => p.status === 'IN_PROGRESS').length || 0,
                completed: projectsData?.filter((p: any) => p.status === 'COMPLETED').length || 0,
                totalEngineers: 12,
                sitesWithIssues: sitesData?.filter((s: any) => s.territory === 'ISSUE').length || 0
            });
        } catch (error) {
            console.error('Error fetching dashboard data:', error);
        } finally {
            setLoading(false);
        }
    };

    // Deployment timeline data (2024)
    const deploymentData = [
        { month: 'Jan', progress: 65 },
        { month: 'Feb', progress: 70 },
        { month: 'Mar', progress: 75 },
        { month: 'Apr', progress: 80 },
        { month: 'May', progress: 85 },
        { month: 'Jun', progress: 90 },
        { month: 'Jul', progress: 92 },
        { month: 'Aug', progress: 95 },
        { month: 'Sep', progress: 97 },
        { month: 'Oct', progress: 98 },
        { month: 'Nov', progress: 99 },
        { month: 'Dec', progress: 100 }
    ];

    // Engineer login status data
    const engineerStatusData = [
        { name: 'Engineer 1', status: 'Active', lastLogin: '2 hours ago' },
        { name: 'Engineer 2', status: 'Active', lastLogin: '5 hours ago' },
        { name: 'Engineer 3', status: 'Inactive', lastLogin: '2 days ago' },
        { name: 'Engineer 4', status: 'Active', lastLogin: '1 hour ago' },
        { name: 'Engineer 5', status: 'Inactive', lastLogin: '3 weeks ago' }
    ];

    if (loading) {
        return (
            <div className="dashboard-loading">
                <div className="loading-spinner"></div>
                <p>Loading dashboard...</p>
            </div>
        );
    }

    return (
        <div className="dashboard">
            {/* Page Title */}
            <div className="dashboard-header">
                <div className="header-top">
                    <div>
                        <h1>Project Rollout and Activity Management System</h1>
                        <p className="header-subtitle">Real-time monitoring of all rollout activities</p>
                    </div>
                    <div className="header-actions">
                        <button className="btn-secondary" onClick={fetchDashboardData}>
                            <span className="icon-refresh">↻</span> Refresh Data
                        </button>
                        <Link to="/reports" className="btn-primary">
                            <span className="icon-download">↓</span> Generate Report
                        </Link>
                    </div>
                </div>
            </div>

            {/* Main Dashboard Grid */}
            <div className="dashboard-grid">
                {/* Left Column */}
                <div className="dashboard-left">
                    {/* Recent Activity Log */}
                    <div className="dashboard-card">
                        <h2>Recent Activity Log</h2>
                        <div className="activity-log">
                            <div className="activity-item">
                                <span className="activity-time">10:30 AM</span>
                                <span className="activity-text">RAAWA Masterlist updated</span>
                            </div>
                            <div className="activity-item">
                                <span className="activity-time">09:15 AM</span>
                                <span className="activity-text">Site MNL-001 added</span>
                            </div>
                            <div className="activity-item">
                                <span className="activity-time">08:45 AM</span>
                                <span className="activity-text">TOWERCO Monitoring synced</span>
                            </div>
                            <div className="activity-item">
                                <span className="activity-time">Yesterday</span>
                                <span className="activity-text">RAAWA Monitoring completed</span>
                            </div>
                        </div>
                    </div>

                    {/* RAAWA Monitoring */}
                    <div className="dashboard-card">
                        <h2>RAAWA Monitoring</h2>
                        <div className="monitoring-stats">
                            <div className="monitoring-item">
                                <span className="monitoring-label">Expiring Today</span>
                                <span className="monitoring-value danger">0 days</span>
                            </div>
                            <div className="monitoring-item">
                                <span className="monitoring-label">Expiring This Week</span>
                                <span className="monitoring-value warning">3 days</span>
                            </div>
                            <div className="monitoring-item">
                                <span className="monitoring-label">Expiring Next Week</span>
                                <span className="monitoring-value success">5 days</span>
                            </div>
                        </div>
                    </div>

                    {/* TOWERCO Monitoring */}
                    <div className="dashboard-card">
                        <h2>TOWERCO Monitoring</h2>
                        <div className="monitoring-stats">
                            <div className="monitoring-item">
                                <span className="monitoring-label">Expiring Today</span>
                                <span className="monitoring-value danger">0 days</span>
                            </div>
                            <div className="monitoring-item">
                                <span className="monitoring-label">Expiring This Week</span>
                                <span className="monitoring-value warning">3 days</span>
                            </div>
                            <div className="monitoring-item">
                                <span className="monitoring-label">Expiring Next Week</span>
                                <span className="monitoring-value success">+5 days</span>
                            </div>
                        </div>
                    </div>

                    {/* Project Progress Overview with Map Legend */}
                    <div className="dashboard-card full-width">
                        <h2>Project Progress Overview</h2>
                        <div className="project-overview">
                            <div className="project-map">
                                <div className="map-placeholder">
                                    <div className="map-marker">📍 Site</div>
                                    <div className="map-marker">📍 Shillongtoe</div>
                                    <div className="map-marker">📍 Mithi Sam</div>
                                    <div className="map-marker">📍 Phirangteo</div>
                                    <div className="map-marker">📍 Mudimara</div>
                                </div>
                            </div>
                            <div className="project-legend">
                                <div className="legend-item">
                                    <span className="legend-dot active"></span>
                                    <span>Active Projects: 7</span>
                                </div>
                                <div className="legend-item">
                                    <span className="legend-dot onair"></span>
                                    <span>Sites On-Air: 245</span>
                                </div>
                                <div className="legend-item">
                                    <span className="legend-dot raawa"></span>
                                    <span>Pending RAAWA: 12</span>
                                </div>
                                <div className="legend-item">
                                    <span className="legend-dot towerco"></span>
                                    <span>Pending TOWERCO: 5</span>
                                </div>
                                <div className="legend-item">
                                    <span className="legend-dot compliance"></span>
                                    <span>Pending Compliance Documents</span>
                                    <div className="sub-items">
                                        <span>• Compliance Document 1</span>
                                        <span>• Compliance Document 2</span>
                                        <span>• Compliance Document 3</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Deployment Timeline 2024 */}
                    <div className="dashboard-card full-width">
                        <h2>Deployment Timeline 2024</h2>
                        <div className="chart-container">
                            <ResponsiveContainer width="100%" height={250}>
                                <BarChart data={deploymentData}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                                    <XAxis dataKey="month" stroke="#6B7280" fontSize={12} />
                                    <YAxis stroke="#6B7280" fontSize={12} domain={[0, 100]} />
                                    <Tooltip 
                                        contentStyle={{ 
                                            background: '#1A1A2E', 
                                            border: 'none', 
                                            borderRadius: '8px',
                                            color: '#FFFFFF'
                                        }}
                                    />
                                    <Bar dataKey="progress" fill="#005AFF" radius={[4, 4, 0, 0]} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                        <div className="timeline-stats">
                            <div className="timeline-stat">
                                <span>Total Sites: 350</span>
                                <span>Completed: 285</span>
                                <span>In Progress: 45</span>
                                <span>Pending: 20</span>
                            </div>
                        </div>
                    </div>

                    {/* Site Activity Monitoring Table */}
                    <div className="dashboard-card full-width">
                        <h2>Site Activity Monitoring</h2>
                        <div className="table-responsive">
                            <table className="dashboard-table">
                                <thead>
                                    <tr>
                                        <th>PLAID</th>
                                        <th>Site</th>
                                        <th>Territory</th>
                                        <th>Status</th>
                                        <th>Progress</th>
                                        <th>Engineer</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>PLAID-001</td>
                                        <td>MNL-001 - Davao Hub</td>
                                        <td>MINDANAO</td>
                                        <td><span className="status-badge completed">RAAWA Approved</span></td>
                                        <td><div className="progress-bar"><div className="progress-fill" style={{width: '100%'}}>100%</div></div></td>
                                        <td>Installation in Progress</td>
                                    </tr>
                                    <tr>
                                        <td>PLAID-002</td>
                                        <td>DVO-FTTH-05 - Matina</td>
                                        <td>MINDANAO</td>
                                        <td><span className="status-badge in-progress">In Progress</span></td>
                                        <td><div className="progress-bar"><div className="progress-fill" style={{width: '75%'}}>75%</div></div></td>
                                        <td>Installation in Progress</td>
                                    </tr>
                                    <tr>
                                        <td>PLAID-003</td>
                                        <td>CAG-SFP-12 - Macasandig</td>
                                        <td>MINDANAO</td>
                                        <td><span className="status-badge in-progress">In Progress</span></td>
                                        <td><div className="progress-bar"><div className="progress-fill" style={{width: '50%'}}>50%</div></div></td>
                                        <td>Integration Complete</td>
                                    </tr>
                                    <tr>
                                        <td>PLAID-004</td>
                                        <td>CAG-SFP-12 - Macasandig</td>
                                        <td>MINDANAO</td>
                                        <td><span className="status-badge completed">Completed</span></td>
                                        <td><div className="progress-bar"><div className="progress-fill" style={{width: '100%'}}>100%</div></div></td>
                                        <td>Integration Complete</td>
                                    </tr>
                                    <tr>
                                        <td>PLAID-005</td>
                                        <td>CAG-SFP-12 - Macasandig</td>
                                        <td>MINDANAO</td>
                                        <td><span className="status-badge completed">Completed</span></td>
                                        <td><div className="progress-bar"><div className="progress-fill" style={{width: '100%'}}>100%</div></div></td>
                                        <td>Integrated Complete</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                {/* Right Column */}
                <div className="dashboard-right">
                    {/* Quick Stats */}
                    <div className="stats-grid-small">
                        <div className="stat-card-small">
                            <div className="stat-icon-small">📊</div>
                            <div>
                                <h4>Total Sites</h4>
                                <p className="stat-number-small">{stats.totalSites}</p>
                            </div>
                        </div>
                        <div className="stat-card-small">
                            <div className="stat-icon-small">📈</div>
                            <div>
                                <h4>Active Projects</h4>
                                <p className="stat-number-small">{stats.activeProjects}</p>
                            </div>
                        </div>
                        <div className="stat-card-small">
                            <div className="stat-icon-small">⏳</div>
                            <div>
                                <h4>Pending RAAWA</h4>
                                <p className="stat-number-small">{stats.pendingRaawa}</p>
                            </div>
                        </div>
                        <div className="stat-card-small">
                            <div className="stat-icon-small">🏗️</div>
                            <div>
                                <h4>Pending TOWERCO</h4>
                                <p className="stat-number-small">{stats.pendingTowerco}</p>
                            </div>
                        </div>
                    </div>

                    {/* Engineer Login Status */}
                    <div className="dashboard-card">
                        <h2>Engineer Login Status</h2>
                        <div className="engineer-status-list">
                            {engineerStatusData.map((engineer, index) => (
                                <div key={index} className="engineer-status-item">
                                    <div className="engineer-info">
                                        <span className="engineer-name">{engineer.name}</span>
                                        <span className="engineer-last-login">{engineer.lastLogin}</span>
                                    </div>
                                    <span className={`engineer-status-badge ${engineer.status.toLowerCase()}`}>
                                        {engineer.status}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Notifications */}
                    <div className="dashboard-card">
                        <h2>Recent Notifications</h2>
                        <div className="notification-list">
                            {notifications.length > 0 ? (
                                notifications.map((notification: any, index: number) => (
                                    <div key={index} className="notification-item">
                                        <div className={`notification-dot ${notification.type?.toLowerCase() || ''}`}></div>
                                        <div className="notification-content">
                                            <p className="notification-message">{notification.message}</p>
                                            <span className="notification-time">
                                                {new Date(notification.created_at || '').toLocaleDateString()}
                                            </span>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p className="no-notifications">No new notifications</p>
                            )}
                        </div>
                    </div>

                    {/* Quick Actions */}
                    <div className="dashboard-card">
                        <h2>Quick Actions</h2>
                        <div className="quick-actions">
                            <Link to="/sites/add" className="quick-action-link">
                                <span>➕ Add Site</span>
                            </Link>
                            <Link to="/raawa" className="quick-action-link">
                                <span>📋 RAAWA Check</span>
                            </Link>
                            <Link to="/towerco" className="quick-action-link">
                                <span>🏗️ TOWERCO Check</span>
                            </Link>
                            <Link to="/deployment/plan" className="quick-action-link">
                                <span>📅 Plan Deployment</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
