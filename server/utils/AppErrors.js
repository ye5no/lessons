const errorMessages = {
  200: 'Dates must be YYYY-MM-DD or YYYY-MM-DD, YYYY-MM-DD',
	201: 'Status must be 0 or 1',
	202: 'teacherIds must be like this: 1, 3, 7, 22',
	203: 'studentsCount must be integer or integer,integer',
	204: 'lessonsPerPage must be integer >= 1',
	205: 'page must be integer >= 0',
	300: 'teacherIds error',
	301: 'title error',
	302: 'days error',
	303: 'firstDate error',
	304: 'lastDate or lessonsCount error',
	305: 'no teacher id',
};

function AppError(httpError, appError, errors) {
  this.name = 'ApplicationError';
  this.status = httpError;
  const errorString = (errors) ? errors.join('; ') : '';
  this.message = (errorString)
	  ? `${appError}: ${errorMessages[appError]}. Errors: ${errorString}`
	  :`${appError}: ${errorMessages[appError]}`;
  this.errs = errors;
  this.stack = (new Error()).stack;
}

AppError.prototype = Object.create(Error.prototype);
AppError.prototype.constructor = AppError;

export default AppError;
