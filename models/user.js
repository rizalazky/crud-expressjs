var mongoose=require('mongoose');
var Schema=mongoose.Schema;

var userSchema=new Schema({
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true},
    username:{type:String,required:true},
    alamat:String,
    admin:Boolean
},{
    timestamps:true
});

var User=mongoose.model('User',userSchema);

module.exports=User;