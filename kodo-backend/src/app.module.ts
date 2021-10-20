import { CacheModule, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeORMConfig } from './config/typeorm.config';
import { AppController } from './controllers/app.controller';
import { HomeController } from './controllers/home.controller';
import { FeedRepository } from './repository/feed.repository';
import { AppService } from './services/app.service';
import { HomeService } from './services/home.service';
import { ScheduleModule } from '@nestjs/schedule';
import { SchedulerService } from './services/scheduler.service';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeORMConfig),
    TypeOrmModule.forFeature([
      FeedRepository
    ]),
    CacheModule.register({ ttl: 5, max: 10, }),
    ScheduleModule.forRoot()
  ],
  controllers: [
    AppController,
    HomeController
  ],
  providers: [
    AppService,
    HomeService,
    SchedulerService
  ],
  exports: [TypeOrmModule]
})
export class AppModule { }
