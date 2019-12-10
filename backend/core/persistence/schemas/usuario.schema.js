const mongoose = require("mongoose");
const Schema = mongoose.Schema; 
//const generosEnum = require("../enums/generosEnum");
const ObjectId = mongoose.Types.ObjectId;
const uniqueValidator = require('mongoose-unique-validator');
 
 
const UsuarioSchema = new Schema({
    usuario_id:{type:Number, required:true},
    nombres:{type:String, required:true},
    apellidos:{type:String, required:true},
    password:{type:String, required:true},
    correo:{type:String, required:true},    
    activo:{type: Boolean, default:true},
    rol:{type: String},
    asistencias: [
        {
            hora: { type: Date }
        }
    ]
}, { timestamps: true });  


UsuarioSchema.plugin(uniqueValidator, { message: 'ya se encuentra registrado' });
module.exports = mongoose.model("Usuario", UsuarioSchema, "usuario");