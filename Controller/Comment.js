const {verifyToken, dashboard} = require('../Controller/register');
const comment = require('../models/Comment');
const user = require('../models/User');
const list = require('../models/List');




async function createComment(req, res, next) {
    const token=req.headers.cookie.split('=')[1];
    const x  = verifyToken(token)
    console.log(req.params)
    if(verifyToken(token)){
        const username = await user.findOne({username:x.verify.username})
        const listid = await list.findOne({iteme:req.body.commenttitle})
        console.log(listid + "here")
        
        const newComment = await comment.create({
            comments:req.body.comment2,
            User:username,
            List:listid,

        })
        newComment.save();
        //console.log(listid)
        url = "/itemes/" + req.body.commenttitle
        return res.redirect(url)
    }else{
        res.redirect('/')
    }
    
}
    async function deleteComment(req, res) {
        const token=req.headers.cookie.split('=')[1];
        const x  = verifyToken(token)
        console.log(req.body.commetUser + x.verify.username)
        console.log(req.params)
        if(verifyToken(token)){
            if(x.verify.username == req.body.commetUser){
                await comment.deleteOne({_id:req.body.comment_id})
          
            //console.log(listid)
            url = "/itemes/" + req.body.commentTitle
            return res.redirect(url)
        }else{
            res.render("deletecommenterror",{username:x.verify.username})
        }
        
        }else{
            res.redirect('/')
        }
        
    
    }



module.exports = {
createComment,
deleteComment
 }
