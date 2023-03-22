import { ReflectMetadataProvider, Utils } from "@mikro-orm/core";
const config = (dbConfig) => {
    return {
        type: 'mysql',
        host: dbConfig.host,
        port: dbConfig.port,
        user: dbConfig.user,
        password: dbConfig.password,
        dbName: dbConfig.dbName,
        entities: ['./dist/src/entities'],
        entitiesTs: ['./src/entities'],
        metadataProvider: ReflectMetadataProvider,
        migrations: {
            path: Utils.detectTsNode() ? 'src/migrations' : 'dist/migrations'
        }
    };
};
export default config;
//# sourceMappingURL=mikro-orm.config.js.map