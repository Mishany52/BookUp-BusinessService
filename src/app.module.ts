import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';
import { HttpModule } from '@nestjs/axios';
import { BusinessModule } from './domains/business/business.module';
import { OwnerModule } from './domains/owner/owner.module';
import { AdministratorModule } from './domains/administrator/administrator.module';
import { TypedConfigModule } from './config/typed-config.module';
import { ssoServiceProvider } from './domains/sso/sso-service.persistence-provider';

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
    providers: [ssoServiceProvider],
})
export class AppModule {}
