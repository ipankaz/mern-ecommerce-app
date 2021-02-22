const Category = require("../../models/categories");
const Product = require("../../models/product");
const order = require("../../models/order");
const brandPage = require('../../models/page')

function createCategories(categories, parentId = null) {
  const categoryList = [];
  let category;
  if (parentId == null) {
    category = categories.filter((cat) => cat.parentId == undefined);
  } else {
    category = categories.filter((cat) => cat.parentId == parentId);
  }

  for (let cate of category) {
    categoryList.push({
      _id: cate._id,
      name: cate.name,
      slug: cate.slug,
      parentId: cate.parentId,
      type: cate.type,
      children: createCategories(categories, cate._id),
    });
  }

  return categoryList;
}

exports.initialData = async (req, res) => {
  const orders = await order.find({}).populate("items.productId", "name")
  .exec();

  const brandPages = await brandPage.find({}).exec()

  const categories = await Category.find({}).exec();
  //select in mongodb used to select the particular key elements
  // populate is like foreign key . it is used to link Category table with products
  const products = await Product.find({})
    .select("_id name slug price quantity description category productPictures")
    .populate({ path: "category", select: "_id name" })
    .exec();
  res.status(200).json({
    categories: createCategories(categories),
    products,
    orders,
    brandPages
  });
};
