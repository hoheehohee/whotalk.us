"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.log = undefined;
exports.emit = emit;
exports.createAction = createAction;
exports.tryParseJSON = tryParseJSON;
exports.generateUID = generateUID;

var _packetTypes = require("./packetTypes");

// log the packet
const log = exports.log = packet => {
    console.log("[SOCKET] " + packet);
};

// emits data to specific connection
function emit(connection, data) {
    connection.write(JSON.stringify(data));
}

// creates action object
function createAction(type, payload) {
    return {
        type,
        payload
    };
}

// parse JSON from a string, return false when error
function tryParseJSON(jsonString) {
    try {
        var o = JSON.parse(jsonString);

        // Handle non-exception-throwing cases:
        // Neither JSON.parse(false) or JSON.parse(1234) throw errors, hence the type-checking,
        // but... JSON.parse(null) returns null, and typeof null === "object",
        // so we must check for that, too. Thankfully, null is falsey, so this suffices:
        if (o && typeof o === "object") {
            return o;
        }
    } catch (e) {}

    return false;
};

function generateUID() {
    return new Date().valueOf().toString(36) + ("000" + (Math.random() * Math.pow(36, 3) << 0).toString(36)).slice(-3);
}