import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';
import { HttpModule } from '@nestjs/axios';
import { BusinessModule } from './domains/business/business.module';
import { OwnerModule } from './domains/owner/owner.module';
import { accountServiceProvider } from './domains/sso/sso-service.persistence-provider';
import { AdministratorModule } from './domains/administrator/administrator.module';
import { TypedConfigModule } from './config/typed-config.module';

@Module({
    imports: [
        TypedConfigModule,
        TypeOrmModule.forRootAsync({
            useFactory: async (config: ConfigService) => ({
                ...config.get<TypeOrmModuleAsyncOptions>('db'),
            }),
            inject: [ConfigService],
        }),
        HttpModule,
        BusinessModule,
        OwnerModule,
        AdministratorModule,
    ],
    controllers: [],
    providers: [accountServiceProvider],
})
export class AppModule {}
