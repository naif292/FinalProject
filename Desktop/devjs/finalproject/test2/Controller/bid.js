const {verifyToken} = require('../Controller/register');
const user = require('../models/User');
const list = require('../models/List');
const bid = require('../models/Bids');



async function placeBid(req,res){
    try{
        const token=req.headers.cookie.split('=')[1];
        const x  = verifyToken(token)
        console.log(req.params)
        if(verifyToken(token)){
            const username = await user.findOne({username:x.verify.username})
            const listid = await list.findOne({iteme:req.body.commenttitle})
            console.log(listid)

            const highbid = await bid.find({List:listid}).sort({bidamount: -1}).limit(1).populate('User')
            console.log(highbid)
            if(highbid != ""){
            if(req.body.bid > highbid[0].bidamount){
       
        const newBid =  new bid({
            bidamount:req.body.bid,
            User:username,
            List:listid,

        })
        await newBid.save();
        url = "/itemes/" + req.body.commenttitle
        return res.redirect(url)
    }else{
        res.render('errorbid',{bid:highbid[0].bidamount})
    }
    }else{
        const newBid =  new bid({
            bidamount:req.body.bid,
            User:username,
            List:listid,

        })
        newBid.save();
        url = "/itemes/" + req.body.commenttitle
        res.redirect(url)
    }}
}
    catch(err){
        res.send(err)
    }
}

module.exports = {
    placeBid
}