import { Transport } from '@nestjs/microservices';

export interface IDevelopConfig {
    db: {
        type: string;
        synchronize: boolean;
        logging: boolean;
        host: string;
        port: string;
        username: string;
        password: string;
        database: string;
        autoLoadEntities: boolean;
    };
}

export interface ICommonConfig {
    jwtRefreshSecrete: string;
    jwtRefreshExpires: string;
    jwtAccessSecrete: string;
    jwtAccessExpires: string;
    ssoServiceOptions: {
        options: {
            port: string;
            host: string;
        };
        transport: Transport;
    };
    apiPort: number;
    apiName: string;
    frontendBusinessUrl: string;
}

export interface IConfig extends ICommonConfig, IDevelopConfig {}
