const ProductModel=require('../models/productModels');

//Get Product API- /api/v1/products

exports.getProducts = async (req, res, next) => {
    const keyword = req.query.keyword ? {
        name: {
            $regex: req.query.keyword,
            $options: 'i'
        }
    } : {}


    const products = await ProductModel.find(keyword);
    
    res.json({
        success: true,
        products
    })
}

//Get Single Product API- /api/v1/product/:id
exports.getSingleProduct=async(req,res,next)=>{
    try{
        const product= await ProductModel.findById(req.params.id);
    res.json({
        success:true,
        product
    })
    }
    catch(error) {
        res.json({
        success:false,
        message:error.message
      })
    }
}