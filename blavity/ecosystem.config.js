module.exports = {
  apps : [{
    name: 'blavity-challenge',
    script: './server/index.js',
    instances: 1,
    autorestart: true,
    watch: true,
    max_memory_restart: '1G',
    cwd: '/var/www/blavity/source/',
    exec_mode: "cluster"
  }],

  deploy : {
    production : {
      user : 'blavity',
      host : ['167.99.152.26'],
      ref  : 'origin/master',
      repo : 'git@github.com:smguggen/blavity-challenge.git',
      path : '/var/www/blavity/',
      'post-deploy': 'npm install && npm run build && pm2 startOrRestart ./ecosystem.config.js',
      key  : '~/.ssh/id_rsa'
    }
  }
};
