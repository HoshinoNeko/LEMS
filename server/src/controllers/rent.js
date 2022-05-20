const schedule = require('../model/schedule.js');
const instrument = require('../model/instrument.js');

const createRent = (req, res) => {
    schedule.newSchedule(req.body.id, req.body.iid, req.body.duration, req.body.remark, (err, callback) => {
        if (err) {
            res.status(500).send({status: 1, message: JSON.stringify(err)});
        } else {
            res.status(200).send(callback);
        }
    });
}

module.exports = {
    createRent
}
