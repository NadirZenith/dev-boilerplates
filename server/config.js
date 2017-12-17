const config = {
    port: process.env.PORT || 8000,
    security: {
        areas: {
            admin: ['tino']
        }
    }
};

export default config;
