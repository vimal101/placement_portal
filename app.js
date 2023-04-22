const express = require('express');
const session = require('express-session');
const { default: mongoose } = require('mongoose');
const app = express();
const ejs = require("ejs");
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('./model/user');
app.use(express.static('public'));
const Post = require('./model/place');

const notifier = require('node-notifier');


app.set('view engine','ejs');
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(session({
  secret: 'your secret key',
  resave: false,
  saveUninitialized: false
}));


app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize());
app.use(passport.session());







app.get('/logout', function(req, res, next) {
  req.logout(function(err) {
    if (err) { 
      return next(err); 
      }
    res.redirect('/');
  });
});
app.get('/', function(req, res) {
  res.render('home.ejs');
});




app.post('/login', passport.authenticate('local', { failureRedirect: '/login' }), function(req, res) {
  //res.redirect('/secret');
  if(req.user.developfor==="company"){
    res.redirect('/company');
  }else if(req.user.developfor==="government"){
    res.redirect('/government');
  }
  else{
    res.redirect('/secret');
  }
});


app.get("/government",function(req,res){
  if (req.isAuthenticated()) {
   
    
      res.render('government');
   
    
 
  } else {
    res.redirect('/login');
  }
})



app.get('/login', function(req, res) {
  res.render('login.ejs');
});

app.get('/register', function(req, res) {
  res.render('register');
});

app.post('/register', function(req, res) {
  User.register(new User({
    username: req.body.username,
    name: req.body.name,
    developfor:req.body.developfor
  }), req.body.password, function(err) {
    if (err) {
      console.error(err);
      return res.redirect('/register');
    }
    res.redirect('/login');
  });
});


app.get('/secret',function(req,res){

  
  if (req.isAuthenticated()) {
    Post.find({name:req.user.name},function(err,post){
    
      res.render('secrets', { user: req.user,posts:post });
    })
    
 
  } else {
    res.redirect('/login');
  }
})






app.post('/secret',function(req,res){
  // console
  // console.log(req.user);
const newMyData = new Post({
  name:req.body.collegename,
  date:req.body.date
  ,
  Branch:req.body.Branch,
  Total_Students:req.body.Total_Students,
  Eligible_Students:req.body.Eligible_Students,
  PNR_Students:req.body.PNR_Students,
  Placed_Students:req.body.Placed_Students,
  Offer_Letters:req.body.Offer_Letters,
  Lowest_Package:req.body.Lowest_Package,
  Highest_Package:req.body.Highest_Package,
  Average_Package:req.body.Average_Package,
  No_of_Companies:req.body.No_of_Companies
});

newMyData.save((err, savedData) => {
  if (err) {
    console.error(err);
    return;
  }else{
    res.redirect('/secret');

notifier.notify({
  
  message: 'Data saved successfully:'
});
  

    }
});
});




app.get("/delete/:id",function(req,res){
  const requestedid = req.params.id;
Post.deleteOne({_id:requestedid},function(err){
  if(err){
    console.log(err)
  }else{
    console.log("successful delete");
    res.redirect("/secret");
  }
})
})




app.get("/company",function(req,res){
  if (req.isAuthenticated()) {
    Post.find({},function(err,post){
    
      res.render('company', { user: req.user,posts:post });
    })
    
 
  } else {
    res.redirect('/login');
  }
})




app.get('/update/:id', function(req, res,) {
      
  

  if (req.isAuthenticated()) {
    const requestedid = req.params.id;
  Post.findById(requestedid,function(err,content){
    res.render("update",{user:req.user,
      post :content
  }); })
  }

});


app.post('/update',function(req,res){
 const a = Post.findByIdAndUpdate(req.body._id,{$set:{
    name:req.body.collegename,
    date:req.body.date,
    Branch:req.body.Branch,
    Total_Students:req.body.Total_Students,
    Eligible_Students:req.body.Eligible_Students,
    PNR_Students:req.body.PNR_Students,
    Placed_Students:req.body.Placed_Students,
    Offer_Letters:req.body.Offer_Letters,
    Lowest_Package:req.body.Lowest_Package,
    Highest_Package:req.body.Highest_Package,
    Average_Package:req.body.Average_Package,
    No_of_Companies:req.body.No_of_Companies}},function(err,result){
      if(!err){
        res.redirect("/secret");
        console.log(a);
      }else{
        res.send(err);
      }
    })
})







app.listen(3000, function() {
  console.log('Server started on port 3000');
});























