const config = {
    env: process.env.NODE_ENV || 'development',
    port: process.env.PORT || 8003,
    db: {
        uri: process.env.db_uri || 'mongodb://localhost/test',
    },
    security: {
        areas: {
            admin: ['tino'],
        },
        jwtSecret: 'secret'
    },
};

export default config;
