import express, {Request, Response, NextFunction} from 'express';

// @ts-ignore
import dotenv from 'dotenv';
await dotenv.config();

console.log("env configure");

import { EntityManager, MikroORM } from '@mikro-orm/core';
import * as http from 'http';
import bodyParser from 'body-parser';
import initDb from './ormConfig.js';
import { RequestContext } from '@mikro-orm/core';
import Router from './router.js';



export interface Context {
    server: http.Server,
    orm: MikroORM,
    em: EntityManager
}


const app = express();


export const init = (async () => {
    const server = http.createServer(app)

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true}));

    const orm = await initDb();

    console.log("Waiting for Db connection...");

    await orm.connect();

    let dbConnected = await orm.isConnected();
    if(!dbConnected){
        console.log(process.env.DB_HOST);
        throw Error("Failed to connect database");
    }

    console.log("Database connected");

    let context: Context = {
        server: server,
        orm: orm,
        em: orm.em
    }

    app.use((req: Request, res: Response, next: NextFunction) => {
        RequestContext.create(orm.em, next);
    });

    app.use('/', Router(context));

    const port = process.env.PORT || 3000;

    server.listen(port, () => {
        console.log('Server Running...');
        console.log(`Listening on port ${port}`);
    });
})();

