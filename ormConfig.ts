import { MikroORM } from "@mikro-orm/mysql"
import mikroOrmConfig, {config} from './mikro-orm.config.js';



const initDb = async () => {
    console.log("ormConfig", process.env.DB_HOST);
    const orm = await MikroORM.init(config());
    return orm
}

export default initDb;
