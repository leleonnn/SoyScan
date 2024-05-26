module.exports = {
  apps : [{
    script: 'npm start'
  }],

  deploy : {
    production : {
      key  : 'soyscan-frontend_key.pem',
      user : 'soyscan-admin',
      host : '20.127.162.45',
      ref  : 'origin/main',
      repo : 'git@github.com:leleonnn/SoyScan.git',
      path : '/home/ubuntu',
      'pre-deploy-local': '',
      'post-deploy' : 'source ~/.nvm/nvm.sh && npm install && npm run build && pm2 reload ecosystem.config.js --env production',
      'pre-setup': '',
      'ssh_options' : 'ForwardAgent=yes'
    }
  }
};
