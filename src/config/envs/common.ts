import { Transport } from '@nestjs/microservices';

export const config = {
    db: {
        entities: [`${__dirname}/../../entity/**/*.{js,ts}`],
    },
    jwtAccessSecrete: process.env.JWT_ACCESS_SECRET,
    jwtRefreshSecrete: process.env.JWT_REFRESH_SECRET,
    jwtRefreshExpires: process.env.JWT_REFRESH_EXPIRES,
    jwtAccessExpires: process.env.JWT_ACCESS_EXPIRES,

    ssoServiceOptions: {
        options: {
            port: process.env.SSO_SERVICE_PORT,
            host: process.env.SSO_SERVICE_HOST,
        },
        transport: Transport.TCP,
    },
    apiPort: process.env.API_PORT_BUSINESS,
    frontUri: process.env.FRONT_URI,
    frontPort: process.env.FRONT_PORT,
};
