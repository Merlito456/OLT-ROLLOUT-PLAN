import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabaseClient';
import { SiteMasterlist, Project, Notification } from '../../types';
import { Link } from 'react-router-dom';
import { 
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer
} from 'recharts';

const Dashboard: React.FC = () => {
    const [sites, setSites] = useState<SiteMasterlist[]>([]);
    const [projects, setProjects] = useState<Project[]>([]);
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

    // Chart colors based on Nokia theme
    const COLORS = ['#005AFF', '#00B4A0', '#FF6B00', '#F59E0B', '#EF4444', '#8B5CF6'];

    useEffect(() => {
        fetchDashboardData();
    }, []);

    const fetchDashboardData = async () => {
        try {
            setLoading(true);
            
            // Fetch sites
            const { data: sitesData } = await supabase
                .from('site_masterlist')
                .select('*')
                .limit(100);

            // Fetch projects
            const { data: projectsData } = await supabase
                .from('projects')
                .select('*');

            // Fetch notifications
            const { data: notificationsData } = await supabase
                .from('notifications')
                .select('*')
                .eq('is_read', false)
                .order('created_at', { ascending: false })
                .limit(10);

            if (sitesData) setSites(sitesData);
            if (projectsData) setProjects(projectsData);
            if (notificationsData) setNotifications(notificationsData);

            // Update stats
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

    // Prepare data for charts
    const projectProgressData = projects.map((p: any) => ({
        name: p.name?.substring(0, 15) || 'Unnamed',
        progress: Math.floor(Math.random() * 100),
        status: p.status || 'PENDING'
    }));

    const siteStatusData = [
        { name: 'Active', value: stats.totalSites - 10 },
        { name: 'In Progress', value: stats.inProgress },
        { name: 'Completed', value: stats.completed },
        { name: 'Pending', value: stats.pendingRaawa + stats.pendingTowerco }
    ];

    const activityData = [
        { name: 'Jan', sites: 12, projects: 8 },
        { name: 'Feb', sites: 19, projects: 12 },
        { name: 'Mar', sites: 15, projects: 10 },
        { name: 'Apr', sites: 22, projects: 15 },
        { name: 'May', sites: 28, projects: 18 },
        { name: 'Jun', sites: 35, projects: 22 }
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
            {/* Header Section */}
            <div className="dashboard-header">
                <div className="header-top">
                    <div>
                        <h1>Rollout Dashboard</h1>
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
                
                {/* Stats Grid */}
                <div className="stats-grid">
                    <div className="stat-card">
                        <div className="stat-icon">📍</div>
                        <div>
                            <h3>Total Sites</h3>
                            <p className="stat-number">{stats.totalSites}</p>
                            <span className="stat-trend up">↑ 12% this month</span>
                        </div>
                    </div>
                    <div className="stat-card">
                        <div className="stat-icon">📊</div>
                        <div>
                            <h3>Active Projects</h3>
                            <p className="stat-number">{stats.activeProjects}</p>
                            <span className="stat-trend up">↑ 5% this month</span>
                        </div>
                    </div>
                    <div className="stat-card">
                        <div className="stat-icon">⏳</div>
                        <div>
                            <h3>Pending RAAWA</h3>
                            <p className="stat-number">{stats.pendingRaawa}</p>
                            <span className="stat-trend down">↓ Needs attention</span>
                        </div>
                    </div>
                    <div className="stat-card">
                        <div className="stat-icon">🏗️</div>
                        <div>
                            <h3>Pending TOWERCO</h3>
                            <p className="stat-number">{stats.pendingTowerco}</p>
                            <span className="stat-trend down">↓ Needs attention</span>
                        </div>
                    </div>
                    <div className="stat-card">
                        <div className="stat-icon">🔄</div>
                        <div>
                            <h3>In Progress</h3>
                            <p className="stat-number">{stats.inProgress}</p>
                            <span className="stat-trend up">↑ 8% this month</span>
                        </div>
                    </div>
                    <div className="stat-card">
                        <div className="stat-icon">✅</div>
                        <div>
                            <h3>Completed</h3>
                            <p className="stat-number">{stats.completed}</p>
                            <span className="stat-trend up">↑ 15% this month</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Charts Section */}
            <div className="dashboard-charts">
                <div className="chart-card">
                    <h2>Project Progress Overview</h2>
                    <div className="chart-container">
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={projectProgressData}>
                                <XAxis dataKey="name" stroke="#6B7280" fontSize={12} />
                                <YAxis stroke="#6B7280" fontSize={12} />
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
                </div>

                <div className="chart-card">
                    <h2>Site Activity Distribution</h2>
                    <div className="chart-container">
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={siteStatusData}>
                                <XAxis dataKey="name" stroke="#6B7280" fontSize={12} />
                                <YAxis stroke="#6B7280" fontSize={12} />
                                <Tooltip 
                                    contentStyle={{ 
                                        background: '#1A1A2E', 
                                        border: 'none', 
                                        borderRadius: '8px',
                                        color: '#FFFFFF'
                                    }}
                                />
                                <Bar dataKey="value" fill="#005AFF" radius={[4, 4, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>

            <div className="dashboard-bottom">
                {/* Activity Trends */}
                <div className="chart-card full-width">
                    <h2>Activity Trends</h2>
                    <div className="chart-container">
                        <ResponsiveContainer width="100%" height={250}>
                            <BarChart data={activityData}>
                                <XAxis dataKey="name" stroke="#6B7280" fontSize={12} />
                                <YAxis stroke="#6B7280" fontSize={12} />
                                <Tooltip 
                                    contentStyle={{ 
                                        background: '#1A1A2E', 
                                        border: 'none', 
                                        borderRadius: '8px',
                                        color: '#FFFFFF'
                                    }}
                                />
                                <Bar dataKey="sites" fill="#005AFF" radius={[4, 4, 0, 0]} />
                                <Bar dataKey="projects" fill="#00B4A0" radius={[4, 4, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Notifications & Quick Actions */}
                <div className="dashboard-sidebar">
                    <div className="notification-card">
                        <div className="notification-header">
                            <h3>🔔 Recent Notifications</h3>
                            <span className="notification-count">{notifications.length}</span>
                        </div>
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
                        <Link to="/notifications" className="notification-view-all">
                            View All Notifications →
                        </Link>
                    </div>

                    <div className="quick-actions-card">
                        <h3>⚡ Quick Actions</h3>
                        <div className="quick-actions-grid">
                            <Link to="/sites/add" className="quick-action-btn">
                                <span className="action-icon">➕</span>
                                <span>Add Site</span>
                            </Link>
                            <Link to="/raawa" className="quick-action-btn">
                                <span className="action-icon">📋</span>
                                <span>RAAWA Check</span>
                            </Link>
                            <Link to="/towerco" className="quick-action-btn">
                                <span className="action-icon">🏗️</span>
                                <span>TOWERCO Check</span>
                            </Link>
                            <Link to="/deployment/plan" className="quick-action-btn">
                                <span className="action-icon">📅</span>
                                <span>Plan Deployment</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* Recent Sites */}
            <div className="recent-sites-card">
                <h2>📌 Recently Added Sites</h2>
                <div className="recent-sites-list">
                    {sites.slice(0, 5).map((site: any) => (
                        <div key={site.id} className="recent-site-item">
                            <div className="site-info">
                                <span className="site-name">{site.site}</span>
                                <span className="site-plaid">{site.plaid}</span>
                            </div>
                            <div className="site-meta">
                                <span className="site-territory">{site.territory}</span>
                                <span className={`site-status ${site.status?.toLowerCase() || 'pending'}`}>
                                    {site.status || 'Pending'}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
