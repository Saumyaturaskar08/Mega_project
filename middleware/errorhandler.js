export const errorHandler=(err, req, res, next)=> {
   const error = err?.stack;
   const statusCode = err.statusCode?err?.statusCode : 500;
   const message = err?.message;
   res.status(statusCode).json({
    error,
    message
   })
}