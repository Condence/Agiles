const usuarioModel = require("../schemas/usuario.schema");

module.exports.getUsuarios = function(){
    return new Promise((resolve, reject) => {
        usuarioModel.find({}, (error, result)=>{
            if(error){
                reject("Trono: " + error);
            }else{
                resolve(result);
            }
        });
    });
} 
module.exports.getUsuario = function(idUsuario) {
    return new Promise((resolve, reject) => {
        usuarioModel.findById(idUsuario, (error, result)=>{
            if(error){
                reject("Trono: " + error);
            }else{
                resolve(result);
            }
        });
    });
} 
module.exports.postUsuario = function(usuario){ 
    console.log(usuario);
    return new Promise((resolve, reject)=>{ 
        const usuarioAGuardar = new usuarioModel(usuario);
        usuarioModel.findOne({'usuario_id': usuario.usuario_id}, (error, result)=>{
            if(error){ 
                reject("Trono: " + error);
            }else{
                if(result==null){
                    usuarioAGuardar.save((error, result2)=>{
                        if(error){ 
                            reject("Trono: " + error);
                        }else{
                            resolve(result2);
                        }
                    });
                     
                } else {
                    reject("Trono: " + error);
                }
            }
        });
    }); 
} 
module.exports.putUsuario = function(idUsuario, usuario){  
    return new Promise((resolve, reject)=>{ 
        if(idUsuario == respuesta.id){
            usuarioModel.findByIdAndUpdate(idUsuario,{$set: usuario},{new: true}, (error, result)=>{
                if(error){
                    reject("Trono: " + error);
                }else{
                    resolve(result);
                }
            });
        } else { 
            reject("Solo puedes actualizar tu usuario.");
        } 
    });
}
module.exports.deleteUsuario = function(usuario_id) {  
    return new Promise((resolve, reject) => {
        if(idUsuario == respuesta.id){
            usuarioModel.findByIdAndUpdate(usuario_id,{activo: false}, (error, result)=>{ 
                if(error){
                    reject("Trono: " + error);
                }else{
                    resolve(result);
                }
            });
        } else { 
            reject("Solo puedes borrar tu usuario.");
        } 
    });
}  
module.exports.postAsistencia = function(usuario_id){ 
    return new Promise((resolve, reject)=>{ 
        //{$push: {asistencias: Date.now}} 
        usuarioModel.findOneAndUpdate({usuario_id: usuario_id}, {$push: {asistencias: {hora: Date.now()}}}, (error, result)=>{ 
            if(error){
                reject("Trono: " + error);
                console.log(error);
            }else{ 
                resolve(result);
            }
        }); 
    });
}