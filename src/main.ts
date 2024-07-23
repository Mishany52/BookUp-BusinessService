import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { SSOLogger } from './infrastructure/logger/logger';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
    const logger = new SSOLogger();
    const app = await NestFactory.create(AppModule);
    const configService = app.get(ConfigService);
    app.useGlobalPipes(
        new ValidationPipe({ transform: true, whitelist: true, forbidNonWhitelisted: true }),
    );
    app.enableCors({
        origin: `${configService.get('frontUri')}:${configService.get('frontPort')}`,
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
        credentials: true,
    });
    const PORT = configService.get('apiPort') || 3000;
    const config = new DocumentBuilder()
        .setTitle('Parts Lib')
        .setDescription('The Parts library')
        // .setVersion('1.0')
        .addTag('Parts')
        .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);

    await app.listen(PORT);
    logger.verbose(`Parts service start on port: ${PORT}`);
}

bootstrap();
