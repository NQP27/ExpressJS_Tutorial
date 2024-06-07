const { body } = require("express-validator");


const userValidationSchema = [body('name')
    .isString().withMessage('Name must be a string!')
    .notEmpty().withMessage('Name must be not empty!')
    .isLength({ min: 3, max: 10 }).withMessage('Name must be between 3-10 charactors'),
    body('add').isString().withMessage('Name must be a string!')
];
module.exports = { userValidationSchema };