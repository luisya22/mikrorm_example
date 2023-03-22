import { ReflectMetadataProvider, Options, Utils } from "@mikro-orm/core"


console.log(process.env.DB_HOST);

const options: Options =  {
    type: 'mysql',
    host: process.env.DB_HOST??"localhost",
    port: process.env.DB_PORT ? Number(process.env.DB_PORT) : 3306,
    user: process.env.DB_USER??"root",
    password: process.env.DB_PASSWORD??"password",
    dbName: process.env.DB_NAME ?? "example_db" ,
    entities: ['./dist/src/entities'],
    entitiesTs: ['./src/entities'],
    metadataProvider: ReflectMetadataProvider,
    migrations: {
        path: Utils.detectTsNode() ? 'src/migrations' : 'dist/migrations'
    }
};

export const config = (): Options => {
    return {
        type: 'mysql',
        host: process.env.DB_HOST??"localhost",
        port: process.env.DB_PORT ? Number(process.env.DB_PORT) : 3306,
        user: process.env.DB_USER??"root",
        password: process.env.DB_PASSWORD??"password",
        dbName: process.env.DB_NAME ?? "example_db" ,
        entities: ['./dist/src/entities'],
        entitiesTs: ['./src/entities'],
        metadataProvider: ReflectMetadataProvider,
        migrations: {
            path: Utils.detectTsNode() ? 'src/migrations' : 'dist/src/migrations'
        }
    }
}



export default options;
