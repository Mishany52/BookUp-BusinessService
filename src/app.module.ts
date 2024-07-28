import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';
import { HttpModule } from '@nestjs/axios';
import { configuration } from './config/configuration';
import { BusinessModule } from './domains/business/business.module';
import { OwnerModule } from './domains/owner/owner.module';
import { accountServiceProvider } from './domains/account/account-service-persistence.provider';
import { AdministratorModule } from './domains/administrator/administrator.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            load: [configuration],
            isGlobal: true,
        }),
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
