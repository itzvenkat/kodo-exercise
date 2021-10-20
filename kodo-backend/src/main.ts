import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { AppConstants } from './constants/app.constants';
import * as config from "config";
import * as dayjs from "dayjs";
import * as helmet from 'helmet';
import * as rateLimit from 'express-rate-limit';

const logger = new Logger('bootstrap');

const bootstrap = async (): Promise<void> => {
  const PORT = process.env.PORT || config.get(`server.port`) || 3000;
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.setGlobalPrefix('api');
  app.enableCors();
  app.use(helmet());
  app.use(rateLimit({ windowMs: 15 * 60 * 1000, max: 10000 }));
  app.set('trust proxy', 1);
  await app.listen(PORT);
  AppConstants.APPLN_LAST_RUN_TIME = dayjs().format('YYYY-MM-DD hh:mm:ss A');
  logger.verbose(`Environment = ${config.has(`env`) ? config.get(`env`) : process.env.NODE_ENV}`);
  // if (!AppConstants._isProd) logger.verbose(JSON.stringify(config));
  logger.verbose(JSON.stringify(config));
  logger.log(`Application running at port #${PORT}`);
};

bootstrap();