import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { SSOLogger } from './infrastructure/logger/logger';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
    const logger = new SSOLogger();
    const app = await NestFactory.create(AppModule, { cors: true });
    const configService = app.get(ConfigService);
    const PORT = configService.get('apiPort') || 3000;

    app.use(cookieParser());
    app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }));

    app.enableCors({
        origin: `${configService.get('frontUri')}:${configService.get('frontPort')}`,
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
        credentials: true,
    });
    
    const config = new DocumentBuilder()
        .setTitle('Business')
        .setDescription('The Business Api')
        .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);

    await app.listen(PORT);
    logger.verbose(`Business service start on port: ${PORT}`);
}

bootstrap();
