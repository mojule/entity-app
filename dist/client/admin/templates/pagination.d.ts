export declare const createPagination: ({ path, total, start, count }: PaginationModel) => {
    show: HTMLDivElement;
    pagination: HTMLDivElement;
};
export interface PaginationModel {
    path: string;
    total: number;
    start: number;
    count: number;
}
