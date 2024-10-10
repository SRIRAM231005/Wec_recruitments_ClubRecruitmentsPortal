const express = require("express");
const {GetAnnouncement,GetRegForm,SetStudentData,SetSigPreference} = require('../controllers/announcement_control');
const announcementRouter = express.Router();

announcementRouter.route('/ann').get(GetAnnouncement);
announcementRouter.route('/getreg').get(GetRegForm);
announcementRouter.route('/setdata').patch(SetStudentData);
announcementRouter.route('/sigPref').post(SetSigPreference);

module.exports = announcementRouter