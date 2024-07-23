import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';
import { HttpModule } from '@nestjs/axios';
import { BusinessMicroserviceController } from './api/microservice/controllers/business-microservice.controller';
import { configuration } from './config/configuration';
import { BusinessModule } from './domains/business/business.module';
import { OwnerModule } from './domains/owner/owner.module';
import { ssoServiceProvider } from './domains/account/sso-service-persistence.provider';

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
    ],
    controllers: [BusinessMicroserviceController],
    providers: [ssoServiceProvider],
})
export class AppModule {}
