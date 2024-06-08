const express = require("express");
const router = express.Router();



router.get('/api/products/', (req, res) => {

    console.log(req.headers.cookie); //String
    console.log(req.cookies); // Parsed
    if (req.cookies.cookie && req.cookies.cookie === "value") {
        return res.send({ "id": 1, "name": "Dell Laptop", "cost": 2400 });
    } else { return res.send({ msg: "Sorry. You need cookie" }) }
});



module.exports = router;