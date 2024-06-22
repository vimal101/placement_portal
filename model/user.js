const mongoose = require('mongoose');
mongoose.set('strictQuery', true);
const passportLocalMongoose = require('passport-local-mongoose');
mongoose.connect("mongodb+srv://singhvimal2002:585AHY3BtgQvb2E0@cluster0.3vixtry.mongodb.net/portal",{useNewUrlParser:true});
const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
       
      },
    developfor:{type:String,required:true},
   username: {
    type: String,
    required: true,
    unique: true // set the 'unique' option to true to ensure a unique username
  },
  password: String,

});

UserSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model('User', UserSchema);
