const { mockUser } = require('../utils/constants.js');


const handleIndexByUserId = (req, res, next) => {
    const { params: { id } } = req;
    const parsedId = parseInt(id);
    if (isNaN(parsedId)) {
        return res.sendStatus(400);
    }
    const findUserIndex = mockUser.findIndex((user) => user.id === parsedId);
    if (findUserIndex === -1) { return res.status(404).send("Not Found"); }
    req.findUserIndex = findUserIndex;
    next();
};

module.exports = { handleIndexByUserId };