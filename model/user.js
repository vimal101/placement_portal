const mongoose = require('mongoose');
mongoose.set('strictQuery', true);
const passportLocalMongoose = require('passport-local-mongoose');
mongoose.connect("/portal",{useNewUrlParser:true});
// mongodb+srv://singhvimal2002:Vimal%40123@cluster0.aj4n2xh.mongodb.net
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
