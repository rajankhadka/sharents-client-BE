import { ConfigService } from '@nestjs/config';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import connection from './src/config/configutaion';

const configService = new ConfigService(connection());
const configuration = configService.get<Record<string, any>>('db.primary');
const ormConfiguration: PostgresConnectionOptions = {
  name: 'default',
  type: 'postgres',
  host: configuration.host,
  port: +configuration.port,
  username: configuration.username,
  password: configuration.password,
  database: configuration.database,
  entities: [__dirname + '/src/**/*.entity{.ts,.js}'],
  migrations:
    process.env.NODE_TYPEORM === 'migration'
      ? [__dirname + '/src/db/migration/*.{ts,js}']
      : [__dirname + '/src/db/seeder/*.{ts,js}'],
  subscribers: [__dirname + '/src/db/subscriber/*.{ts,js}'],
  cli: {
    entitiesDir: 'src/core',
    migrationsDir:
      process.env.NODE_TYPEORM === 'migration'
        ? 'src/db/migration'
        : 'src/db/seeder',
    subscribersDir: 'src/db/subscriber',
  },
};

export default ormConfiguration;
