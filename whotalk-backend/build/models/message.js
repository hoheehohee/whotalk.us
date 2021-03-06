'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const Message = new _mongoose.Schema({
    suID: { type: String, unique: true },
    type: { type: String },
    channel: { type: String },
    anonymous: { type: Boolean },
    username: { type: String },
    message: { type: String },
    date: { type: Date, default: Date.now },
    private: { type: Boolean, default: false },
    target: { type: String, default: false }
});

Message.statics.getRecent = function ({ channel }) {
    return this.find({ channel }).sort({ "suID": -1 }).limit(20).exec();
};

Message.statics.getBefore = function ({ channel, cursorId }) {
    return this.find({ channel, suID: { $lt: cursorId } }).sort({ _id: -1 }).limit(20).exec();
};

Message.statics.getAfter = function ({ channel, cursorId }) {
    return this.find({ channel, suID: { $gt: cursorId } }).sort({ _id: -1 }).limit(20).exec();
};

Message.statics.write = function ({ suID, type, channel, anonymous, username, message = '' }) {
    const msg = new this({
        suID,
        type,
        channel,
        anonymous,
        username,
        message
    });

    return msg.save();
};

exports.default = _mongoose2.default.model('Message', Message);