import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { APILogger } from './infrastructure/logger/logger';
import { ValidationPipe } from '@nestjs/common';
import { TypedConfigService } from './config/typed-config.service';
import { middleware } from './app.midleware';

async function bootstrap() {
    const logger = new APILogger();
    const app = await NestFactory.create(AppModule);
    const configService = app.get(TypedConfigService);
    const PORT = configService.get('apiPort') || 3000;
    app.useGlobalPipes(
        new ValidationPipe({
            transform: true,
            whitelist: true,
            transformOptions: { enableImplicitConversion: true },
            forbidNonWhitelisted: true,
        }),
    );
    app.enableCors({
        origin: `${configService.get('frontendBusinessUrl')}`,
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
        credentials: true,
    });
    middleware(app);

    const config = new DocumentBuilder()
        .setTitle('Business')
        .setDescription('The Business Api')
        .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);

    await app.listen(PORT);
    logger.verbose(`${configService.get('apiName')} service start on port: ${PORT}`);
}

bootstrap();
