import { InternalServerErrorException } from "@nestjs/common";
import { FeedEntity } from "src/entities/feed.entity";
import { FiltersDTO, IResponse, ResponseType } from "src/models/app.model";
import { Feed } from "src/models/feed.model";
import { EntityRepository, Repository, SelectQueryBuilder } from "typeorm";

@EntityRepository(FeedEntity)
export class FeedRepository extends Repository<FeedEntity> {

    async getHomeFeed(filtersDTO: FiltersDTO): Promise<IResponse<FeedEntity[]>> {
        const take = filtersDTO.count ? parseInt(filtersDTO.count) : 6;
        const skip = filtersDTO.page ? ((parseInt(filtersDTO.page) - 1) * take) : 0;

        const query: SelectQueryBuilder<FeedEntity> = this.createQueryBuilder('feed');

        // Search
        if (filtersDTO.search) {
            const _isExactMatch: boolean = (filtersDTO.search.length > 1) && (filtersDTO.search[0] === `"`) && (filtersDTO.search[filtersDTO.search.length - 1] === `"`);
            if (_isExactMatch) {
                const keyword = { keyword: `%${filtersDTO.search.substring(1, filtersDTO.search.length - 1)}%` };
                query.orWhere('feed.name LIKE :keyword', keyword);
                query.orWhere('feed.description LIKE :keyword', keyword);
            } else {
                const getLikeQuery = (search: string, field: 'name' | 'description') => {
                    let likeQuery = '';
                    const words = search?.split(` `);
                    for (const word of words) {
                        likeQuery = (likeQuery == '') ? `${likeQuery} '%${word}%'` : `${likeQuery} OR feed.${field} like '%${word}%'`;
                    }
                    return likeQuery;
                };
                query.orWhere(`feed.name like ${getLikeQuery(filtersDTO.search, 'name')}`);
                query.orWhere(`feed.description like ${getLikeQuery(filtersDTO.search, 'description')}`);
            }
        }

        // Sort
        if (filtersDTO.sort != null && filtersDTO.sort_by != null) {
            query.orderBy(`feed.${filtersDTO.sort}`, filtersDTO.sort_by);
        }

        const totalCount = await query.getCount();

        // Pagination
        if (take != null && skip != null) {
            query.skip(skip).take(take);
        }

        try {
            const result = await query.getMany();
            let response = new IResponse<FeedEntity[]>();
            response.type = ResponseType.SUCCESS;
            response.data = result ? result : [];
            response.total_records = totalCount;
            response.current_page = filtersDTO.page ? parseInt(filtersDTO.page) : 1;
            response.total_pages = Math.ceil(totalCount / take);
            return response;
        } catch (error) {
            throw new InternalServerErrorException({ type: 'ERROR', message: 'Something went wrong', error });
        }

    }

    async saveFeed(feeds: Feed[], truncateBeforeInserting?: boolean): Promise<FeedEntity[]> {
        try {
            if (truncateBeforeInserting) await this.clear();
            const response = await this.save(feeds);
            return response;
        } catch (error) {
            return [];
        }
    }

}
