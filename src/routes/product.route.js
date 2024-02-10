const express = require("express");
const router = express.Router();

const { getProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct } = require("../controllers/product.controller");


const verifyToken = require("../middleware/auth.middleware");
const Upload = require("../config/multer.config");



router.post("/create", verifyToken, Upload.array('files', 10), createProduct);
router.put("/update/:id", verifyToken, Upload.array('files', 10), updateProduct); //TODO
router.get("/products", verifyToken, getProducts);
router.get("/product-details/:id", verifyToken, getProductById);
router.delete("/delete/:id", verifyToken, deleteProduct);


module.exports = router;