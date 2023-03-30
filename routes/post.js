const router = require('express').Router();
const verify = require('../routes/verifyToken');

router.get('/', verify, function (req, res) {
    res.json({
        post: {
            title: "Posting",
            description: "Nothing"
        },
    })
})


module.exports = router;