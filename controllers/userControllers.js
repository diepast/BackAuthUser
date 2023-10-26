const Users = require("../models/userModel");

const bycriptjs = require("bcryptjs");

const userControllers = {
  
  SignUp: async (req, res) => {
    const { fullName, email, password, from, aplication } = req.body.userData;
    const contraseñaHash = bycriptjs.hashSync(password, 10);
    try {
      const userExist = await Users.findOne({ email });
      
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
        const nuevoUsuario = new Users({
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

  SignIn: async (req, res) => {
    const {email, password, from} = req.body.userData;
    

    try{
        const usuario= await Users.findOne({email});

        if(!usuario){
          res.json({ 
            success: false,
            from: from,
            message: "Usuario o contraseña incorrectosNo has realizado sign up con este e-mail, realizalo antes de hacer sign In"
          }) 
        }else{
                const contraseñaCoincide = usuario.password.filter(pass =>bycriptjs.compareSync(password, pass));
                const dataUser = {
                id: usuario._id,
                fullName: usuario.fullName,
                email: usuario.email,
                from: from,
              }
              if( from !== 'signUp-form'){
                
                if(contraseñaCoincide.length > 0){
                  res.json({
                    success:true,
                    from:from,
                    response: dataUser,
                    message: "Bienvenido Nuevamente" + usuario.fullName
                  })
                  }else{
                        const contraseñaHash = bycriptjs.hashSync(password, 10);
                        usuario.from.push(from);
                        usuario.password.push(contraseñaHash);
                        
                        await usuario.save();
                        res.json({
                          success:true,
                          from:from,
                          response: {dataUser},
                          message: "No contabas con " +from+ " en tu cuenta, pero ya lo agregamos"
                        })
                }   
              }else{
                    if(contraseñaCoincide.length > 0){
                          res.json({
                          success: true,
                          from:from,
                          response: {dataUser},
                          message: "Bienvenido Nuevamente " + dataUser.fullName
                        })

                    } else{
                        res.json({
                          success: false,
                          from:from,
                          message: "El usuario o la contraseña incorrectos"
                        })
                    }
            }
          }
        }catch(error){
        
        res.json({
          success: false,
          from:from,
          message: "Algo salió mal, intentalo nuevamente en unos minutos",
          response: err 
      });
    }
}
}
module.exports = userControllers;
