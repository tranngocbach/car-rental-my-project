const { check } = require ('express-validator');

let validateRegister = [
    check("mail", "Invalid email").isEmail().trim(),

    check("pass", "Invalid password. Password must be at least 2 chars long")
    .isLength({ min: 2 }),

    check("con_pass", "Password confirmation does not match password")
    .custom((value, { req }) => {
        return value === req.body.pass
    })
];

module.exports = {
    validateRegister: validateRegister,
};