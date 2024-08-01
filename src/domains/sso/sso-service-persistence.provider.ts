import { Provider } from '@nestjs/common';
import { ClientProxyFactory } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';
<<<<<<<< HEAD:src/domains/sso/sso-service-persistence.provider.ts
export const ssoServiceProvider: Provider = {
    provide: 'SSO_SERVICE',
    useFactory: (config: ConfigService) => {
        const ssoServiceOptions = config.get('ssoService');
        return ClientProxyFactory.create(ssoServiceOptions);
========
export const accountServiceProvider: Provider = {
    provide: 'ssoServiceOptions',
    useFactory: (config: ConfigService) => {
        const accountServiceOptions = config.get('ssoServiceOptions');
        return ClientProxyFactory.create(accountServiceOptions);
>>>>>>>> develop:src/domains/sso/sso-service.persistence-provider.ts
    },
    inject: [ConfigService],
};
