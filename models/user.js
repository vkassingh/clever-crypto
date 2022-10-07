const mongoose= require('mongoose')

//mongoose schema
const userSchema= mongoose.Schema({
    username: String,
    password: String,
    
});

const User =mongoose.model("User", userSchema);
module.exports= User;
