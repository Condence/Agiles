const jwt = require("jsonwebtoken"); 
const config = require("../config"); 
 
exports.generateToken = function(user,rol,email, usuario_id){
    return jwt.sign({_id:user, rol:rol, correo: email, usuario_id}, config.auth.secret,{expiresIn: "20m" });
}
 
exports.validateToken = async function(token) { 
    global.respuesta = await jwt.verify(token, config.auth.secret); 
    return respuesta; 
}