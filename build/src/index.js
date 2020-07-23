"use strict";
/**
 *   @name index  Entrada al aplicativo
 *   @description  Levanta API (GanyMede). Se configura los middlewares, y las rutas del servicio.
 *   @type API  -> Ganymede
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//Imports 
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const server_config_1 = require("./conf/server.config");
//Routes
const product_route_1 = __importDefault(require("./routes/product.route"));
const input_route_1 = __importDefault(require("./routes/input.route"));
//Initializations
const app = express_1.default();
const PORT = server_config_1.ServerConfig.ganymede.port;
const URI_BASE = server_config_1.ServerConfig.ganymede.uriBase;
const dbData = server_config_1.ServerConfig.dbganymede;
//MiddleWares
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With,Content-Type,Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
    res.header('Allow', 'GET,POST,PUT,DELETE,OPTIONS');
    next();
});
app.use(URI_BASE, [product_route_1.default, input_route_1.default]);
//Server API
app.listen(PORT, () => {
    console.log(`# Server Listen on Port ${PORT}`);
    mongoose_1.default.Promise;
    mongoose_1.default.connect(`${dbData.protocol}://${dbData.url}:${dbData.port}/${dbData.dbname}`, {
        useUnifiedTopology: true,
        useNewUrlParser: true
    }).then((connected) => {
        console.log('# DataBase Server MongoDB running..');
    }).catch(err => {
        console.log(err);
    });
});
