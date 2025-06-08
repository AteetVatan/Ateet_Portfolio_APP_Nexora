import axios from 'axios';

const PING_INTERVAL = 14 * 60 * 1000; // 14 minutes in milliseconds

const urlsToPing = [
    'https://masx-ai-gdelt-api.onrender.com/',
    'https://movie-app-kufy.onrender.com/'
];

const pingUrl = async (url: string) => {
    try {
        const response = await axios.get(url);
        console.log(`Successfully pinged ${url} - Status: ${response.status}`);
    } catch (error) {
        console.error(`Failed to ping ${url}:`, error);
    }
};

const startPinging = () => {
    // Initial ping
    urlsToPing.forEach(pingUrl);

    // Set up interval for subsequent pings
    setInterval(() => {
        urlsToPing.forEach(pingUrl);
    }, PING_INTERVAL);
};

export default startPinging; 