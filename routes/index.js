var express = require('express');
var router = express.Router();
var model=require('../models/user');
var Auth_mid=require('../midlewares/auth');

var sessionStore;

/* GET home page. */
router.get('/',Auth_mid.check_login, function(req, res, next) {
  sessionStore=req.session;
  res.render('index', { title: 'Express' });
});

router.get('/login',function(req,res,next){
  if(req.session.logged_in){
    res.redirect('/users');
  }
  res.render('login');
});
router.post('/login',function(req,res,next){
  sessionStore=req.session;
  var email=req.param('email');
  var password=req.param('password');

  if(email=="" || password==""){
    req.flash('msg_err','Maaf,Data tidak boleh kosong');
    res.redirect('/login');
  }else{
    model.find({email:email,password:password},function(err,user){
      if(err){
        throw err;
      }

      if(user.length>0){
        sessionStore.email=user[0].email;
        sessionStore.username=user[0].username;
        sessionStore.logged_in=true;

        req.flash('msg_info','Selamat Datang '+user[0].username);
        res.redirect('users');
      }else{
        req.flash('msg_err','Maaf,Email dan password Salah');
        res.redirect('/login');
      }
    });
  }
});
router.get('/logout',function(req,res){
  req.session.destroy(function(err){
    if(err){
      throw err;
    }
    res.redirect('/users');
  });
});
module.exports = router;
