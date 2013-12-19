function (doc) {
	
	/* NAME 
	emit(doc.char_name[1], {
	
		"name":doc.char_name[1],
		"race":doc.char_race[1],
		"class":doc.char_class[1],
		"gender":doc.char_gen[1]
	});
	*/
	
	emit(doc.char_gen[1], {
	
		"name":doc.char_name[1],
		"race":doc.char_race[1],
		"class":doc.char_class[1],
		"gender":doc.char_gen[1]
	});

};