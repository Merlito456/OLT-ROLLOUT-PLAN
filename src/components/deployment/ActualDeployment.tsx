// src/components/deployment/ActualDeployment.tsx
import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabaseClient';
import { ActualDeployment, ActivityUpdate } from '../../types';

const ActualDeployment: React.FC = () => {
    const [deployments, setDeployments] = useState<ActualDeployment[]>([]);
    const [selectedDeployment, setSelectedDeployment] = useState<string | null>(null);
    const [updates, setUpdates] = useState<ActivityUpdate[]>([]);
    const [newProgress, setNewProgress] = useState<number>(0);
    const [newTime, setNewTime] = useState<string>(new Date().toISOString().slice(0, 16));

    useEffect(() => {
        fetchDeployments();
    }, []);

    useEffect(() => {
        if (selectedDeployment) {
            fetchUpdates(selectedDeployment);
        }
    }, [selectedDeployment]);

    const fetchDeployments = async () => {
        try {
            const { data, error } = await supabase
                .from('actual_deployment')
                .select('*, site_masterlist(*)')
                .order('created_at', { ascending: false });

            if (error) throw error;
            setDeployments(data || []);
        } catch (error) {
            console.error('Error fetching deployments:', error);
        }
    };

    const fetchUpdates = async (deploymentId: string) => {
        try {
            const { data, error } = await supabase
                .from('activity_updates')
                .select('*')
                .eq('actual_deployment_id', deploymentId)
                .order('time', { ascending: true });

            if (error) throw error;
            setUpdates(data || []);
        } catch (error) {
            console.error('Error fetching updates:', error);
        }
    };

    const handleAddUpdate = async () => {
        if (!selectedDeployment) return;

        try {
            const { data, error } = await supabase
                .from('activity_updates')
                .insert([
                    {
                        actual_deployment_id: selectedDeployment,
                        time: newTime,
                        progress: newProgress
                    }
                ])
                .select();

            if (error) throw error;
            
            // Refresh updates
            fetchUpdates(selectedDeployment);
            
            // Reset form
            setNewProgress(0);
            setNewTime(new Date().toISOString().slice(0, 16));
        } catch (error) {
            console.error('Error adding update:', error);
        }
    };

    return (
        <div className="actual-deployment">
            <div className="page-header">
                <h1>Actual Deployment Monitoring</h1>
                <button className="btn-primary" onClick={fetchDeployments}>Refresh</button>
            </div>

            <div className="deployment-grid">
                <div className="deployment-list">
                    <h2>Active Deployments</h2>
                    {deployments.map(deployment => (
                        <div 
                            key={deployment.id}
                            className={`deployment-item ${selectedDeployment === deployment.id ? 'selected' : ''}`}
                            onClick={() => setSelectedDeployment(deployment.id)}
                        >
                            <h3>{deployment.activity}</h3>
                            <p>Progress: {deployment.progress}%</p>
                            <p>Status: {deployment.status}</p>
                        </div>
                    ))}
                </div>

                <div className="deployment-details">
                    {selectedDeployment && (
                        <>
                            <h2>Activity Updates</h2>
                            <div className="updates-list">
                                {updates.map((update, index) => (
                                    <div key={update.id} className="update-item">
                                        <span className="update-time">
                                            {new Date(update.time).toLocaleString()}
                                        </span>
                                        <span className="update-progress">
                                            Progress: {update.progress}%
                                        </span>
                                    </div>
                                ))}
                            </div>

                            <div className="add-update-form">
                                <h3>Add Update</h3>
                                <div className="form-group">
                                    <label>Time</label>
                                    <input
                                        type="datetime-local"
                                        value={newTime}
                                        onChange={(e) => setNewTime(e.target.value)}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Progress (%)</label>
                                    <input
                                        type="number"
                                        value={newProgress}
                                        onChange={(e) => setNewProgress(Number(e.target.value))}
                                        min="0"
                                        max="100"
                                    />
                                </div>
                                <button onClick={handleAddUpdate} className="btn-primary">
                                    Add Update
                                </button>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ActualDeployment;
