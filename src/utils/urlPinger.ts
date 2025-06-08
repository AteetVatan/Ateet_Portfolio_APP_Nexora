const SUPABASE_PING_URL = 'https://bidswcansixttbhmwpkj.supabase.co/functions/v1/ping-service';

const startPinging = () => {
    const ping = () => {
        fetch(SUPABASE_PING_URL)
            .then(res => res.json())
            .then(data => console.log('Ping results:', data))
            .catch(err => console.error('Ping error:', err));
    };

    ping(); // Initial call
    const interval = setInterval(ping, 14 * 60 * 1000); // 14 minutes

    return () => clearInterval(interval);
};

export default startPinging; 