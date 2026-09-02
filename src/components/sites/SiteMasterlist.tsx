// src/components/sites/SiteMasterlist.tsx
import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabaseClient';
import { SiteMasterlist } from '../../types';
import { Link } from 'react-router-dom';

const SiteMasterlist: React.FC = () => {
    const [sites, setSites] = useState<SiteMasterlist[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterTerritory, setFilterTerritory] = useState('');

    useEffect(() => {
        fetchSites();
    }, []);

    const fetchSites = async () => {
        try {
            setLoading(true);
            const { data, error } = await supabase
                .from('site_masterlist')
                .select('*')
                .order('created_at', { ascending: false });

            if (error) throw error;
            setSites(data || []);
        } catch (error) {
            console.error('Error fetching sites:', error);
        } finally {
            setLoading(false);
        }
    };

    const filteredSites = sites.filter(site => {
        const matchesSearch = site.site?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                             site.plaid?.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesTerritory = filterTerritory ? site.territory === filterTerritory : true;
        return matchesSearch && matchesTerritory;
    });

    const territories = [...new Set(sites.map(site => site.territory).filter(Boolean))];

    return (
        <div className="site-masterlist">
            <div className="page-header">
                <h1>Site Masterlist</h1>
                <Link to="/sites/add" className="btn-primary">Add New Site</Link>
            </div>

            <div className="filters">
                <input
                    type="text"
                    placeholder="Search by Site Name or PLAID..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="search-input"
                />
                <select
                    value={filterTerritory}
                    onChange={(e) => setFilterTerritory(e.target.value)}
                    className="filter-select"
                >
                    <option value="">All Territories</option>
                    {territories.map(territory => (
                        <option key={territory} value={territory}>{territory}</option>
                    ))}
                </select>
            </div>

            {loading ? (
                <div className="loading">Loading sites...</div>
            ) : (
                <div className="table-container">
                    <table className="site-table">
                        <thead>
                            <tr>
                                <th>PLAID</th>
                                <th>Site Name</th>
                                <th>Territory</th>
                                <th>Region</th>
                                <th>TOWERCO</th>
                                <th>Contact</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredSites.map(site => (
                                <tr key={site.id}>
                                    <td>{site.plaid}</td>
                                    <td>{site.site}</td>
                                    <td>{site.territory}</td>
                                    <td>{site.region}</td>
                                    <td>{site.towerco}</td>
                                    <td>{site.contact_number}</td>
                                    <td>
                                        <Link to={`/sites/${site.id}`} className="btn-view">View</Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default SiteMasterlist;
