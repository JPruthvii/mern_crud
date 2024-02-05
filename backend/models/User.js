const mongoose=require("mongoose")

// User Model
const userSchema=new mongoose.Schema({
    username: String,
    age: Number
  })


const User = mongoose.model('User', userSchema);

module.exports=User;
