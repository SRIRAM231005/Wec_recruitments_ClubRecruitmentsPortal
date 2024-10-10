const express = require("express");
const {PostPreferenceOrder} = require('../controllers/admin_control');

const adminRouter = express.Router();

adminRouter.route('/details').post(PostPreferenceOrder);

module.exports = adminRouter
