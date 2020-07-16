"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Communicator = void 0;
const ServerConfig = __importStar(require("../conf/server.config"));
class Communicator {
    constructor() {
        this.themistoConfig = ServerConfig.ServerConfig.themisto;
        this.themistoURL = `${this.themistoConfig.protocol}://${this.themistoConfig.url}:${this.themistoConfig.port}/${this.themistoConfig.uriBase}`;
    }
    sendCommunication(data) {
        fetch(this.themistoURL, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: { 'Content-Type': 'application/json' }
        }).then(res => {
            res.json();
        }).catch(err => {
            console.log(err.message);
        });
    }
}
exports.Communicator = Communicator;
