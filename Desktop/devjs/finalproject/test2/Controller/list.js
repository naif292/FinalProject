const {verifyToken} = require('../Controller/register');
const list = require('../models/List');
const User = require('../models/User');
const comment = require('../models/Comment');
const bid = require('../models/Bids');


function add_item(req,res){
    //console.log(req.headers.cookie.split('=') + "aaaa")
    if(req.headers.cookie){
      
    const token=req.headers.cookie.split('=')[1];
    const x  = verifyToken(token)
    if(verifyToken(token)){
        return res.render('list',{username:x.verify.username})
    }else{
        res.redirect('/')
    }
}else{
    res.render("createerror")
}
}

async function create_item(req,res){
    console.log("asas")
    if(req.headers.cookie){
        console.log("asas")

    const token=req.headers.cookie.split('=')[1];
    const x  = verifyToken(token)
    const user2 = await User.findOne({username:x.verify.username})
 

    if(verifyToken(token)){
    const newList =  await list.create({
        iteme : req.body.iteme,
        imagUrl : req.body.imgUrl,
        description:req.body.description,
        price : req.body.price,
        User:user2
    

    })
    newList.save(async function(err, list) {
        const newbid = await bid.create({
            bidamount:req.body.price,
            User:list.User._id,
            List:list._id
        })
        console.log(newbid+list)
        await newbid.save()
        
    })
}
    res.redirect('dashboard')
}else{
    res.send("error")
}}



async function get_itmes(req,res){
    const token=req.headers.cookie.split('=')[1];
    const x  = verifyToken(token)
    if(verifyToken(token)){
       

    const iteme =  await list.find({iteme:req.params.iteme}).limit(1).populate('User')
    const comments = await comment.find({List:iteme}).populate('User List')
    const highbid = await bid.find({List:iteme}).sort({bidamount: -1})
    console.log(highbid + "here")
        if (highbid != null){
   


    
    res.render('listiteme',{username:x.verify.username,itemes:iteme,comment:comments,highBid:highbid})
}else{
    const highbid = 1
    res.render('listiteme',{username:x.verify.username,itemes:iteme,comment:comments,highBid:highbid})
}
    }
}

module.exports = {
    add_item,
    create_item,
    get_itmes,

}