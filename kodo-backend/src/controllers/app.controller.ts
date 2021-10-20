import { Controller, Get, HttpCode, HttpStatus, Logger } from '@nestjs/common';
import { AppConstants } from 'src/constants/app.constants';
import { ResponseType } from 'src/models/app.model';
import { AppService } from 'src/services/app.service';

const logger = new Logger('AppController');

@Controller()
export class AppController {
  
  constructor(private readonly appService: AppService) { }

  @Get()
  @HttpCode(HttpStatus.OK)
  getHello(): any {
    logger.log(`Last Deployed at ${AppConstants.APPLN_LAST_RUN_TIME}`);
    return {
      type: ResponseType.SUCCESS,
      title: AppConstants.APPLN_NAME,
      version: AppConstants.APPLN_VERSION,
      message: AppConstants.APPLN_STATUS,
      lastDeployedAt: AppConstants.APPLN_LAST_RUN_TIME
    };
  }

}
