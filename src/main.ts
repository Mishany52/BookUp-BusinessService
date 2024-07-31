import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { APILogger } from './infrastructure/logger/logger';
import { ValidationPipe } from '@nestjs/common';
import { TypedConfigService } from './config/typed-config.service';

async function bootstrap() {
    const logger = new APILogger();
    const app = await NestFactory.create(AppModule);
    const configService = app.get(TypedConfigService);
    const PORT = configService.get('apiPort') || 3000;
    app.useGlobalPipes(
        new ValidationPipe({ transform: true, whitelist: true, forbidNonWhitelisted: true }),
    );
    app.enableCors({
        origin: `${configService.get('frontendBusinessUrl')}`,
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
        credentials: true,
    });
    const config = new DocumentBuilder()
        .setTitle('Business Service')
        .setDescription('The Business service')
        .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);

    await app.listen(PORT);
    logger.verbose(`${configService.get('apiName')} service start on port: ${PORT}`);
}

bootstrap();
