const config = {
  env: process.env.NODE_ENV || 'development',
  port: process.env.PORT || 8000,
  db: {
    name: process.env.db_name || 'db',
  },
  security: {
    areas: {
      admin: ['tino'],
    },
  },
};

export default config;
