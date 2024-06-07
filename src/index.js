const express = require('express');
const app = express();
const port = 3000;
const userRouter = require("./routes/user.js");

app.use(express.json());
app.use(userRouter);


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})