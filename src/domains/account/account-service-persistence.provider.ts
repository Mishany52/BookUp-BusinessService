import { Provider } from '@nestjs/common';
import { ClientProxyFactory } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';
export const accountServiceProvider: Provider = {
    provide: 'ACCOUNT_SERVICE',
    useFactory: (config: ConfigService) => {
        const accountServiceOptions = config.get('accountService');
        return ClientProxyFactory.create(accountServiceOptions);
    },
    inject: [ConfigService],
};
