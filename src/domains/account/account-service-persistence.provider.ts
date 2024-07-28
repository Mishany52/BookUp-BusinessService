import { Provider } from '@nestjs/common';
import { ClientProxyFactory } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';
export const accountServiceProvider: Provider = {
    provide: 'ssoService',
    useFactory: (config: ConfigService) => {
        const accountServiceOptions = config.get('ssoService');
        return ClientProxyFactory.create(accountServiceOptions);
    },
    inject: [ConfigService],
};
