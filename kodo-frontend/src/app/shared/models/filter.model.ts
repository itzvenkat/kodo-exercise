import { SortBy } from "./sort.model";

export class Filter {
    search: string | null | '' = null;
    sort_by: SortBy | null = null;
    sort: string | null | '' = null;
    page: number = 1;
    count: number = 6;

    constructor() {
        this.search = null;
        this.sort = null;
        this.sort_by = null;
        this.page = 1;
        this.count = 6;
    }
}