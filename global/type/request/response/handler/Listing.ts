export type ListingResponse<T> = {
  currentPage: number;
  resultsPerPage: number;
  totalRows: number;
  rows: T[];
}