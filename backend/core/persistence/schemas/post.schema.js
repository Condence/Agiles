const mongoose = require("mongoose");
const Schema = mongoose.Schema; 
//const generosEnum = require("../enums/generosEnum");
const ObjectId = mongoose.Types.ObjectId;
const uniqueValidator = require('mongoose-unique-validator');

const PostSchema = new Schema({
    activo:{type: Boolean, default:true},
    content:{type:String, required:true, maxlenght:150}, 
    public:{type: Boolean, default:true},
    postedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuario'
    },
    comentarios: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comentario'
    }],
    tags: [String]
}, { timestamps: true });  

module.exports = mongoose.model("Posts", PostSchema, "posts");

