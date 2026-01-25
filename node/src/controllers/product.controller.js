import productService from "../services/product.service.js";

// this is used to fetch data with query param (R)

const getProduct = async (req, res) => {
  const data = await productService.getProducts(req.query);

  res.send(data);
};

// This function is used to fetch data from id param(R)

const getProductsById = async (req, res) => {
  try {
    const id = req.params.id;
    const product = await productService.getProductsById(id);

    res.json(product);
  } catch (error) {
    res.status(404).send(" !! Product not found !! ");
  }
};

// this is used to create new product(C)

const createProduct = async (req, res) => {
  try {
   const createdProduct= await productService.createProduct(req.body,req.files);

    res.status(201).send(createdProduct);
  } catch (error) {
    res.status(400).send(error?.message);
  }
};

// This function is used to update product in data base(U)

const updateProduct = async (req, res) => {
  try {
    const updatedProduct = await productService.updateProduct(
      req.params.id,
      req.body
    );
    res.send(updatedProduct);
  } catch (error) {
    res.status(400).send(error);
  }
};

// This function is used to delete product data using id of (D)

const deleteProduct = async (req, res) => {
  try {
    await productService.deleteProduct(req.params.id);
    res.send(`Product deleted sucessfully with id ${req.params.id}`);
  } catch (error) {
    res.status(404).send(error);
  }
};

export default {
  getProduct,
  getProductsById,
  createProduct,
  updateProduct,
  deleteProduct,
};
