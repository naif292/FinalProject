const {verifyToken} = require('../Controller/register');
const list = require('../models/List');
const User = require('../models/User');
const comment = require('../models/Comment');
const bid = require('../models/Bids');



async function getClosed(req,res){
    const token=req.headers.cookie.split('=')[1];
    const x  = verifyToken(token)
    if(verifyToken(token)){
       

    const iteme =  await list.find({iteme:req.params.iteme}).limit(1).populate('User')
    const comments = await comment.find({List:iteme}).populate('User List')
    const closed = await list.find({}).where({active:false})
    console.log(closed)
    const highbid = await bid.find({}).where('List').where('active').equals(false).populate({
        path: 'List User',
        match: {
          active: false,
         
        }
      }).sort('-bidamount').limit(1)


   

    
    res.render('closedauction',{username:x.verify.username,itemes:iteme,comment:comments,highBid:highbid})
    }


}


module.exports ={
    getClosed
}