'use strict';

module.exports = {
  env: 'production',
  db: 'mongodb+srv://sohil:sohiL@5240@cluster0-kjwrv.mongodb.net/test?retryWrites=true&w=majority',
  port: process.env.PORT || 4000,
  ip: process.env.IP || `https://cryptic-beach-01479.herokuapp.com`,
  imagepath: '/public/',
  jwtIssuer: 'www.yourdomainname.com',
  jwtToken:'S1O2H2I4L5M6A7N8S9R1U2I3',
  jwtExpires: 86400 // Numeric seconds expiry (86400 = '1d'). If string supplied, you provide units (e.g., "8h")

};
