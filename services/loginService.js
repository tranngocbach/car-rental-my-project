const connection = require('../database/connect')
const bcrypt = require('bcryptjs')

let findUserByEmail = (mail) => {
    return new Promise(((resolve, reject) => {
        try {
            connection.query(
                ' SELECT * FROM `user` WHERE `email` = ?  ', mail,
                function (err, rows) {
                    if (err) {
                        reject(err)
                    }
                    let user = rows[0];
                    resolve(user);
                }
            );

        } catch (err) {
            reject(err);
        }
    }))
}

let comparePasswordUser = (user, pass) => {
    return new Promise(async (resolve, reject) => {
        try {
            await bcrypt.compare(pass, user.pass).then((isMatch) => {
                if (isMatch) {
                    resolve(true);
                } else {
                    resolve(`The password that you've entered is incorrect`);
                }
            });
        } catch (e) {
            reject(e);
        }
    });
}

// let findUserById = (id) => {
//     return new Promise((resolve, reject) => {
//         try {
//             connection.query(
//                 ' SELECT * FROM `accountinfo` WHERE `id` = ?  ', id,
//                 function(err, rows) {
//                     if (err) {
//                         reject(err)
//                     }
//                     let user = rows[0];
//                     resolve(user);
//                 }
//             );
//         } catch(e) {
//             reject(e);
//         }
//     })
// }

module.exports = {
    comparePasswordUser: comparePasswordUser,
    findUserByEmail: findUserByEmail,
    // findUserById: findUserById,
}