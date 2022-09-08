const {verifyToken} = require('../Controller/register');
const user = require('../models/User');
const list = require('../models/List');
const bid = require('../models/Bids');


async function closeAuction(req, res, next) {
    const token=req.headers.cookie.split('=')[1];
    const x  = verifyToken(token)
   


    if(verifyToken(token)){

        if(x.verify.username == req.body.username){
            console.log(req.body.title)
            const listUpdate = await list.findOneAndUpdate({iteme:req.body.title},{active:false});
            listUpdate.save();
            console.log(listUpdate)
            res.redirect('/dashboard');
        }else{
            res.render("noprivs",{username:x.verify.username});
        }
}
else{
    res.status(403).send()
}

}


module.exports = 
{
    closeAuction

}