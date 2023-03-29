const express = require('express');
const path = require('path');


const router = express.Router();

const adminControler = require('../controllers/admin');


router.route('/')
   .get(adminControler.getLogin) //get request
   .post(adminControler.postLogin) // post request

router.get('/logout',adminControler.logout) //get request   

router.post('/chnagestatus',adminControler.postChangeStatus)// post change status

router.route('/addcar')
      .get(adminControler.getAddCar) // get request for car add page
      .post(adminControler.postAddCar) // post request for car add to db

router.route('/search')
      .get(adminControler.getSearch)   // get request   
      .post(adminControler.postSearch) // post request

router.route('/update')
      .post(adminControler.getUpdate) //get update page for post request
      
router.route('/updateData')
      .post(adminControler.updatePrevData) // update prev data      


module.exports = router;