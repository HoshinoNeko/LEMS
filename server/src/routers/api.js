const router = require('express').Router();
const user = require('./user')
const instrument = require('./instrument')
const jwt = require("jsonwebtoken");
const fs = require('fs');
const path = require("path");
const config = JSON.parse(fs.readFileSync(path.join(__dirname, "./../config/config.json"), 'utf8'));



router.use(
    (req, res, next) => {
        let token = req.body.token || req.query.token || req.headers.token || req.headers.authorization;
        console.log(token)
        if ( req.path === "/user/login" || req.path === "/user/signup" || req.path === "/instrument" ) {
            next();
        } else {
            if (token) {
                if (token.startsWith("Bearer ")) {
                    token = token.slice(7, token.length);
                }
                jwt.verify(token, config.system.secret, (err, decoded) => {
                    if (err) {
                        res.json({
                            code: -1,
                            msg: 'token验证失败'
                        })
                    } else {
                        req.decoded = decoded;
                        console.log(decoded)
                        next();
                    }
                })
            } else {
                res.json({
                    code: -1,
                    msg: 'token不存在'
                })
            }
        }
    }
)
router.use('/user', user)
router.use('/instrument', instrument)
module.exports = router
