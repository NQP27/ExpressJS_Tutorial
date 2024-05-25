const express = require('express');
const app = express();
const port = 3000;

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
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})