const mongoose= require('mongoose');

//create schema and models
const cryptoSchema= mongoose.Schema({
    name: String,
    last: Number,
    buy: Number,
    sell: Number,
    volume: Number,
    base_unit: String

});

const Crypto= mongoose.model('Crypto', cryptoSchema);

module.exports= Crypto;