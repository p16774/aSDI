function (doc) {
	
	// NAME 
	emit(doc._id, {
	
		"name":doc._id,
		"race":doc.race,
		"class":doc.class,
		"age":doc.age,
		"gender":doc.gen,
		"desc":doc.desc,
		"rev":doc._rev
		
	});

};