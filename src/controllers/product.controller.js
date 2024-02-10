
const productModel = require("../models/product.model");
const { v4: uuidv4 } = require('uuid')

const PORT = process.env.HTTP_HOST || 8090;
const HOST_NAME = process.env.HOST_NAME || 8090;


const createProduct = async (req, res) => {
    const { name, specialFeature, brand, itemWeight, description, price, productDimensions, material } = req.body
    const productId = uuidv4();
    try {
        const urls = [];
        const files = req.files;
        for (const file of files) {
            const { filename } = file;
            urls.push(`http://${HOST_NAME}:${PORT}/static/profile/${filename}`)
        }

        //creating the product Object
        const product = new productModel({
            productId: productId,
            name: name,
            specialFeature: specialFeature,
            brand: brand,
            itemWeight: itemWeight,
            description: description,
            price: price,
            productDimensions: productDimensions,
            material: material,
            files: urls
        })

        product.save();

        return res.status(201).json({
            status_code: 201,
            success: true,
            message: "Product created sucessfully",
            data: product,
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error
        })
    }

}

const getProducts = async (req, res) => {
    try {
        const products = await productModel.find();
        return res.status(200).json({
            success: true,
            data: products.reverse(),
            ntotalRecords: products.length
        })
    } catch (error) {
        return res.status(500).send({
            success: false,
            message: error.message
        })
    }
}

const getProductById = async (req, res) => {
    const { id } = req.params
    const product = await productModel.find({ productId: id });
    try {
        if (product) {
            return res.status(200).json({
                success: true,
                data: product
            })
        }
    } catch (error) {
        return res.status(500).send({
            success: false,
            message: error.message
        })
    }
}


//TODO

const updateProduct = async (req, res) => {    

    const { id } = req.params
    const product = await productModel.findOne({ productId: id });

    if (req.method !== 'PUT') {
        return res.status(405).json({
            err: `${req.method} method not allowed`
        })
    }

    try {

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "product not found",
            })
        }

        const urls = [];
        const files = req.files;
        for (const file of files) {
            const { filename } = file;
            urls.push(`http://${HOST_NAME}:${PORT}/static/profile/${filename}`)
        }

        product.updateOne(req.body, { useFindAndModify: false }).then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot update product with id=${id}. Maybe product was not found!`
                });
            } else return res.status(201).json({ message: "Product was updated successfully.", data: req.body });
        })

    } catch (error) {
        return res.status(412).send({
            success: false,
            message: error.message
        })
    }
}

//Delete a single product
const deleteProduct = async (req, res) => {
    const { id } = req.params

    try {
        const productRes = await productModel.deleteOne({ productId: id });
        if (!productRes.deletedCount > 0) {
            return res.status(404).send("Product not found");
        }
        return res.status(202).json({
            success: true,
            message: `Product id ${id} has been deleted successfully`
        })

    } catch (error) {
        return res.status(412).send({
            success: false,
            message: error.message
        })
    }

}



module.exports = {
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
}