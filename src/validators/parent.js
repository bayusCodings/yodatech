import validate from 'validate.js';

let validators = {};

validators.idExist = async function(value, options, key, attributes){
  if(typeof value === 'undefined') return;
	const movieService = options.movieService;
  let result = await movieService.getMoviebyId(value);
	let res;
	if(!result) res = options.message || "^movieId is non-existent";
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
      const list = []
      const errorList = []
      Object.entries(errors).forEach(element => {
        const [key, value] = element;
        list.push(...value);
      });

      list.forEach(element => {
        errorList.push({
          status: "400",
          title: 'validation error',
          detail: element,
          source: "/comment"
        });
      });

      if(errors instanceof Error) next(errorList);
      else{
        if(!res.headersSent) {
          res.status(400).json({
            success: false, 
            errors: errorList
          })
        }
      }
    })
}

export default { 
  validators,
  resolveValidation 
};