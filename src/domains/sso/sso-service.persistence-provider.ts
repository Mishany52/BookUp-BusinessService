import { Provider } from '@nestjs/common';
import { ClientProxyFactory } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';
export const ssoServiceProvider: Provider = {
    provide: 'SSO_SERVICE',
    useFactory: (config: ConfigService) => {
        const ssoServiceOptions = config.get('ssoService');
        return ClientProxyFactory.create(ssoServiceOptions);
    },
    inject: [ConfigService],
};
