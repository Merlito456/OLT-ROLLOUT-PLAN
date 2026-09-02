// src/components/dashboard/Dashboard.tsx
import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabaseClient';
import { SiteMasterlist, Project, Notification } from '../../types';
import ProgressChart from './ProgressChart';
import NotificationCenter from './NotificationCenter';

const Dashboard: React.FC = () => {
    const [sites, setSites] = useState<SiteMasterlist[]>([]);
    const [projects, setProjects] = useState<Project[]>([]);
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const [stats, setStats] = useState({
        totalSites: 0,
        activeProjects: 0,
        pendingRaawa: 0,
        pendingTowerco: 0,
        inProgress: 0,
        completed: 0
    });

    useEffect(() => {
        fetchDashboardData();
    }, []);

    const fetchDashboardData = async () => {
        try {
            // Fetch sites
            const { data: sitesData } = await supabase
                .from('site_masterlist')
                .select('*')
                .limit(100);

            if (sitesData) setSites(sitesData);

            // Fetch projects
            const { data: projectsData } = await supabase
                .from('projects')
                .select('*');

            if (projectsData) setProjects(projectsData);

            // Fetch notifications
            const { data: notificationsData } = await supabase
                .from('notifications')
                .select('*')
                .eq('is_read', false)
                .order('created_at', { ascending: false })
                .limit(10);

            if (notificationsData) setNotifications(notificationsData);

            // Update stats
            setStats({
                totalSites: sitesData?.length || 0,
                activeProjects: projectsData?.filter(p => p.status === 'ACTIVE').length || 0,
                pendingRaawa: sitesData?.filter(s => s.plaid).length || 0, // Placeholder
                pendingTowerco: sitesData?.filter(s => s.towerco).length || 0, // Placeholder
                inProgress: projectsData?.filter(p => p.status === 'IN_PROGRESS').length || 0,
                completed: projectsData?.filter(p => p.status === 'COMPLETED').length || 0
            });
        } catch (error) {
            console.error('Error fetching dashboard data:', error);
        }
    };

    return (
        <div className="dashboard">
            <div className="dashboard-header">
                <h1>Nokia Rollout Dashboard</h1>
                <div className="stats-grid">
                    <div className="stat-card">
                        <h3>Total Sites</h3>
                        <p className="stat-number">{stats.totalSites}</p>
                    </div>
                    <div className="stat-card">
                        <h3>Active Projects</h3>
                        <p className="stat-number">{stats.activeProjects}</p>
                    </div>
                    <div className="stat-card">
                        <h3>Pending RAAWA</h3>
                        <p className="stat-number">{stats.pendingRaawa}</p>
                    </div>
                    <div className="stat-card">
                        <h3>Pending TOWERCO</h3>
                        <p className="stat-number">{stats.pendingTowerco}</p>
                    </div>
                    <div className="stat-card">
                        <h3>In Progress</h3>
                        <p className="stat-number">{stats.inProgress}</p>
                    </div>
                    <div className="stat-card">
                        <h3>Completed</h3>
                        <p className="stat-number">{stats.completed}</p>
                    </div>
                </div>
            </div>

            <div className="dashboard-content">
                <div className="chart-section">
                    <h2>Project Progress</h2>
                    <ProgressChart projects={projects} />
                </div>

                <div className="notification-section">
                    <h2>Notifications</h2>
                    <NotificationCenter notifications={notifications} />
                </div>

                <div className="recent-sites">
                    <h2>Recent Sites Added</h2>
                    <div className="site-list">
                        {sites.slice(0, 5).map(site => (
                            <div key={site.id} className="site-item">
                                <span className="site-name">{site.site}</span>
                                <span className="site-plaid">{site.plaid}</span>
                                <span className="site-territory">{site.territory}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
