import Products from "../models/ProductModel.js";

export const addProduct = async (req, res) => {
  try {
    const {
      title,
      description,
      price,
      size,
      categoryProduct,
      materialProduct,
    } = req.body;

    if (!req.files || req.files.length < 1 || req.files.length > 4) {
      return res.status(400).json({ message: "Min 1, Maks 4 Image" });
    }

    const imageUrls = req.files.map((file) => file.path);

    const newProduct = new Products({
      title,
      description,
      price,
      size,
      categoryProduct,
      materialProduct,
      productImage: imageUrls,
    });

    await newProduct.save();
    res
      .status(201)
      .json({ message: "Product Created Successfuly", newProduct });
  } catch (error) {
    res.status(500).json({ message: "Failed to created Product", error });
  }
};

export const getAllProducts = async (req, res) => {
  try {
    const allProducts = await Products.find();
    res.json({ allProducts });
  } catch (error) {
    res.status(500).json({ message: "Failed to get All Products" });
  }
};

export const getProductById = async (req, res) => {
  try {
    const productId = await Products.findById(req.params.id);
    if (!productId)
      return res.status(404).json({ message: "Product not Found" });

    res.json({ productId });
  } catch (error) {
    res.status(500).json({ message: "Failed to get Product by Id", error });
  }
};

export const updatedProduct = async (req, res) => {
  try {
    const {
      title,
      description,
      price,
      size,
      categoryProduct,
      materialProduct,
    } = req.body;

    let imageProduct = [];

    if (Array.isArray(req.files) && req.files.length > 0) {
      imageProduct = req.files.map((file) => file.path);
    }

    const existingProduct = await Products.findById(req.params.id);
    if (!existingProduct) {
      return res.status(404).json({ message: "Product not Found" });
    }

    const updateData = {
      title,
      description,
      price,
      size,
      categoryProduct,
      materialProduct,
      productImage:
        imageProduct.length > 0 ? imageProduct : existingProduct.productImage,
    };

    const updateProduct = await Products.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    res.json({ message: "Product Updated Successfuly", updateProduct });
  } catch (error) {
    res.status(500).json({ message: "Failed to Update Product", error });
  }
};

export const deletedProduct = async (req, res) => {
  try {
    const deleteProduct = await Products.findByIdAndDelete(req.params.id);
    if (!deleteProduct)
      return res.status(404).json({ message: "Product not Found" });

    res.json({ message: "Deleting Product is Successfuly", deleteProduct });
  } catch (error) {
    res.status(500).json({ message: "Failed to Deleting Product" });
  }
};
