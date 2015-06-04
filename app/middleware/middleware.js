var middleware = {
  first: function(req,res,next) {
    // console.log('api request incoming');
    next();
  }
}
module.exports = middleware;
