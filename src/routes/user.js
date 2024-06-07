const express = require("express");
const router = express.Router();
const { query, validationResult, matchedData } = require("express-validator");
const { mockUser } = require('../utils/constants.js');
const { userValidationSchema } = require('../utils/validationSchema.js');
const { handleIndexByUserId } = require("../utils/handleIndexByUserId.js");

router.get('/api/users/', [
        query('value')
        .isString().withMessage('Name must be a string!')
        .notEmpty().withMessage('Name must be not empty!')
        .isLength({ min: 3, max: 10 }).withMessage('Name must be between 3-10 charactors')
    ],
    (req, res) => {
        // console.log(req.query);
        result = validationResult(req);
        console.log(result);
        const {
            query: { filter, value }
        } = req;
        if (!filter && !value) { return res.send(mockUser); }
        if (filter && value) {
            if (!result.isEmpty()) { return res.send(result) } else
                return res.send(mockUser.filter((user) => user[filter].includes(value)))
                    // return res.send(mockUser.filter((user) => user.name.includes(value)))
        }
    });


router.get('/api/users/:id', (req, res) => {
    console.log(req.params);
    const { params: { id } } = req;
    const parsedId = parseInt(id);
    console.log(parsedId);
    if (isNaN(parsedId)) {
        return res.sendStatus(400);
    }
    const findUser = mockUser.find((user) => user.id === parsedId);
    console.log(findUser);
    if (!findUser) { return res.status(404).send("Not Found"); }
    return res.send(findUser);
});


// Thêm
router.post('/api/users', userValidationSchema, (req, res) => {
    result = validationResult(req);
    const data = matchedData(req);
    console.log(data);
    const newUser = { id: mockUser[mockUser.length - 1].id + 1, ...data }
    if (!result.isEmpty()) {
        return res.status(400).json({ errors: result.array() });
    } else
        mockUser.push(newUser);
    return res.status(201).send(newUser);
});


//Thay đổi toàn bộ thuộc tính của một bản ghi
router.put('/api/users/:id', handleIndexByUserId, (req, res) => {
    const { body, findUserIndex } = req;
    mockUser[findUserIndex] = { id: mockUser[findUserIndex].id, ...body };
    return res.sendStatus(200);
});

//Thay đổi một số thuộc tính của một bản ghi
router.patch('/api/users/:id', handleIndexByUserId, (req, res) => {
    const { body, findUserIndex } = req;
    mockUser[findUserIndex] = {...mockUser[findUserIndex], ...body };
    return res.sendStatus(200);
});


//Xóa
router.delete('/api/users/:id', handleIndexByUserId, (req, res) => {
    const { findUserIndex } = req;
    mockUser.splice(findUserIndex, 1);
    return res.sendStatus(200);
});

module.exports = router;