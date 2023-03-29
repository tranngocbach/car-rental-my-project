const connection = require('../database/connect')
const bcryptjs = require('bcryptjs')
var mysql = require('mysql');


let createNewUser = (user) => {
    return new Promise(async (resolve, reject) => {
        try {
            //check email is exist or not
            let check = await checkEmailUser(user.mail);
            if (check) {
                reject(`This email "${user.mail}" has already exist. Please choose an other mail`);
            } else {
                //hash the user password
                let salt = bcryptjs.genSaltSync(10);
                let data = {
                    name: user.name,
                    mail: user.mail,
                    phone: user.phone,
                    pass: bcryptjs.hashSync(user.pass, salt),
                }
                // connection.query("INSERT INTO user set ?", data, function(error, rows) {
                //     if(error){
                //         reject(error);
                //     }
                //     resolve("Create a new user successfully");
                // })
                var data1 = "INSERT INTO user " +
                    " VALUES ( '" + data.name + "' ,'" + data.mail + "','" + data.phone + "','" + data.pass + "')";

                connection.query(data1, (err, result) => {
                    if (err) reject(err);// if db has error, show that 
                    resolve("Create a new user successfully");
                })
            }
        } catch (e) {
            reject(e);
        }

    });
};

let checkEmailUser = (mail) => {
    return new Promise(((resolve, reject) => {
        try {
            connection.query(
                ' SELECT * FROM `user` WHERE `email` = ?  ', mail,
                function (err, rows) {
                    if (err) {
                        reject(err)
                    }
                    if (rows.length > 0) {
                        resolve(true)
                    } else {
                        resolve(false)
                    }
                }
            );
        } catch (e) {
            reject(e);
        }
    }));
}

module.exports = {
    createNewUser: createNewUser,
}