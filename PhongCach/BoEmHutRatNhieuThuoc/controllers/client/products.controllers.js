const Product = require("../../models/product_model");

module.exports.index = async (req, res) => {
    const products = await Product.find({
        status: "active",
        deleted: false,
    })
    .sort({ position: "desc"});

    const newProduct = products.map(item => {
        item.priceNew = (item.price * (100 - item.discountPercentage) / 100).toFixed(0);
        return item;
    });

    console.log(newProduct);

    res.render("client/pages/products/index", {
        pageTitle: "Trang danh sách sản phẩm",
        products: newProduct
    });
}

module.exports.detail = async (req, res) => {
    try {
        const find = {
            deleted: false,
            slug: req.params.slug,
            status: "active"
        };

        const product = await Product.findOne(find);

        res.render("client/pages/products/detail", {
            pageTitle: product.title,
            product: product
        });
    } catch (error) {
        //req.flash("error", "Không tồn tại");
        res.redirect(`/products`);
    }
}