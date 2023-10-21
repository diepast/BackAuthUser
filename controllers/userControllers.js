const Users = require("../models/userModel");
const User = require("../models/userModel");

const bycriptjs = require("bcryptjs");

const userControllers = {
  
  SignUp: async (req, res) => {
    const { fullName, email, password, from, aplication } = req.body.userData;
    console.log(req.body.userData);
    const contraseñaHash = bycriptjs.hashSync(password, 10);
    try {
      const userExist = await Users.findOne({ email });
      console.log(userExist);
     
      if (userExist) {
        if(userExist.from.indexOf(from) !== -1) {
          res.json({ success: false, from:from, response: "Ya se realizó sign up mediante " +from+ " por favor realiza sign In" });
        }
        else{ 
          userExist.from.push(from);
          userExist.password.push(contraseñaHash);
          await userExist.save();
          res.json({ success: true, from:from, response: "Se agregó " +from+ " a tu cuenta de signIn" })
          
        } 
      } 
      else {
        const nuevoUsuario = new User({
          fullName,
          email,
          password:[contraseñaHash],
          from:[from],
          aplication
        });
        await nuevoUsuario.save();
        res.json({ success: true, from:from, response: "Usuario creado con éxito agregamos " +from+ " a tu cuenta de signIn" });
      }
 
    } catch (error) {
      console.log(error);
      res.json({
        success: false,
        response: "Algo salió mal, intentalo nuevamente en unos minutos",
      });
    }
  },
}
module.exports = userControllers;
