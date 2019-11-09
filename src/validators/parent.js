import validate from 'validate.js';

const resolveValidation = (res, next, body, constraint) => {
  validate.async(body, constraint)
    .then( () => {
      next();
    }, (errors) => {
      if(errors instanceof Error) next(errors);
      else{
        if(!res.headersSent) {
          res.status(400).json({
            status: false, 
            message: 'Validation Error',
            data: errors 
          })
        }
      }
    })
}

export default { resolveValidation };