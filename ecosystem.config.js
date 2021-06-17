const { name } = require('./package.json');
const path = require('path');

module.exports = {
  apps: [
    {
      name,
      script: './start.sh',
      exec_interpreter: "bash",
      instances: require('os').cpus().length,
      autorestart: false,
      watch: false,
      error_file : "./pm2/err.log",
      out_file : "./pm2/out.log",
      env_production: {
        NODE_ENV: 'production',
        PORT: 8080
      }
    }
  ]
};
