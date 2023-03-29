//moduler 
var mysql = require('mysql');
const { validationResult } = require("express-validator");
const registerService = require('../services/registerService')
const bcrypt = require('bcryptjs')
const connectDB = require('../database/connect')

//authentication check
exports.authentication = (req, res, next) => {

   if (req.session.mail != undefined) {
      next();
   }
   else {
      res.render('user/home', { user: "" });
   }
}

// show the home page
exports.getHome = (req, res, next) => {

   if (req.session.mail != undefined) {
      return res.render('user/home', { user: req.session.mail });
   }
   else {
      return res.render('user/home', { user: "" });
   }
}

//show the login page
exports.getLogin = (req, res, next) => {
   res.render('user/loginAccount', { user: "", msg: [], err: [] });
}

//post page of login
exports.postLogin = (req, res, next) => {



   data = "SELECT * " +
      "FROM  user " +
      "WHERE email = " + mysql.escape(req.body.mail);


   connectDB.query(data, async (err, result) => {
      if (err) throw err; // show if any error have
      else {
         if (result.length) {
            const validPassword = await bcrypt.compare(req.body.pass, result[0].password);
            if (validPassword) {
               req.session.mail = result[0].email;
               res.render('user/home', { user: result[0].email });
            }
            else {
               res.render('user/loginAccount', { user: result[0].email, msg: [], err: ["Please Check Your Password again"] });
            }
         }
         else {
            res.render('user/loginAccount', { user: "", msg: [], err: ["Please Check Your Email again"] });
         }

      }
   })

}


// show create account page
// exports.getCreateAccount = (req, res, next) => {
//    res.render('user/createAccount', { user: "", msg: [], err: [] })
// }

//get data from user for create account
// exports.postCreateAccount = (req, res, next) => {

//    var connectDB = mysql.createConnection({
//       host: "localhost",
//       user: "customer",
//       password: "password1234",
//       database: "car"
//    });

//    var p1 = req.body.pass;
//    var p2 = req.body.con_pass;

//    if (p1 != p2) { // if password doesn't match 
//       return res.render("user/createAccount", { user: "", msg: [], err: ["Password Doesn't Match"] })
//    }

//    var data = "INSERT INTO user " +
//       " VALUES ( '" + req.body.name + "' ,'" + req.body.mail + "','" + req.body.phone + "','" + p1 + "')";

//    connectDB.query(data, (err, result) => {
//       if (err) throw err;// if db has error, show that 
//       else {
//          res.render('user/loginAccount', { user: "", msg: ["Account Create Successfuly"], err: [] }); //show login page
//       }
//    })
// }

exports.getCreateAccount = (req, res, next) => {
   res.render('user/createAccount', {
      errors: req.flash("errors")
   })
}

exports.postCreateAccount = async (req, res) => {
   //validate all required fields
   let errorsArr = [];
   let validationErrors = validationResult(req);
   if (!validationErrors.isEmpty()) {
      let errors = Object.values(validationErrors.mapped());
      errors.forEach((item) => {
         errorsArr.push(item.msg);
      });
      req.flash("errors", errorsArr);
      return res.redirect("/createAccount");
      //     return res.render("user/createAccount" ,{
      //       errors: req.flash("errors")
      //   })
   }

   // create new user
   try {
      let newUser = {
         name: req.body.name,
         mail: req.body.mail,
         pass: req.body.pass,
         phone: req.body.phone
      };
      await registerService.createNewUser(newUser);
      //return res.redirect("/loginAccount");
      return res.render("user/loginAccount", { user: "", msg: [], err: [] })
   } catch (err) {
      req.flash("errors", err);
      return res.redirect("/createAccount");
      //    return res.render("user/createAccount" ,{
      //       errors: req.flash("errors")
      //   })
   }
};

//get request for category
exports.getCategory = (req, res, next) => {

   res.render('user/category', { user: req.session.mail });
}

//post request of category
exports.postCategory = (req, res, next) => {
   //console.log(req.body);


   data = "SELECT * " +
      " FROM  category " +
      " WHERE name = " + mysql.escape(req.body.cat) +
      " AND type = " + mysql.escape(req.body.type) +
      " AND available > 0";

   connectDB.query(data, (err, result) => {
      if (err) throw err; //show if error found
      else {
         //console.log(result);
         return res.render('user/showCategory', { user: req.session.mail, rooms: result })
      }
   })

}

// get booking data 
exports.postBooking = (req, res, next) => {
   // console.log(req.body);

   res.render('user/bookingConfirm.ejs', { user: req.session.mail, name: req.body.name, type: req.body.type, cost: req.body.cost });
}

//post status request

exports.postStatus = (req, res, next) => {

   //console.log(req.body);

   var date = req.body.date;
   //console.log(date)
   data = "INSERT INTO bookingstatus " +
      " VALUES ('" + req.session.mail + "','" + req.body.name + "','" + req.body.type + "','" + req.body.carWant + "','" + 0 + "','" + date + "')"

   data1 = "SELECT * " +
      " FROM  bookingstatus " +
      " WHERE email = " + mysql.escape(req.session.mail);


      connectDB.query(data, (err, reslt) => {
         if (err) throw err;
         else {
            connectDB.query(data1, (err1, result) => {
               for (i in result) {
                  var a = result[i].date
                  a = a.toString()
                  result[i].date = a.slice(0, 15);
               }
               res.render('user/statusShow', { user: req.session.mail, msg: "Your booking is placed", err: "", data: result });
            })
         }
      })
}


//get status
exports.getShowStatus = (req, res, next) => {



   data = "SELECT * " +
      " FROM  bookingstatus " +
      " WHERE email = " + mysql.escape(req.session.mail);

   connectDB.query(data, (err, result) => {

      if (err) throw err;
      else {
         for (i in result) {
            var a = result[i].date
            a = a.toString()
            result[i].date = a.slice(0, 15);
         }
         if (result.length < 1) {
            res.render('user/statusShow', { user: req.session.mail, msg: "", err: "You dont have any data", data: result });
         }
         else {
            res.render('user/statusShow', { user: req.session.mail, msg: "", err: "", data: result });
         }
      }
   })
}


//delete booking request
exports.deleteBooking = (req, res, next) => {
   //console.log(req.body);


   data = "DELETE FROM bookingstatus " +
      " WHERE email = " + mysql.escape(req.body.mail) +
      " AND type = " + mysql.escape(req.body.type) +
      " AND category = " + mysql.escape(req.body.cat) +
      " AND carWant = " + mysql.escape(req.body.want)

   connectDB.query(data, (err, result) => {
      if (err) throw err;
      else {
         next();
      }
   })

}


//show contact page
exports.getContact = (req, res, next) => {
   if (req.session.mail == undefined) {
      res.render('user/contact', { user: "" });
   }
   else {
      res.render('user/contact', { user: req.session.mail });
   }

}

//logout
exports.logout = (req, res, next) => {
   req.session.destroy();
   res.render('user/home', { user: "" });

}