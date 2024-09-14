class ApiFeatures {
  constructor(query, queryStr) {
    this.query = query;
    this.queryStr = queryStr;
  }

  search() {
    const keyword = this.queryStr.keyword
      ? {
        name: {
          $regex: this.queryStr.keyword,
          $options: "i",
        },
      }
      : {};

    this.query = this.query.find({ ...keyword });
    return this;
  }

  filter() {
    const queryCopy = { ...this.queryStr };

    const removeFields = ["keyword", "page", "limit"];
    removeFields.forEach((key) => delete queryCopy[key]);

    let queryStr = JSON.stringify(queryCopy);
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, match => `$${match}`);

    const parsedQuery = JSON.parse(queryStr);
    Object.keys(parsedQuery).forEach((key) => {
      const isRangeFilter = /\b(gt|gte|lt|lte)\b/.test(key);
      if (isRangeFilter) {
        const [field, operator] = key.split(/[\[\]]/);
        if (!parsedQuery[field]) parsedQuery[field] = {};
        parsedQuery[field][operator] = parsedQuery[key];
        delete parsedQuery[key];
      }
    });

    this.query = this.query.find(parsedQuery);
    console.log(JSON.stringify(parsedQuery));

    return this;
  }
  
  pagination(resultPerPage) {
    const currentPage = Number(this.queryStr.page) || 1; // 50-10
    const skip = resultPerPage * (currentPage - 1);
    this.query = this.query.limit(resultPerPage).skip(skip);
    return this;
  }



}

module.exports = ApiFeatures;