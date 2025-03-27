export const paginationSolver = (page: number = 1, limit: number = 10) => {
  const validatedPage = Math.max(1, page);
  const validatedLimit = Math.max(1, limit);
  const skip = (validatedPage - 1) * validatedLimit;
  return {
    skip,
    page: validatedPage,
    limit: validatedLimit,
  };
};

export const paginationGenerator = (
  totalCount: number = 0,
  page: number = 1,
  limit: number = 10
) => {
  const pageCount = limit > 0 ? Math.ceil(totalCount / limit) : 1;
  return {
    page,
    pageCount,
    totalCount,
    countPerPage: limit,
  };
};
