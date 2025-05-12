type Listagem<T> = {
  currentPage: number;
  resultsPerPage: number;
  totalRows: number;
  rows: T[];
}