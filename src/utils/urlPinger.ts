import { supabase } from "@/integrations/supabase/client";

//const SUPABASE_PING_URL = 'https://bidswcansixttbhmwpkj.supabase.co/functions/v1/ping-service';

const startPinging = () => {
    const ping = async () => {
        const { data, error } = await supabase.functions.invoke('ping-service');
        if (error) {
            console.error('Ping error:', error);
        } else {
            console.log('Ping results:', data);
        }
    };

    ping(); // Initial call
    const interval = setInterval(ping, 14 * 60 * 1000); // 14 minutes

    return () => clearInterval(interval);
};

export default startPinging; 