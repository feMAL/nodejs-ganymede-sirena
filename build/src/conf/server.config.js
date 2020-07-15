"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServerConfig = void 0;
exports.ServerConfig = {
    ganymede: {
        port: 5000 || process.env.PORT,
        uriBase: '/api'
    },
    dbganymede: {
        port: 27017,
        url: 'localhost',
        protocol: 'mongodb',
        dbname: 'sirena'
    }
};
