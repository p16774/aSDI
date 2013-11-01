// JavaScript Document

/*

*********************
Author: Nathan Wharry
Title: Project 1 - Video Games Wishlist - Javascript
Term: aSDI 1311
*********************

*/

// content for the add games page
$('#games').on('pageshow', function() {
	
	// insert form building or form editing elements here	
});

<<<<<<< HEAD
// content for the readings page
$('#readings').on('pageshow', function() {
	
	// add event listener to the submit button
	$('#addReading').on('click', function() {
											
		// create random number for unique id in local storage
		var id = Math.floor(Math.random()*10000000),
			item = new Array;
							
		// gather our form fields and save our data
		var item				= {};
			item.readDate		= ["Date", $("#readDate").val()];
			item.readType		= ["Type", $("#readType").val()];
			item.readOther		= ["Other", $("#readOther").val()];
			item.readTime		= ["Time", $("#readTime").val()];
			item.readMeter		= ["Reading", $("#readMeter").val()];
			item.readNotes		= ["Notes", $("#readNotes").val()];
				
			// variablize our stringify
			var itemData = JSON.stringify(item);
									
			// save our data into local storage
			localStorage.setItem(id, itemData);
			
			// output for testing purposes
			//console.log(item);
		
			// alert the success
			alert("Reading Entered Successfully!");
			window.location="#readings";
			
	});
	
	// clear the display div before populating new content
	$("#hidden").empty();
	
	// pull data for display
	for(var i=0, j=localStorage.length; i<j; i++) {
		
		// set variables
		var key = localStorage.key(i),
			value = localStorage.getItem(key),
			obj = JSON.parse(value);
			
			// create our unordered list
			$("#hidden").append("<ul id='"+key+"'></ul>");
			
			for (var n in obj) {
				
				// add our display items
				$("#"+key).append("<li>"+obj[n][0]+": "+obj[n][1]+"</li>");
				
			};
			
			// add our edit/delete links
			$("#"+key).append("<li><a href='#' key='"+key+"' id='a"+key+"'>Edit Reading</a></li>");
			$("#a"+key).on("click", editItem);
			$("#"+key).append("<li><a href='#' key='"+key+"' id='d"+key+"'>Delete Reading</a></li>");
			$("#d"+key).on("click", delItem);
				
			
			//console.log(key);
			//console.log(value);
			//console.log(obj);
			
	};
		
		
		
	function editItem() {
		
		var value = localStorage.getItem(this.key);
			item = JSON.parse(value);
			
			console.log("Key: " + this.key);			
			console.log("Item: " + item);
			console.log("Date: " + item.readDate);
			
			// set values for editing
			$("#readDate").val(item.readDate);
			$("#readType").val(item.readType);
			$("#readOther").val(item.readOther);
			$("#readTime").val(item.readTime);
			$("#readMeter").val(item.readMeter);
			$("#readNotes").val(item.readNotes);
			
	};
	
	function delItem() {
		
		alert("made it to the delete section!");
		
	};
		
	
	
=======
// content for the wishlist page
$('#games').on('pageshow', function() {
	
	// insert display elements here	
>>>>>>> master
});
