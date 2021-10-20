import { CacheInterceptor, Controller, Get, HttpCode, HttpStatus, Logger, OnModuleInit, Query, UseInterceptors, ValidationPipe } from '@nestjs/common';
import { FiltersDTO } from 'src/models/app.model';
import { HomeService } from 'src/services/home.service';

const logger = new Logger('HomeController');

@Controller('home')
@UseInterceptors(CacheInterceptor)
export class HomeController implements OnModuleInit {

    constructor(private readonly homeService: HomeService) {

    }

    @Get()
    @HttpCode(HttpStatus.OK)
    getHomeFeed(@Query(ValidationPipe) filtersDTO: FiltersDTO) {
        return this.homeService.getHomeFeed(filtersDTO);
    }

    async onModuleInit(): Promise<void> {
        const response = await this.homeService.insertMockData();
        logger.log(`Mock Data inserted..`);
    }

}
