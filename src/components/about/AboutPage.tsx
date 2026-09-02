// src/components/about/AboutPage.tsx
import React from 'react';
import logoNokia from '../../../public/logo-nokia.png';

const AboutPage: React.FC = () => {
    return (
        <div className="about-page">
            <div className="about-header">
                <img src={logoNokia} alt="Nokia" style={{ height: '80px', marginBottom: '1rem' }} />
                <h1>Nokia Rollout Management System</h1>
                <p className="subtitle">Project Rollout and Activity Management System</p>
            </div>

            <div className="about-content">
                <div className="about-card">
                    <h2>Vision</h2>
                    <p>To revolutionize telecommunications infrastructure deployment through intelligent, real-time project management and collaboration.</p>
                    
                    <h2 style={{ marginTop: '1.5rem' }}>Mission</h2>
                    <p>Empower teams with cutting-edge technology to streamline rollout operations, enhance transparency, and accelerate network deployment across the Philippines.</p>
                </div>

                <div className="about-card">
                    <h2>Advantages Over Traditional Systems</h2>
                    <ul>
                        <li>✅ <strong>Real-time Progress Tracking</strong> - Instant visibility into site activities</li>
                        <li>✅ <strong>Automated Compliance Monitoring</strong> - RAAWA and TOWERCO validity alerts</li>
                        <li>✅ <strong>Unlimited Activity Updates</strong> - Track every step of deployment</li>
                        <li>✅ <strong>Role-based Access Control</strong> - Engineers, managers, and admins</li>
                        <li>✅ <strong>Comprehensive Reporting</strong> - Date-controlled progress reports</li>
                        <li>✅ <strong>Centralized Database</strong> - All site information in one place</li>
                        <li>✅ <strong>Mobile Responsive</strong> - Access from anywhere, anytime</li>
                    </ul>
                </div>

                <div className="about-card">
                    <h2>Key Features</h2>
                    <ul>
                        <li>🔹 Site Masterlist Management</li>
                        <li>🔹 RAAWA Monitoring & Validity Tracking</li>
                        <li>🔹 TOWERCO Requirements Management</li>
                        <li>🔹 Planned Deployment Scheduling</li>
                        <li>🔹 Actual Deployment with Unlimited Updates</li>
                        <li>🔹 Engineer Activity Logging</li>
                        <li>🔹 Real-time Dashboard Notifications</li>
                        <li>🔹 Personnel & Subcontractor Management</li>
                        <li>🔹 Project Progress Reports</li>
                    </ul>
                </div>

                <div className="about-card">
                    <h2>Technology Stack</h2>
                    <ul>
                        <li>⚛️ <strong>Frontend:</strong> React with TypeScript</li>
                        <li>☁️ <strong>Hosting:</strong> Cloudflare Pages</li>
                        <li>🗄️ <strong>Database:</strong> Supabase (PostgreSQL)</li>
                        <li>🔐 <strong>Authentication:</strong> Supabase Auth</li>
                        <li>📊 <strong>Charts:</strong> Recharts</li>
                        <li>🎨 <strong>Styling:</strong> Custom CSS with Nokia Theme</li>
                    </ul>
                </div>

                <div className="developer-info">
                    <h2>Developed & Maintained By</h2>
                    <p style={{ fontSize: '1.2rem', fontWeight: '600' }}>
                        Engr. John Carlo Rabanes, ECE
                    </p>
                    <p>OLT Rollout Engineer at Nokia Shanghai Bell</p>
                    <p style={{ marginTop: '0.5rem' }}>
                        📧 rabanes.johncarlo1@gmail.com
                    </p>
                    <p style={{ fontSize: '0.9rem', marginTop: '1rem', color: 'var(--nokia-gray)' }}>
                        © {new Date().getFullYear()} Nokia Rollout Management System. All rights reserved.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default AboutPage;
