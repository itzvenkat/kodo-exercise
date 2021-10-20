import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';

const logger = new Logger('SchedulerService');

@Injectable()
export class SchedulerService {

    @Cron(CronExpression.EVERY_10_MINUTES, { name: 'stay_awake' })
    stayAwake() {
        logger.verbose(`Programmer: A machine that turns coffee into code.`);
    }
}
