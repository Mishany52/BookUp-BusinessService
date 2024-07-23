import { Transport } from '@nestjs/microservices';

export const config = {
    db: {
        entities: [`${__dirname}/../../entity/**/*.{js,ts}`],
    },
    jwtAccessSecrete: process.env.JWT_SECRET,
    jwtRefreshSecrete: process.env.JWT_REFRESH_SECRET,
    jwtRefreshExpires: process.env.JWT_REFRESH_EXPIRES,
    jwtAccessExpires: process.env.JWT_ACCESS_EXPIRES,

    accountService: {
        options: {
            port: process.env.ACCOUNT_SERVICE_PORT,
            host: process.env.ACCOUNT_SERVICE_HOST,
        },
        transport: Transport.TCP,
    },
    apiPort: process.env.API_PORT_BUSINESS,
};
