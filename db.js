const config = require('./config/index');
const mongoose = require('mongoose');
mongoose.set('useCreateIndex', true);
// mongoose.connect(config.db,{ useNewUrlParser: true });
mongoose.connect(config.db,{ useNewUrlParser: true } || 
  'mongodb+srv://sohil:sohiL@5240@cluster0-kjwrv.mongodb.net/test?retryWrites=true&w=majority');
mongoose.Promise = global.Promise;

module.exports = {
  User: require('./models/User'),
};
