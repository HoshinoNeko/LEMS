const schedule = require('../model/schedule.js');
const instrument = require('../model/instrument.js');
const log = require('loglevel')

const createRent = (req, res) => {
    if ( req.body.duration > 14 ) {
        return res.status(200).send({status: 1, message: "借用时间不能超过两周"})
    }
    schedule.getUserRent(req.body.id, (err, callback) => {
        if (err) {
            log.debug("查询用户借用信息数目失败"+err)
            return res.status(500).send({status: 1, message: "查询用户设备数失败"})
        } else {
            log.debug("用户当前已借设备数: " + callback[0].nums)
            if ( callback[0].nums > 0) {
                return res.status(200).send({status: 1, message: "你不能同时借超过一台设备"})
            } else {
                schedule.newSchedule(req.body.id, req.body.iid, req.body.duration, req.body.remark, (err, callback) => {
                    if (err) {
                        return res.status(500).send({status: 1, message: err});
                    } else {
                        return res.status(200).send({
                            status: 0,
                            message: "借用成功，祝你使用开心 :)"
                        });
                    }
                });
            }
        }
    })
}

module.exports = {
    createRent
}
