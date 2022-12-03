import express  from 'express';
import mongoose from 'mongoose';

import adminRoute from './adminPanelRoutes.js'
import CardProductModel from './models/CardProduct.js';
import cors from 'cors';

mongoose
  .connect('mongodb+srv://RukoleevNikita:sfdjsbIqew2134sdnjnHJB@cluster0.rl92n.mongodb.net/awe-buket?retryWrites=true&w=majority')
  .then(() => console.log('DB ok'))
  .catch((err) => console.log('DB error', err));

const app = express();

app.use(express.json());
app.use(cors());
app.use('/admin-panel/uploads', express.static('uploads'));


app.use('/admin-panel', adminRoute);

app.get('/getproduct/:id', async (req, res) => {
  console.log('get: id', req);

  try {
    const productId = req.params.id; 

    CardProductModel.findOneAndUpdate(
      {
        _id: productId,
      }, 
      {
        $inc:{ viewsCount: 1 }
      },
      {
        returnDocument: 'after'
      },
      (err, doc) => {
        if (err) {
          console.error(err);
          return res.status(500).json({
              error: 'Не удалось вернуть товар' 
          });
        }
        if (!doc) return res.status(404).json({
          message: 'Товар не найден'
        });

        res.json(doc);
      }
    );
} catch (err) {
    console.error(err);
    res.status(500).json({
        error: 'Не удалось найти товар' 
    });
}
});

app.get('/getallproducts', async (req, res) => {

  try {
    const products = await CardProductModel.find();

    if (!products.length) return res.status(400).json({
      message: 'Товары не найдены'
    });

    res.status(200).json(products);

  } catch (err) {
    console.error(err);
    res.status(500).json({
        error: 'Не удалось найти товары' 
    });
  }
});

app.listen(4444, (err) => {
  if(err) {
    return console.log(err);
  }
  console.log('server ok');
});

