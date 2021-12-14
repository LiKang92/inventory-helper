
// mark for development environment
const isDev = process.env.NODE_ENV === 'development';

// config for database
let SERVER_CONFIG, DB_CONFIG;


if (isDev) {
  // configuration for database
  SERVER_CONFIG = {
    port: 4000,
  };

  // configuration for database
  DB_CONFIG = {
    port: 27017,
    host: 'localhost',
    name: 'admin_db'
  };

} else {

  // configuration for database
  SERVER_CONFIG = {
    port: 4000,
  };

  // configuration for database
  DB_CONFIG = {
    port: 27017,
    host: 'localhost',
    name: 'admin_db'
  };

}

/* 
set token white list,no need to check all path

*/
const UN_CHECK_PATHS = ['/test', '/login', '/manage/img/upload'];

// set token encryption key
const PRIVATE_KEY = 'kang_token';

module.exports = {
  SERVER_CONFIG,
  DB_CONFIG,
  PRIVATE_KEY,
  UN_CHECK_PATHS
};