const express = require('express');
const app = express();
const port = 3000;

const mockUser = [
    { id: 1, name: "Phuoc", add: "TB" },
    { id: 2, name: "Loc", add: "HN" },
    { id: 3, name: "Nhi", add: "QN" }
];

app.get('/api/user', (req, res) => {
    res.send(mockUser);
});

app.get('/api/user/:id', (req, res) => {
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
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})