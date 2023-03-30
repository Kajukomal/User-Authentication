const router = require('express').Router();
const verify = require('../routes/verifyToken');

router.get('/', verify, function (req, res) {
    res.json({
        post: {
            title: "Post sent ",
            description: "This content is accessible only on login and successfull authentication"
        },
    })
})


module.exports = router;