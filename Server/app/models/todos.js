router.get('/user/:id', function(req, res, next){
	logger.log('Get user “ + req.params.id, “verbose”');

	res.status(200).json({id: req.params.id}); 
});
