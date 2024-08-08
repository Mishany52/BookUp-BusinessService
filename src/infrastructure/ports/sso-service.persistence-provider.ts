import { Provider } from '@nestjs/common';
import { ClientProxyFactory } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';
export const ssoServiceProvider: Provider = {
    provide: 'ssoServiceOptions',
    useFactory: (config: ConfigService) => {
        const accountServiceOptions = config.get('ssoServiceOptions');
        return ClientProxyFactory.create(accountServiceOptions);
    },
    inject: [ConfigService],
};
