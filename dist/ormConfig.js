import { MikroORM } from "@mikro-orm/mysql";
import mikroOrmConfig from './mikro-orm.config.js';
const initDb = async () => {
    const dbConfig = {
        host: process.env.DB_HOST ?? 'localhost',
        port: process.env.DB_PORT ? Number(process.env.DB_PORT) : 3306,
        user: process.env.DB_USER ?? 'root',
        password: process.env.DB_PASSWORD ?? 'password',
        dbName: process.env.DB_NAME ?? 'example_db'
    };
    const orm = await MikroORM.init(mikroOrmConfig(dbConfig));
    return orm;
};
export default initDb;
//# sourceMappingURL=ormConfig.js.map