import { SortBy, SortOrder } from "@/domain/types/SearchParams.types";
/**
 * @interface ISearchParams
 * @description Interface for search parameters
 * @property {number} page - Page number
 * @property {number} itemsPerPage - Number of items per page
 * @property {string} searchQuery - Search query
 * @property {number} categoryId - Category id
 * @property {SortBy} sortBy - Sort by
 * @property {SortOrder} sortOrder - Sort order
 */
export default interface ISearchParams {
    page: number;
    itemsPerPage: number;
    searchQuery: string;
    categoryId: number;
    sortBy: SortBy;
    sortOrder: SortOrder;
}