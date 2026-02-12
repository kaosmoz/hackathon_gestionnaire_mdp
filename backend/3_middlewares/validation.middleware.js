import { z } from 'zod' ;

export const validateRegister = (req, res, next) => {

  const schema = z.object({
    email: z.email(),
    password: z.string().min(6)

  }) ;

  try {

    schema.parse(req.body) ;

    /*if (req.body.password !== req.body.confirmPassword) {
      return res
        .status(400)
        .json({ message: `Les mots de passe ne correspondent pas ` });
    } */

    next();

  } catch (e) {
    console.log(e);
    return res.status(400).json({ message: e.errors.map( err => err.message).join(" , ") }) ;
    
  }
} ;

export const validateLogin = (req, res, next) => {

  const schema = z.object({
    email: z.email(),
    password: z.string().min(6)

  }) ;

  try {
    schema.parse(req.body) ;

    next();

  } catch (e) {

    return res
      .status(400)
      .json({ message: e.errors.map((err) => err.message).join(", ") }) ;
  }
} ;



