const User = require('../models/User');
const jwt = require('jsonwebtoken');
const list = require('../models/List');
require('dotenv').config()

async function singup(req, res){
    try{
    const {username,password,email} = req.body;
    const newUser = await  User.create({
        username: username,
        password:password,
        email:email
      
    });
    console.log(req.body);
    newUser.save();
    return res.redirect('/');
}catch(e)
{   
    res.render('dublicateuser')
    console.error(e)
}
}

function login2(req, res){
    res.render('signin')
}

function signup2(req,res){
    res.render('signup')
}

async function verifyUserLogin(username, password){
    const user = await User.findOne({username: username, password: password})
    if(user){
        //create User token
        token = jwt.sign({id:user._id,username:user.username,type:'user'},process.env.TOKEN,{ expiresIn: '2h'})
        return {status:'ok',data:token,user}

    }
    else{
        return false;
        
    }
}

async function login(req, res){
    const {username,password} = req.body;
    const response = await verifyUserLogin(username,password);
    if (response){
        res.cookie('token',token,{ maxAge: 2 * 60 * 60 * 1000, httpOnly: true });
   
    res.redirect('/dashboard')
}else{
    res.render('wrongusername');
}

}

const verifyToken = (token)=>{
    try {
        const verify = jwt.verify(token,process.env.TOKEN);
        if(verify.type==='user'){
            return {verify};
        }
        else{return false};
    } catch (error) {
        console.log(JSON.stringify(error),"errossr");
        return false;
    }
}


async function dashboard(req,res){
    const token=req.headers.cookie.split('=')[1];
    const x  = verifyToken(token)
  
    if(verifyToken(token)){
        const itemes = await list.find({active:true})
        return res.render('dashboard',{username:x.verify.username,itemes:itemes})
    }else{
        res.redirect('/')
    }
}



module.exports = {
    singup,
    login,
    login2,
    signup2,
    dashboard,
    verifyToken
    
}