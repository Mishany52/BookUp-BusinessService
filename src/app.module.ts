import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';
import { HttpModule } from '@nestjs/axios';
import { BusinessController } from './api/http/controllers/business.controller';
import { configuration } from './config/configuration';
import { ClientProxyFactory } from '@nestjs/microservices';
import { BusinessModule } from './domains/business/business.module';
import { OwnerModule } from './domains/interface/owner/owner.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            load: [configuration],
            envFilePath: '/.example.env',
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
    ],
    controllers: [BusinessController],
    providers: [
        {
            provide: 'ACCOUNT_SERVICE',
            useFactory: (config: ConfigService) => {
                const accountServiceOptions = config.get('accountService');
                return ClientProxyFactory.create(accountServiceOptions);
            },
            inject: [ConfigService],
        },
    ],
})
export class AppModule {}
