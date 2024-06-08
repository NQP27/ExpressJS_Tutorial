const express = require('express');
const app = express();
const port = 3000;
const userRouter = require("./routes/user.js");
const productRouter = require("./routes/products.js");
const cookieParser = require('cookie-parser');

app.use(express.json());
app.use(cookieParser());
app.use(userRouter);
app.use(productRouter);


app.get('/', (req, res) => {
    res.cookie("cookie", "value", { maxAge: 10 * 1000 });
    res.status(201).send({ msg: "Set cookie" });
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})