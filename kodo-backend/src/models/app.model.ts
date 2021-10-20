import { IsEnum, IsOptional } from "class-validator";

export class IResponse<T> {
    type: ResponseType;
    title?: string;
    message?: string;
    total_pages?: number;
    current_page?: number;
    total_records?: number;
    data?: T;

    constructor() {
        this.type = this.title = this.message = this.data = null;
    }
}

export enum ResponseType {
    SUCCESS = 'SUCCESS',
    FAILURE = 'FAILURE',
    ERROR = 'ERROR'
}

enum SORT {
    ASC = 'ASC',
    DESC = 'DESC'
}

export class FiltersDTO {

    @IsOptional()
    count: string = '6';

    @IsOptional()
    page: string = '1';

    @IsOptional()
    @IsEnum(SORT)
    readonly sort_by: SORT;

    @IsOptional()
    readonly sort: string;

    @IsOptional()
    readonly search: string;

    get item_count(): number { return this.count ? Number(this.count) : 6; }

    get item_page(): number { return this.page ? Number(this.page) : 1; }
}