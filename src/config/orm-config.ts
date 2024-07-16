/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable filenames/match-exported */
import { DataSource, DataSourceOptions } from 'typeorm';
import * as dotenv from 'dotenv';

import { configuration } from './configuration';
import { resolve } from 'path';
// Определяем путь до файла .env в корне проекта
const envPath = resolve(__dirname, '../.env');
dotenv.config({ path: envPath });
// eslint-disable-next-line @typescript-eslint/naming-convention
const ormconfig = async (): Promise<DataSource> => {
    const config = <{ db: DataSourceOptions }>await configuration();
    return new DataSource({
        ...config.db,
        entities: [`${__dirname}/../**/*.entity/**/*.{js,ts}`],
        migrations: [`${__dirname}/../src/infrastructure/postgres/migration/**/*.{js,ts}`],
    });
};

export default ormconfig();
