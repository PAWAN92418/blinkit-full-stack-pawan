import productModel from "../models/product.model.js";
import subcategoryModel from "../models/subcategory.model.js";
import categoryModel from "../models/category.model.js";
import mongoose from "mongoose";

export async function createProductController(req, res) {
    try {
        const {
            name,
            image,
            category,
            subCategory,
            unit,
            stock,
            price,
            discount,
            description,
            more_details } = req.body;


        if (!name || !category || !subCategory || !unit || !stock || !price || !image[0] || !description) {
            return res.status(400).json({ message: "All required fields must be filled", error: true, success: false });
        }
        // ✅ Create a new product instance
        const newProduct = new productModel({
            name,
            image,
            category,
            subCategory,
            unit,
            stock,
            price,
            discount,
            description,
            more_details
        });

        // ✅ Save the product
        const saveProduct = await newProduct.save();


        return res.json({
            message: 'Product Created Successfully',
            data: saveProduct,
            error: false,
            success: true
        })
    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        });
    }
}

export async function GetProducts(req, res) {
    try {
        // Fetch all products, populating category and subcategory details
        try {
            const products = await productModel.find().sort({ createdAt: -1 }).populate('category')
            res.json({ success: true, products });
        } catch (error) {
            res.status(500).json({ success: false, message: 'Failed to fetch products', error });
        }
    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        });
    }
}

export async function getProductsBySubcategory(req, res) {
    try {
        const { id } = req.body;

        if (!id) {
            return res.json.status(400)({
                message: 'Provide categroy',
                success: false,
                error: true
            })
        }

        // Fetch products where the subCategory array contains the given subcategoryId
        const products = await productModel.find({
            category: { $in: id }
        }).limit(15)

        return res.json({
            message: 'category Product list',
            data: products,
            error: false,
            success: true
        })

    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        });
    }
}


export async function getProductByCategoryAndSubCategory(req, res) {
    try {
        const { categoryId, subCategoryId, page, limit } = req.body

        if (!categoryId || !subCategoryId) {
            return res.status(400).json({
                message: 'provide categoryId and SubCategoryId',
                error: true,
                success: false
            })
        }

        if (!page) {
            page = 1
        }

        if (!limit) {
            limit = 10
        }

        const query = {
            category: { $in: categoryId },
            subCategory: { $in: subCategoryId }
        }

        const skip = (page - 1) * limit


        const [data, dataCount] = await Promise.all([
            productModel.find(query).sort({ createdAt: -1 }).skip(skip).limit(limit),
            productModel.countDocuments(query)
        ])

        return res.json({
            message: 'Product list',
            data: data,
            totalCount: dataCount,
            page: page,
            limit: limit,
            error: false,
            success: true
        })
    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        });
    }
}

export async function getProductDetails(req, res) {
    try {
        const { ProductId } = req.body

        const product = await productModel.findOne({ _id: ProductId })

        return res.json({
            message:'product details',
            data:product,
            error:false,
            success:true
        })

    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        });
    }
}

export async function searchProduct(req, res) {
    try {
        let { search, page, limit } = req.body;

        page = parseInt(page) || 1;
        limit = parseInt(limit) || 10;
        const skip = (page - 1) * limit;

        const query = search ? { $text: { $search: search } } : {};

        const [data, totalCount] = await Promise.all([
            productModel.find(query)
                .skip(skip)
                .limit(limit)
                .sort({ createdAt: -1 })
                .populate('category subCategory'),
            productModel.countDocuments(query)
        ]);

        return res.status(200).json({
            message: 'product data',
            success: true,
            error: false,
            data: data,
            totalCount: totalCount,
            page: page,
            totalPages: Math.ceil(totalCount / limit)
        });

    } catch (error) {
        console.error("🔥 searchProduct error:", error);
        return res.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        });
    }
}















export async function ShowProductWithCategory(req, res) {
    try {
        // Fetch all categories with their respective products
        const categories = await categoryModel.find().lean();

        // Fetch all products with populated category and subcategory details
        const products = await productModel
            .find()
            .populate("category", "name") // Populate category name
            .populate("subCategory", "name") // Populate subcategory name
            .lean();

        // Structure the response by grouping products under their respective categories
        const categoryWithProducts = categories.map((category) => ({
            category: category.name,
            products: products.filter((product) =>
                product.category.some((cat) => cat._id.equals(category._id))
            ),
        }));

        res.status(200).json({ success: true, data: categoryWithProducts });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}


// **API Route to Fetch Product Details by ID**
export async function ProductById(req, res) {
    try {
        const product = await productModel.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }
        res.json({ success: true, data: product });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server Error", error: error.message });
    }
}