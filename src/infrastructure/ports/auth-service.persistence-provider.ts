import { AuthServiceAdapter } from '@/domains/adapters/auth-service.adapter';
import { Provider } from '@nestjs/common';

export const authServiceProvider: Provider = {
    provide: 'authService',
    useClass: AuthServiceAdapter,
};
