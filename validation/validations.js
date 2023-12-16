import Joi from 'joi';

const livresSchema = Joi.object({
  titre : Joi.string().min(3).required(),
  annee:Joi.string().regex(/^\d{4}$/).required()
});

export const validateLivres= (req, res, next) => {
  const { error } = livresSchema.validate(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  next();
};

const utilisateursSchema = Joi.object({
    email : Joi.string(),
    motDePasse: Joi.string(),
    role: Joi.string().valid('admin', 'utilisateur')
  });
  
export const validateUtilisateurs= (req, res, next) => {
  const { error } = utilisateursSchema.validate(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  next();
};

