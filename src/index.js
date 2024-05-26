const express = require('express');
const app = express();
const port = 3000;
const { query, validationResult } = require("express-validator");
const { userValidationSchema } = require('./utils/validationSchema.js');

const mockUser = [
    { id: 1, name: "Phuoc", add: "TB" },
    { id: 2, name: "Loc", add: "HN" },
    { id: 3, name: "Nhi", add: "QN" },
    { id: 4, name: "Ngan", add: "TB" },
    { id: 5, name: "Ha", add: "HP" },
    { id: 6, name: "Nam", add: "HY" },
];

const loggingMiddleWare = (req, res, next) => {
    console.log(`${req.method} - ${req.url}`);
    next();
};

const handleIndexByUserId = (req, res, next) => {
    const { params: { id } } = req;
    const parsedId = parseInt(id);
    if (isNaN(parsedId)) {
        return res.sendStatus(400);
    }
    const findUserIndex = mockUser.findIndex((user) => user.id === parsedId);
    if (findUserIndex === -1) { return res.sendStatus(404); }
    req.findUserIndex = findUserIndex;
    next();
};

app.use(express.json());
// app.use(loggingMiddleWare);

// app.get('/api/users/', (req, res) => {
//     res.send(mockUser);
// });

app.get('/api/users/', [
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

app.get('/api/users/:id', (req, res) => {
    console.log(req.params);
    const { params: { id } } = req;
    const parsedId = parseInt(id);
    if (isNaN(parsedId)) {
        return res.sendStatus(400);
    }
    const findUser = mockUser.find((user) => user.id === parsedId);
    if (findUser === -1) { return res.sendStatus(404); }
    return res.send(findUser);
});


//Thêm 
app.post('/api/users', userValidationSchema, (req, res) => {
    result = validationResult(req);
    console.log(result);
    const { body } = req;
    const newUser = { id: mockUser[mockUser.length - 1].id + 1, ...body }
    if (!result.isEmpty()) {
        return res.send(result);
    } else
        mockUser.push(newUser);
    return res.status(201).send(newUser);
});


//Thay đổi toàn bộ thuộc tính của một bản ghi
app.put('/api/users/:id', handleIndexByUserId, (req, res) => {
    const { body, findUserIndex } = req;
    mockUser[findUserIndex] = { id: mockUser[findUserIndex].id, ...body };
    return res.sendStatus(200);
});


//Thay đổi một số thuộc tính của một bản ghi
app.patch('/api/users/:id', handleIndexByUserId, (req, res) => {
    const { body, findUserIndex } = req;
    mockUser[findUserIndex] = {...mockUser[findUserIndex], ...body };
    return res.sendStatus(200);
});


//Xóa
app.delete('/api/users/:id', handleIndexByUserId, (req, res) => {
    const { findUserIndex } = req;
    mockUser.splice(findUserIndex, 1);
    return res.sendStatus(200);
});


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})