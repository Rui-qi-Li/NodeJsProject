module.exports = function(req,res,next){
	var start = +new Date();
	var stream = process.stdout;//standard output
	var url = req.url;
	var method = req.method;

	res.on('finish',function(){
		var dur = +new Date() - start;
		var mes = method + ' to ' +url+' took '+dur +' ms';
		stream.write(mes);
	});

	next();//move req to the next middleware, must be
};