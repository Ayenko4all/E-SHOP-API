const paginateDocument = (req: any, model: any) => {
  let page = 1;

  let pagination = req.query.paginate != "true" ? false : true;

  if (req.query.next !== undefined || req.query.prev !== undefined) {
    page = req.query.next.length > 0 ? req.query.next : req.query.prev;
  }

  const myCustomLabels = {
    totalDocs: model + "Count",
    docs: model + "s",
    limit: "perPage",
    page: "currentPage",
    nextPage: "next",
    prevPage: "prev",
    totalPages: "pageCount",
    pagingCounter: "slNo",
    meta: "paginator",
  };

  const options = {
    page: page,
    limit: 1,
    lean: true,
    customLabels: myCustomLabels,
    pagination: pagination,
  };

  return options;
};

const queryDocument = (req: any) => {
  const query = {};

  return query;
};

export { paginateDocument, queryDocument };
