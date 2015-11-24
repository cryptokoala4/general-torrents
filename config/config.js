var path = require('path'),
    rootPath = path.normalize(__dirname + '/..'),
    env = process.env.NODE_ENV || 'development';

var config = {
  development: {
    root: rootPath,
    app: {
      name: 'wdi-express'
    },
    port: 3000,
    db: 'mongodb://localhost/wdi-express-development'
  },

  test: {
    root: rootPath,
    app: {
      name: 'wdi-express'
    },
    port: 3000,
    db: 'mongodb://localhost/wdi-express-test'
  },

  production: {
    root: "http://general-developers.herokuapp.com",
    app: {
      name: 'general-torrents'
    },
    port: (process.env.PORT || 3000 ),
    db: 'mongodb://heroku_kld48wc1:i4p18kd1c557u8kquoah0ifiuv@ds057244.mongolab.com:57244/heroku_kld48wc1'
  }
};

module.exports = config[env];
