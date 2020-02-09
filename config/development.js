'use strict';

module.exports = {
  env: 'development',
  db: 'mongodb+srv://sohil:sohiL@5240@cluster0-kjwrv.mongodb.net/test?retryWrites=true&w=majority',
  port: process.env.PORT || 4000,
  ip: process.env.IP || `https://cryptic-beach-01479.herokuapp.com`,
  imagepath: '/public/',
  jwtIssuer: 'www.yourdomainname.com',
  jwtToken:'S1O2H2I4L5M6A7N8S9R1U2I3',
  jwtExpires: 86400 // Numeric seconds expiry (86400 = '1d'). If string supplied, you provide units (e.g., "8h")
};
// jwtExpires 86400=24hours=1day
// https://www.google.com/search?q=24+hours+seconds&rlz=1C1CHBF_enIN860IN860&oq=24+hours+se&aqs=chrome.1.69i57j0l7.7441j0j7&sourceid=chrome&ie=UTF-8

//image
// https://www.djamware.com/post/5c98220080aca754f7a9d1f0/nodejs-expressjs-and-multer-restful-api-for-image-uploader

