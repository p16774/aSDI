// JavaScript Document

/*

*********************
Author: Nathan Wharry
Title: Project 4 - D&D Character Sheet - Javascript
Term: aSDI - 1312
*********************

*/

// functions used on every page

	// getElementById Function
	function ge(x) {
		
		var myElement = document.getElementById(x);
		return myElement;
		
	};

// functions for the ADD page before it's created (for proper element styles)
$(document).on('pagebeforecreate', "#add", function() {
	
	// Create Select Element for Race Selection
	function selRace() {
		
		// define needed variables		
		var races = ["--Choose A Race--", "Human", "Elf", "Dwarf", "Gnome", "Half-Elf", "Half-Orc", "Halfling"];
		
		// create our select elements/attributes
		$("#select_race").append("<select id='char_race'></select>");
		$("#char_race").attr("name", "char_race");
		$("#char_race").attr("data-native-menu", "false");

		// Loop through races array and make our options
		for(var i=0, j=races.length; i<j; i++) {
			
			// set our option value
			var optText = races[i];
			
			// Create our Option Tags
			$("#char_race").append("<option value='"+optText+"'>"+optText+"</option>");
			
		};	// end for loop to create option elements	
			
	}; // end selRace function
	
	// Create Select Element for Class Selection
	function selClass() {
		
		// define needed variables		
		var classes = ["--Choose A Class--", "Cleric", "Fighter", "Paladin", "Ranger", "Rogue", "Warlock", "Warlord", "Wizard", "------", "Avenger", "Barbarian", "Bard", "Druid", "Invoker", "Shaman", "Sorcerer", "Warden", "------", "Ardent", "Battlemind", "Monk", "Psion", "Runepriest", "Seeker"];
			
			$("#select_class").append("<select id='char_class'></select>");
			$("#char_class").attr("name", "char_class");
			$("#char_class").attr("data-native-menu", "false");

		// Loop through races array and make our options
		for(var i=0, j=classes.length; i<j; i++) {
			
			// set our option value
			var optText = classes[i];
			
			// Create our Option Tags
			$("#char_class").append("<option value='"+optText+"'>"+optText+"</option>");
			
		};	// end for loop to create option elements	
			
	};
	
	// Run needed functions for display
	selRace();
	selClass();	
	
});

$(document).on('pageinit', "#add", function() {
	
	// refresh the elements after creation
	//$('#select_race').selectmenu('refresh');
	//$('#select_class').selectmenu('refresh');
	
	// create form submit link
	$('#charSubmitBtn').on("click", function(e) {
		
		// prevent default click action in the form
		e.preventDefault();
						
		// reset our error messages array
		$('#errors').empty();
		$('#char_name').removeClass("error");
		$('#char_race').removeClass("error");
		$('#char_class').removeClass("error");

		// error messages
		var errMessages = [];
		
		// Name Validation
		if ($('#char_name').val() === "") {
			
			// name error message
			var nameError = "Please enter a character name.";
			$('#char_name').addClass("error");
			errMessages.push(nameError);
			
		};

		// Race Validation
		if ($('#char_race').val() == "--Choose A Race--") {
			
			// race error message
			var raceError = "Please select a valid race.";
			$('#char_race').addClass("error");
			errMessages.push(raceError);
			
		};
		
		// Class Validation
		if ($('#char_class').val() === "--Choose A Class--" || $('#char_class').val() === "------") {
			
			// class error message
			var classError = "Please choose a character class.";
			$('#char_class').addClass("error");
			errMessages.push(classError);
			
		};
				
		// check for errors and display
		if (errMessages.length >= 1) {
						
			// loop through array of error message in case there is more than 1
			for(var i=0, j=errMessages.length; i<j; i++) {
				
				$('#errors').append("<li>"+errMessages[i]+"</li>");
				
			}; // end for loop to display all errors
			
			// stop form from doing anything if we have errors
			return false;
			
		} else {
			
			// alert used for testing
			// alert('form has validated');
			
			// run our store data function if field validate
			storeChar(); 
			
		};
		
		function storeChar() {
								
			// gather our form fields and save our data
			var item = {
				"_id": $("#char_name").val(),
				"race": $("#char_race").val(),
				"class": $("#char_class").val(),
				"age": $("#char_age").val(),
				"gender": $("input:radio[name=char_gen]:checked").val(),
				"description": $("#char_desc").val()
				}
			
			// save our couch document
			$.couch.db("asdproject").saveDoc(item, {
				success: function(data) {
					alert("Character successfully created!");
				},
				error: function(status) {
					alert(status);
				}
			});
			
		}; // close storeChar function
		
	}); // close the click event function
		
	
}); // end the pageinit for the add page

$(document).on('pageinit', "#disp", function() {
	
	$.couch.db("asdproject").view("dndcharsheet/name", {
		
		success: function(data) {
		
			// empty fields
			$('#charData').empty();
		   		
		   	// load our view
	   		$.each(data.rows, function(index, character) {
	   			
	   			var charName = character.value.name;
	   			var charRace = character.value.race;
	   			var charClass = character.value.class;
	   			var charAge = character.value.age;
	   			var charGen = character.value.gender;
	   			var charDesc = character.value.desc;
	   			var rev = character.value.rev;
	   			
	   			$('#charData').append(
	   			
	   				$('<li>').append(
	   					$('<a>')
	   						.attr("href", "edit.html?id="+charName)
	   						.text(charName),
	   					$('<a>')
	   						.attr({
	   							"href": "#del",
	   							"id": charName,
	   							"data-icon": "delete"
	   						})
	   				) // close append li
	   				
	   				
	   				/******************/
	   				
	   				/* display won't refresh - this is pointless
	   				$('<div></div>')
	   					.attr({
	   						"id": charName,
	   						"data-role": "collapsible"
	   					})
	   					.append(
	   						$('<h3></h3>').text(charName),
	   						$('<ul></ul>')
	   							.attr({
	   								"id": "charUL",
	   								"data-role": "listview",
	   								"data-inset": "true"
	   							}) // close .attr for <ul>
	   							.append(
	  								$('<li></li>')
	  									.append(
	  										$('<a></a>')
	  											.attr("href", "#edit")
	  											.append(
	  												$('<h4></h4>').text(charName),
	  												$('<p></p>').text(charRace),
	  												$('<p></p>').text(charClass),
	  												$('<p></p>').text(charAge),
	  												$('<p></p>').text(charGen),
	  												$('<p></p>').text(charDesc),
	  												$('<p></p>')
	  													.attr("class", "ui-li-aside")
	  													.text("<strong>click to edit</strong>")
	  											
	  											), // close append for a
	  										$('<a></a>')
	  											.attr({
	  												"href": "#del",
	  												"data-icon": "delete"
	  												}) // close attr for del a
	  											
	  									) // close append for li
	  											
	  							) // close append for ul	  									
	  									
	  					) // close the main div append */
	   				
	   			) // close our charData append values
	   			
	   		// add out click event for deleting documents
	   		$("#"+charName).on("click", function(e) {
		
				// prevent default click action in the form
				e.preventDefault();
				
				// set our variable for deletion
				var doc = {
					"_id": charName,
					"_rev": rev
				};
				var ask = confirm("Are you sure you want to delete the character " + charName +"?");
				
				// delete our document
				if (ask == true) {
					
					$.couch.db("asdproject").removeDoc(doc, {
						success: function(data) {
							alert("Character has been deleted successfully!");
							window.location.assign("index.html");
							return false;
						},
						error: function(status) {
							alert(status);
						}
					});
					
				} else {
					
					//alert that our data has not been deleted
					alert("Deletion Cancelled. Returning to Homepage.");
					window.location.assign("index.html");
					return false;
					
				};
				
			}); // close our click event on deletion.
	   			
	   		}); // close our view loading
	   		
	   		// refresh for jquery css
	   		$('#charData').listview('refresh');
	   		
	   	} // close our success call
	
	});	// close our couch view call
	
	
}); // close our display page display call

$(document).on('pageinit', "#edit", function() {

	// split url into parts
	var urlData = $(this).data("url");
	var urlParts = urlData.split('?');
	var keyValue = urlParts[1].split('=');
	var key = decodeURIComponent(keyValue[0]);
	var value = decodeURIComponent(keyValue[1]);
	
	$.couch.db("asdproject").openDoc(value, {
		
		success: function(data) {
		
			// empty fields
			$('#editChar').empty();
		   		
		   	// append our data
	   			
	   			$('#editChar').append(
	   			
	   				$('<h4>').text("Name: " + data._id),
	   				$('<p>').html("Race: " + data.race + "</br>Class: " + data.class + "</br>Gender: " + data.gender + "</br>Age: " + data.age + "</br>Desc: " + data.description)
	   				 
	   			)
			
		}
		
	});


});




