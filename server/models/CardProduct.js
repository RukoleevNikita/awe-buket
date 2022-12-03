import mongoose from 'mongoose';

const ProductShema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    price: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    previewUrl: {
        type: Array,
        required: true,
    }, 
    mainPhotosUrl: {
        type: Array,
        required: true,
    }, 
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    category: {
        type: String,
        required: true
    },
    viewsCount: {
        type: Number,
        default: 0,
    },
});

export default mongoose.model('CardProduct', ProductShema);