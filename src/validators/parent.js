import validate from 'validate.js';

let validators = {};

validators.id_exist = async function(value, options, key, attributes){
  if(typeof value === 'undefined') return;
	const movieService = options.movieService;
  let result = await movieService.getMoviebyId(value);
	let res;
	if(!result) res = options.message || "^non-existent id";
	return res;
}

validate.validators = {
	...validate.validators,
	...validators
};

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

export default { 
  validators,
  resolveValidation 
};