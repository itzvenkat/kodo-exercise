import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import * as config from "config";

const dbConfig = config.has('db') ? config.get('db') : null;

export const typeORMConfig: TypeOrmModuleOptions = {
    type: dbConfig?.type || `sqlite`,
    // host: dbConfig?.host || `127.0.0.1`,
    // port: dbConfig?.port || 3306,
    // username: dbConfig?.username || `root`,
    // password: dbConfig?.password || `Zuper@InternaladmIn`,
    database: dbConfig?.database || `kodo.db`,
    entities: [__dirname + '/../**/*.entity.{js,ts}'],
    synchronize: dbConfig?.synchronize || true,
    maxQueryExecutionTime: 1000,
    logging: dbConfig.logging ? ["query", "error"] : false
};