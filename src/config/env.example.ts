// Environment Configuration Example
export const env = {
    supabase: {
        url: 'supabase-project-url',
        anonKey: 'supabase-anon-key',
    },
    // Optional configurations
    analytics: {
        // gaTrackingId: 'your-google-analytics-id',
        // sentryDsn: 'your-sentry-dsn',
    },
} as const; 