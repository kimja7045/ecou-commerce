export const getOrderBy = (orderBy?: string) => {
  let result = undefined;

  if (!orderBy) {
    return result;
  }

  if (orderBy === 'latest') {
    result = { orderBy: { createdAt: 'desc' } };
  } else if (orderBy === 'expensive') {
    result = { orderBy: { price: 'desc' } };
  } else if (orderBy === 'cheap') {
    result = { orderBy: { price: 'asc' } };
  }

  return result;
};
