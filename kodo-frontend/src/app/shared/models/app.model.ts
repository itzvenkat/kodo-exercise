export interface IResponse<T> {
    type: ResponseType;
    title?: string;
    message?: string;
    total_pages?: number;
    current_page?: number;
    total_records?: number;
    data?: T;
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

export interface FiltersDTO {
    count: string;
    page: string;
    sort_by: SORT;
    sort: string;
    search: string;
}