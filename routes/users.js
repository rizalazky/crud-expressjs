var express=require('express');
var route=express.Router();
var models=require('../models/user');
var Auth_mdw=require('../midlewares/auth');
var sessionStore;

route.get('/',Auth_mdw.check_login,(req,res,next)=>{
  sessionStore=req.session;
  models.find({},function(err,result){
    res.render('users/index',{
      user:result
    });
    console.log(result);
  });
});

route.get('/tambah',Auth_mdw.check_login,function(req,res,next){
  sessionStore=req.session;
  res.render('users/form',{
    users:{
      username:'',
      email:'',
      password:'',
      alamat:'',
    },
    action:'/users/tambah'
  });
});

route.post('/tambah',Auth_mdw.check_login,function(req,res,next){
  sessionStore=req.session;
  var v_username=req.param('username');
  var v_email=req.param('email');
  var v_password=req.param('password');
  var v_alamat=req.param('alamat');

  var admin=new models({
    username:v_username,
    email:v_email,
    password:v_password,
    alamat:v_alamat,
    admin:true
  });
  admin.save(function(err){
    if(err){
      req.flash('msg_error','Gagal Menambah Data');
    }
    req.flash('msg_info','Berhasil Menambah Data');
    res.redirect('/users');
  });
});

route.get('/lihat/(:id)',Auth_mdw.check_login,function(req,res,next){
  sessionStore=req.session;
  models.findById(req.params.id,function(err,user){
    if(err){
      throw err;
    }else{
      res.render('users/lihat',{
        users:user
      });
    }
  });
});

route.get('/hapus/(:id)',Auth_mdw.check_login,(req,res,next)=>{
  sessionStore=req.session;
  models.findById(req.params.id,(err,user)=>{
    if(err){
      throw err;
    }else{
      user.remove((err,user)=>{
        if(err){
          req.flash('msg_error','Gagal Menghapus');
        }else{
          req.flash('msg_info','Berhasil Menghapus');
        }
        res.redirect('/users');
      });
    }
  });
});

route.get('/edit/(:id)',Auth_mdw.check_login,function(req,res,next){
  sessionStore=req.session;
  models.findById(req.params.id,(err,user)=>{
    if(err){
      throw err;
    }else{
      res.render('users/form',{
        users:user,
        action:'/users/edit/'+user._id
      });
    }
  });
});

route.post('/edit/(:id)',Auth_mdw.check_login,(req,res,next)=>{
  sessionStore=req.session;
  models.findById(req.params.id,function(err,user){
    user.username=req.param('username');
    user.email=req.param('email');
    user.password=req.param('password');
    user.alamat=req.param('alamat');
    user.admin=true;

    user.save, (function(err,user){
      if(err){
        req.flash('msg_error','Data Gagal Di edit!!!');
      }else{
        req.flash('msg_info','Data Berhasil Di Edit');
      }
      res.redirect('/users');
    });
  });
});

module.exports=route;