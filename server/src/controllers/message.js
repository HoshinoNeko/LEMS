const Message = require("../model/message.js")

const addMessage = (req, res) => {
    let direction;
    let flag;
    if (req.decoded.role === 0) {
        direction = 0
        flag = 0
    } else {
        direction = 1
        flag = 1
    }
    Message.addMessage(req.body.rid, req.decoded.id, direction, req.body.content, (err, callback) => {
        if (err) {
            return res.status(200).send({
                status: 1,
                message: "系统发生错误"
            })
        } else {

            return res.status(200).send({
                status: 0,
                message: "信息追加成功"
            })
        }
    })
}

const getMessage = (req, res) => {
    let direction;
    Message.getMessage(req.body.rid, (err, callback) => {
        if (err) {
            return res.status(200).send({
                status:1,
                message: "系统错误"
            })
        } else {
            res.status(200).send({
                status: 0,
                data: callback
            })
        }
    })
}

module.exports = {
    addMessage,
    getMessage
}
