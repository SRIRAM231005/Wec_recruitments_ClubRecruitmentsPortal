const adminDetails = require('../models/admin_details');

async function PostPreferenceOrder(req , res){
    const {username,email,preferenceOrder} = req.body;
    const admin = await adminDetails.create({
        username:username,
        email:email,
        preferenceOrder:preferenceOrder
    })
    return res.json({message:"done"});
}

module.exports = {
    PostPreferenceOrder
}