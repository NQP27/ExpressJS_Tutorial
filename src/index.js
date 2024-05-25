const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

const mockUser = [
    { id: 1, name: "Phuoc", add: "TB" },
    { id: 2, name: "Loc", add: "HN" },
    { id: 3, name: "Nhi", add: "QN" },
    { id: 4, name: "Ngan", add: "TB" },
    { id: 5, name: "Ha", add: "HP" },
    { id: 6, name: "Nam", add: "HY" },
];

app.get('/api/users/', (req, res) => {
    console.log(req.query);
    const {
        query: { filter, value }
    } = req;
    if (!filter && !value) { return res.send(mockUser); }
    if (filter && value) {
        return res.send(mockUser.filter((user) => user[filter].includes(value)))
            // return res.send(mockUser.filter((user) => user.name.includes(value)))
    }
});

app.get('/api/users/:id', (req, res) => {
    console.log(req.params);
    const parsedId = parseInt(req.params.id);
    if (isNaN(parsedId)) {
        return res.status(400).send({
            msg: "Bad Request."
        });
    }
    const findUser = mockUser.find((user) => user.id === parsedId);
    if (!findUser) {
        return res.sendStatus(404);
    }
    return res.send(findUser);
});

app.post('/api/users', (req, res) => {
    console.log(req.body);
    const { body } = req;
    const newUser = { id: mockUser[mockUser.length - 1].id + 1, ...body }
    mockUser.push(newUser);;
    return res.status(201).send(newUser);
});

app.put('/api/users/:id', (req, res) => {
    const { body, params: { id } } = req;
    const parsedId = parseInt(id);
    if (isNaN(parsedId)) {
        return res.sendStatus(400);
    }
    const findUserIndex = mockUser.findIndex((user) => user.id === parsedId);
    if (findUserIndex === -1) { return res.sendStatus(404); }
    mockUser[findUserIndex] = { id: parsedId, ...body };
    res.sendStatus(200);


});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})