import { Module } from '@nestjs/common';
import { OwnerRepositoryModule } from '@/infrastructure/repository/owner/owner-repository.module';
import { OwnerService } from './owner.service';
import { OwnerController } from '@/api/http/controllers/owner.controller';
import { ClientProxyFactory } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';

@Module({
    imports: [OwnerRepositoryModule],
    controllers: [OwnerController],
    providers: [
        OwnerService,
        {
            provide: 'ACCOUNT_SERVICE',
            useFactory: (config: ConfigService) => {
                const accountServiceOptions = config.get('accountService');
                return ClientProxyFactory.create(accountServiceOptions);
            },
            inject: [ConfigService],
        },
    ],
    exports: [OwnerService],
})
export class OwnerModule {}
