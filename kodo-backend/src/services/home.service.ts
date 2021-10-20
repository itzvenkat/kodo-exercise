import { Injectable } from '@nestjs/common';
import { FiltersDTO } from 'src/models/app.model';
import { FeedRepository } from 'src/repository/feed.repository';
import { Feed } from 'src/models/feed.model';
import * as mock_data from 'src/config/mock_data.json';
import * as dayjs from 'dayjs';

@Injectable()
export class HomeService {

    constructor(private readonly feedRepository: FeedRepository) {

    }

    async getHomeFeed(filtersDTO: FiltersDTO) {
        const response = await this.feedRepository.getHomeFeed(filtersDTO);
        if (response?.data?.length > 0) {
            for (const dt of response.data) {
                dt.dateLastEdited = dt.dateLastEdited ? dayjs(dt.dateLastEdited).format('DD-MMM-YYYY hh:mm:ss a') : null;
            }
        }
        return response;
    }

    async insertMockData() {
        return await this.feedRepository.saveFeed(<Feed[]>mock_data, true);
    }

}
