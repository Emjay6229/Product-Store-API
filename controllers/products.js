// import Product model
const Product = require("../models/product");

// Filtering
const getAllProducts = async (req, res) => {
// destructure all possible relevant query properties
// prevents query bugs in the case of wrong/non-existent properties
    let { 
        name, 
        featured, 
        company, 
        id, 
        sort, 
        select,
        limit,
        page,
        numericFilters
    } = req.query;

// create another query object containing ONLY relevant query properties 
    let queryObj = {};

// check if each query property is present in the req.query and populate queryObj based on that.
// This ensures that queryObj contains ONLY properties present in req.query.
    if(featured) {
        queryObj.featured = featured;
    }
    if(name) {
        queryObj.name = { $regex: name, $options: "i"};
    }
    if(company) {
        queryObj.company = company;
    }
    if(id) {
        queryObj._id = id; 
    }

//Numeric filtering
// map mongoose numeric filter operators to normal comparison operators
if(numericFilters) {
    const operatorMap = {
        ">":"$gt",
        ">=":"$gte",
        "=":"$eq",
        "<":"$lt",
        "<=":"$lte"
    }

    const regEx = /\b(<|>|<=|=|>=)\b/g;
    let filters = numericFilters.replace( regEx, (match) => {
        `-${operatorMap[match]}-`
    } )

    const options = ["price", "rating"];
    filters = filters.split(",").forEach((item) => {
        const [field, operator, value] = item.split("-")
        if(options.includes(field)) {
            queryObj[field] = { [operator]: Number(value) }
        }
    })

    console.log(filters);
}

// remove the await to prevent find from returning final result.
let result = Product.find(queryObj);

// Sorting
// we don't want to chain everything at once because we want to sort or select conditionally

// if there is a sort field, chain sort() to the .find() result;
    if (sort){
        sortList = sort.split(",").join(" ");
        result = result.sort(sortList)
    } else {
        result = result.sort("createdAt")
    }

// Selecting
// if there is a "select" field, chain .select() to the .find() result;
    if(select) {
       selectList = select.split(",").join(" ");
        result = result.select( selectList )
    }

    // pagination
    if(limit) {
        limit = Number(limit)
        result = result.limit(limit)
    } else {
        result = result.limit(10);
    }

    if(page) {
        skip = Number((page - 1 ) * limit);
        result = result.skip(skip)
    } else {
        result = result.skip(0);
    } 

    const products = await result;
        
    res.status(200).json({
        products, 
        nbOfhits: products.length
    });
}

module.exports = { getAllProducts }