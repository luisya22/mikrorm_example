import express from 'express';
// @ts-ignore
import dotenv from 'dotenv';
import * as http from 'http';
import bodyParser from 'body-parser';
import initDb from './ormConfig.js';
import { RequestContext } from '@mikro-orm/core';
import Router from './router.js';
dotenv.config();
const app = express();
export const init = (async () => {
    const server = http.createServer(app);
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    const orm = await initDb();
    console.log("Waiting for Db connection...");
    await orm.connect();
    let dbConnected = await orm.isConnected();
    if (!dbConnected) {
        throw Error("Failed to connect database");
    }
    console.log("Database connected");
    let context = {
        server: server,
        orm: orm,
        em: orm.em
    };
    app.use((req, res, next) => {
        RequestContext.create(orm.em, next);
    });
    app.use('/', Router(context));
    const port = process.env.PORT || 3000;
    server.listen(port, () => {
        console.log('Server Running...');
        console.log(`Listening on port ${port}`);
    });
})();
//# sourceMappingURL=app.js.map