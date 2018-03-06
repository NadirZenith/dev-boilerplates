export default {
    env: process.env.NODE_ENV || 'development',
    port: process.env.PORT || 8003,
    db: {
        uri: process.env.db_uri || 'mongodb://localhost/dev_boilerplates',
    },
    security: {
        areas: {
            admin: ['tino'],
            dev: ['tino'],
        },
        session: {
            secret: 'secret'
        },
        jwtSecret: 'secret',
    },
}