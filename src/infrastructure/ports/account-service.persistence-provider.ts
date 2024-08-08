import { AccountServiceAdapter } from '@/domains/adapters/account-service.adapter';
import { Provider } from '@nestjs/common';

export const accountServiceProvider: Provider = {
    provide: 'accountService',
    useClass: AccountServiceAdapter,
};
