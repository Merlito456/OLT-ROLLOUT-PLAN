import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';
import { SiteMasterlist } from '../types';

export const useSites = () => {
  const [sites, setSites] = useState<SiteMasterlist[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchSites = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('site_masterlist')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setSites(data || []);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const addSite = async (site: Omit<SiteMasterlist, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      const { data, error } = await supabase
        .from('site_masterlist')
        .insert([site])
        .select();

      if (error) throw error;
      await fetchSites();
      return data?.[0];
    } catch (err: any) {
      throw new Error(err.message);
    }
  };

  useEffect(() => {
    fetchSites();
  }, []);

  return { sites, loading, error, fetchSites, addSite };
};
