import { Provider } from '@nestjs/common';
import { ClientProxyFactory } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';
import { Providers } from '@/common/constants/providers.constants';

export const ssoServiceProvider: Provider = {
    provide: Providers.SSO,
    useFactory: (config: ConfigService) => {
        const ssoServiceOptions = config.get('ssoServiceOptions');
        return ClientProxyFactory.create(ssoServiceOptions);
    },
    inject: [ConfigService],
};
