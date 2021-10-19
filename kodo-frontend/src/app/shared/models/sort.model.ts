export interface Base { label: string, value: string };
export interface SortOptions { sort_by: SortBy | null, sort: string | null };

export enum SortBy {
    ASC = "ASC",
    DESC = "DESC"
}