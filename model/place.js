const mongoose = require('mongoose');
mongoose.set('strictQuery', true);
mongoose.connect("mongodb+srv://singhvimal2002:585AHY3BtgQvb2E0@cluster0.3vixtry.mongodb.net/portal",{useNewUrlParser:true});

const placementSchema = new mongoose.Schema({
  
  name:{
    type:String
  },
  
  date:{
    type:Number,
    require:true
  }
,
  Branch:{
    type:String,
    require:true
  },
  Total_Students:{
    type:Number,
    require:true
  },
  Eligible_Students:{
    type:Number,
    require:true
  }
  ,
  PNR_Students:{
    type:Number,
    require:true
  },
  Placed_Students:{
    type:Number,
    require:true
  },
  Offer_Letters:{
    type:Number,
    require:true
  },
  Lowest_Package:{
    type:Number,
    require:true
  },
  Highest_Package:{
    type:Number,
    require:true
  },
  Average_Package:{
    type:Number,
    require:true
  },
  No_of_Companies:{
    type:Number,
    require:true
  }
});



module.exports = mongoose.model('place', placementSchema);
