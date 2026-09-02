// src/lib/supabaseClient.ts
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ftqmclyfcqacmprzikie.supabase.co';
const supabaseKey = 'sb_publishable_PZAy3SOjW2esDjK2JYpgtg_ppkyyScU';

export const supabase = createClient(supabaseUrl, supabaseKey);
