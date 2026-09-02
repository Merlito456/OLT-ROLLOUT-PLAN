// src/types/index.ts
export interface Personnel {
    id?: string;
    name: string;
    company: string;
    position: string;
    secid: string;
    created_at?: string;
}

export interface Subcontractor {
    id?: string;
    region: string;
    name: string;
    created_at?: string;
}

export interface SiteMasterlist {
    id?: string;
    plaid: string;
    site: string;
    wireline_name?: string;
    bcf_name?: string;
    region?: string;
    province?: string;
    municipality?: string;
    territory?: string;
    latitude?: number;
    longitude?: number;
    site_add?: string;
    assign_hub?: string;
    towerco?: string;
    new_assign_area?: string;
    new_assign_area_name?: string;
    new_assign_hub?: string;
    new_engineer_ah?: string;
    new_engineer_anm1?: string;
    new_engineer_anm1_id?: string;
    contact_number?: string;
    new_anm_head?: string;
    new_roh?: string;
    created_at?: string;
    updated_at?: string;
}

export interface Project {
    id?: string;
    name: string;
    type: 'SPBD' | 'FTTH Horizontal' | 'B2B_B2C' | 'DISMANTLING' | 'EUL MIGRATION - ADVANCE SURVEY' | 'B2C EUL MIGRATION' | 'SFP LINK UPGRADE';
    description?: string;
    status?: string;
    created_at?: string;
    updated_at?: string;
}

export interface RaawaRequirement {
    id?: string;
    site_id: string;
    project_id: string;
    applied: boolean;
    raawa_no?: string;
    valid_from?: string;
    valid_to?: string;
    list_of_sites?: string[];
    status?: string;
    created_at?: string;
    updated_at?: string;
}

export interface TowercoRequirement {
    id?: string;
    site_id: string;
    project_id: string;
    towerco?: string;
    permit_ref_no?: string;
    valid_from?: string;
    valid_to?: string;
    status?: string;
    created_at?: string;
    updated_at?: string;
}

export interface PlannedDeployment {
    id?: string;
    site_id: string;
    project_id: string;
    activity_type: string;
    activity_name: string;
    planned_date?: string;
    status?: string;
    sequence_order?: number;
    created_at?: string;
    updated_at?: string;
}

export interface ActualDeployment {
    id?: string;
    planned_deployment_id: string;
    site_id: string;
    activity: string;
    time?: string;
    progress?: number;
    engineer_id?: string;
    status?: string;
    remarks?: string;
    created_at?: string;
    updated_at?: string;
}

export interface ActivityUpdate {
    id?: string;
    actual_deployment_id: string;
    time: string;
    progress: number;
    created_at?: string;
}

export interface EngineerActivityLog {
    id?: string;
    engineer_id: string;
    actual_deployment_id: string;
    action: 'LOGIN' | 'LOGOUT' | 'ISSUE_RAISED';
    timestamp?: string;
    issue_description?: string;
    created_at?: string;
}

export interface Notification {
    id?: string;
    site_id: string;
    project_id: string;
    type: 'RAAWA_EXPIRING' | 'TOWERCO_EXPIRING' | 'REQUIREMENT_MISSING' | 'ACTIVITY_UPDATE';
    message: string;
    is_read: boolean;
    created_at?: string;
}
