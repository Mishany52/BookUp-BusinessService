import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';
import { HttpModule } from '@nestjs/axios';
import { BusinessModule } from './domains/business/business.module';
import { OwnerModule } from './domains/owner/owner.module';
import { AdministratorModule } from './domains/administrator/administrator.module';
import { TypedConfigModule } from './config/typed-config.module';
import { ssoServiceProvider } from './infrastructure/ports/sso-service.persistence-provider';
import { AccountModule } from './domains/account/account.module';
import { TagModule } from './domains/tag/tag.module';
import { PointModule } from './domains/point/point.module';

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
        AccountModule,
        TagModule,
        PointModule,
    ],
    providers: [ssoServiceProvider],
})
export class AppModule {}
