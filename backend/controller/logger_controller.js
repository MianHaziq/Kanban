const LogModel = require("../models/logger");


const fetchLog = async (req, res, next) => {
    try {
        const log = await LogModel.find().populate("createdby","Username");

        if (log.length === 0) {
            return res.status(404).json({ message: "No Logs Found" });
        }

        return res.status(200).json({ log, message: "fetchLog Success" });
    } catch (error) {
        next(error);
    }
};



module.exports = { fetchLog };
