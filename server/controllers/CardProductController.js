import CardProductModel from '../models/CardProduct.js';

export const getAllProducts = async (req, res ) => {
    try {
        const products = await CardProductModel.find().populate('user').exec();

        if (!products.length) return res.status(400).json({
            message: 'Товары не найдены'
        });

        res.status(200).json(products);
    } catch (err) {
        console.error(err);
        res.status(500).json({
            error: 'Не удалось получить товары' 
        });
    }
}; 

export const createProduct = async (req, res) => {
    try {
        
        const doc = new CardProductModel({
            name: req.body.name,
            price: req.body.price,
            description: req.body.description,
            previewUrl: req.body.previewUrl.map(el => `http://localhost:4444/admin-panel/${el}`),
            mainPhotosUrl: req.body.mainPhotosUrl.map(el => `http://localhost:4444/admin-panel/${el}`),
            category: req.body.category,
            user: req.userId
        });

        const product = await doc.save();

        res.status(201).json(product);            

    } catch (err) {
        console.error(err);
        res.status(500).json({
            error: 'Не удалось создать карточку товара, попробуйте еще раз' 
        });
    }
};

export const getProduct = async (req, res) => {
    try {
        const productId = req.params.id; 

        const product = await CardProductModel.findById(productId);

        res.status(200).json(product);
    } catch (err) {
        console.error(err);
        res.status(500).json({
            error: 'Не удалось найти товар' 
        });
    }
};

export const update = async (req, res) => {
    

    try {
        const productId = req.params.id; 
        let previewUrl = [];
        let mainPhotosUrl = [];
        req.body.previewUrl.map(el => {
            if (el.indexOf('http') > -1) {
                previewUrl.push(el);
            } else {
                previewUrl.push(`http://localhost:4444/admin-panel/${el}`);
            }
        });

        req.body.mainPhotosUrl.map(el => {
            if (el.indexOf('http') > -1) {
                mainPhotosUrl.push(el);
            } else {
                mainPhotosUrl.push(`http://localhost:4444/admin-panel/${el}`);
            }
        })

        await CardProductModel.updateOne({
            _id: productId
        }, {
                name: req.body.name,
                price: req.body.price,
                description: req.body.description,
                previewUrl,
                mainPhotosUrl,
                category,
                user: req.userId
        });
        res.json({
            succes: true
        })
    } catch (err) {
        console.error(err);
        res.status(500).json({
            error: 'Не удалось обновить товар' 
        });
    }
};

export const remove = async (req, res) => {
    try {
        const productId = req.params.id; 

        CardProductModel.findOneAndDelete({
            _id: productId
        }, (err, doc) => {
            if (err) {
                console.error(err);
                res.status(500).json({
                    error: 'Не удалось удалить товар' 
                });
            }
            if (!doc) {
                console.error(err);
                res.status(404).json({
                    error: 'Не удалось найти товар' 
                });
            }

            res.json({
                succses: true 
            });
        });

        
    } catch (err) {
        console.error(err);
        res.status(500).json({
            error: 'Не удалось найти товар' 
        });
    }
};