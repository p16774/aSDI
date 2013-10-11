// JavaScript Document

/*

*********************
Author: Nathan Wharry
Title: Project 2 - Blood Glucose Reporting Tool - Javascript
Term: aSDI 1310
*********************

*/

// Run content on page load only
$('#addButton').on('click', function() {
	
	window.location='#readings'; // redirect page to the add a reading page
	
});

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
			console.log(item);
		
			// alert the success
			alert("Reading Entered Successfully!");
			window.location="#readings";
			
	});
	
});

// content for the trendss page
