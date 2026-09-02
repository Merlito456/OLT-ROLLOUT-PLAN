-- supabase/migrations/schema.sql

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Personnel table
CREATE TABLE personnel (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    company VARCHAR(255),
    position VARCHAR(255),
    secid VARCHAR(100) UNIQUE,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Subcontractors table
CREATE TABLE subcontractors (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    region VARCHAR(100),
    name VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Site Masterlist
CREATE TABLE site_masterlist (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    plaid VARCHAR(100) UNIQUE NOT NULL,
    site VARCHAR(255) NOT NULL,
    wireline_name VARCHAR(255),
    bcf_name VARCHAR(255),
    region VARCHAR(100),
    province VARCHAR(100),
    municipality VARCHAR(100),
    territory VARCHAR(100),
    latitude DECIMAL(10, 8),
    longitude DECIMAL(11, 8),
    site_add TEXT,
    assign_hub VARCHAR(255),
    towerco VARCHAR(255),
    new_assign_area VARCHAR(100),
    new_assign_area_name VARCHAR(255),
    new_assign_hub VARCHAR(255),
    new_engineer_ah VARCHAR(255),
    new_engineer_anm1 VARCHAR(255),
    new_engineer_anm1_id VARCHAR(100),
    contact_number VARCHAR(50),
    new_anm_head VARCHAR(255),
    new_roh VARCHAR(255),
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Projects table
CREATE TABLE projects (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    type VARCHAR(100) CHECK (type IN ('SPBD', 'FTTH Horizontal', 'B2B_B2C', 'DISMANTLING', 'EUL MIGRATION - ADVANCE SURVEY', 'B2C EUL MIGRATION', 'SFP LINK UPGRADE')),
    description TEXT,
    status VARCHAR(50) DEFAULT 'PENDING',
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- RAAWA Requirements
CREATE TABLE raawa_requirements (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    site_id UUID REFERENCES site_masterlist(id) ON DELETE CASCADE,
    project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
    applied BOOLEAN DEFAULT FALSE,
    raawa_no VARCHAR(255),
    valid_from DATE,
    valid_to DATE,
    list_of_sites TEXT[],
    status VARCHAR(50) DEFAULT 'PENDING',
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- TOWERCO Requirements
CREATE TABLE towerco_requirements (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    site_id UUID REFERENCES site_masterlist(id) ON DELETE CASCADE,
    project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
    towerco VARCHAR(255),
    permit_ref_no VARCHAR(255),
    valid_from DATE,
    valid_to DATE,
    status VARCHAR(50) DEFAULT 'PENDING',
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Planned Deployment Activities
CREATE TABLE planned_deployment (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    site_id UUID REFERENCES site_masterlist(id) ON DELETE CASCADE,
    project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
    activity_type VARCHAR(100) NOT NULL,
    activity_name VARCHAR(255) NOT NULL,
    planned_date DATE,
    status VARCHAR(50) DEFAULT 'PENDING',
    sequence_order INTEGER,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Actual Deployment Updates
CREATE TABLE actual_deployment (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    planned_deployment_id UUID REFERENCES planned_deployment(id) ON DELETE CASCADE,
    site_id UUID REFERENCES site_masterlist(id) ON DELETE CASCADE,
    activity VARCHAR(255) NOT NULL,
    time TIMESTAMP DEFAULT NOW(),
    progress DECIMAL(5, 2) CHECK (progress >= 0 AND progress <= 100),
    engineer_id UUID REFERENCES personnel(id),
    status VARCHAR(50) DEFAULT 'IN_PROGRESS',
    remarks TEXT,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Activity Updates (for unlimited time/progress entries)
CREATE TABLE activity_updates (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    actual_deployment_id UUID REFERENCES actual_deployment(id) ON DELETE CASCADE,
    time TIMESTAMP DEFAULT NOW(),
    progress DECIMAL(5, 2) CHECK (progress >= 0 AND progress <= 100),
    created_at TIMESTAMP DEFAULT NOW()
);

-- Engineer Activity Log
CREATE TABLE engineer_activity_log (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    engineer_id UUID REFERENCES personnel(id) ON DELETE CASCADE,
    actual_deployment_id UUID REFERENCES actual_deployment(id) ON DELETE CASCADE,
    action VARCHAR(50) CHECK (action IN ('LOGIN', 'LOGOUT', 'ISSUE_RAISED')),
    timestamp TIMESTAMP DEFAULT NOW(),
    issue_description TEXT,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Notifications
CREATE TABLE notifications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    site_id UUID REFERENCES site_masterlist(id) ON DELETE CASCADE,
    project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
    type VARCHAR(50) CHECK (type IN ('RAAWA_EXPIRING', 'TOWERCO_EXPIRING', 'REQUIREMENT_MISSING', 'ACTIVITY_UPDATE')),
    message TEXT NOT NULL,
    is_read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX idx_site_masterlist_plaid ON site_masterlist(plaid);
CREATE INDEX idx_site_masterlist_site ON site_masterlist(site);
CREATE INDEX idx_raawa_site_id ON raawa_requirements(site_id);
CREATE INDEX idx_towerco_site_id ON towerco_requirements(site_id);
CREATE INDEX idx_planned_deployment_site_id ON planned_deployment(site_id);
CREATE INDEX idx_actual_deployment_site_id ON actual_deployment(site_id);
CREATE INDEX idx_notifications_site_id ON notifications(site_id);

-- Create function to update updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_site_masterlist_updated_at BEFORE UPDATE ON site_masterlist
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_projects_updated_at BEFORE UPDATE ON projects
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_raawa_updated_at BEFORE UPDATE ON raawa_requirements
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_towerco_updated_at BEFORE UPDATE ON towerco_requirements
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
