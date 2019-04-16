var express=require('express');
var app=express.Router();

var user=[{
    nama:'Rizal Azky',alamat:'Margasarii'
}];


app.get('/',function(req,res,next){
    res.render('demo/index',{
           data:user
    });
});

app.get('/tambah',(req,res,next)=>{
    res.render('demo/form',{
        data:{
            title:'Form Tambah',
            action:'/demo/tambah',
            user:{
                nama:'',
                alamat:''
            }
        }
    });
});

app.post('/tambah',(req,res,next)=>{
    user.push({
        nama:req.param('nama'),
        alamat:req.param('alamat')
    });
    res.redirect('/demo');
});

app.get('/edit/(:id)',(req,res,next)=>{
    var users=user[req.params.id];
    res.render('demo/form',{
        data:{
            user:users,
            title:'Edit Data',
            action:'/demo/edit/'+req.params.id
        }
    });
});

app.post('/edit/(:id)',(req,res,next)=>{
    var i=req.params.id;
    user[i]={
        nama:req.param('nama'),
        alamat:req.param('alamat')
    }
    res.redirect('/demo');
});

app.get('/hapus/(:id)',(req,res,next)=>{
    var i=req.params.id;
    user.splice(i,1);
    res.redirect('/demo');
});

module.exports=app;