const mongoose = require("mongoose")

const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Product name must be provided"]
    },
    price: {
        type: Number,
        required: [true, "Product price must be provided"]
    },
   featured: {
        type: Boolean,
        default: false
    },
   rating: {
        type: Number,
        default: 1.0
    },
   company: {
        type: String,
        enum: {
            values: ['ikea', 'liddy', 'marcos', 'caressa'],
            message: '{VALUE} is not supported'
        },
    },
},
{ timestamps: true }
)

module.exports = mongoose.model("Product", ProductSchema);