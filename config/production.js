'use strict';

module.exports = {
  env: 'production',
  db:'mongodb://localhost/royal-shopping',
  port: process.env.PORT || 4000,
  ip: process.env.IP || `https://127.0.0.1/4000`,
  imagepath: '/public/',
  jwtIssuer: 'www.yourdomainname.com',
  jwtToken:'hvjfhgfdgdfjkghncm,vngf5656454gfdg4d',
  jwtExpires: 86400 // Numeric seconds expiry (86400 = '1d'). If string supplied, you provide units (e.g., "8h")

};
