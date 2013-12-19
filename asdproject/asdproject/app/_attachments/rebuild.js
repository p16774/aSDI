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
$('#add').on('pagebeforecreate', function() {
	
	// Create Select Element for Race Selection
	function selRace() {
		
		// define needed variables		
		var races = ["--Choose A Race--", "Human", "Elf", "Dwarf", "Gnomes", "Half-Elf", "Half-Orc", "Halfling"];
		
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

$('#add').on('pageinit', function() {
	
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
			storeChar(this.key); // this.key used for edit function
			
		};
		
		function storeChar(key) {
					
			// pull in our argument for editing characters
			if (!key) {
							
				// create random number for unique id in local storage
				var id = Math.floor(Math.random()*10000000);
				var edit = false;
				
			} else {
				
				// use previous key to update character
				var id = key;
				var edit = true;
				
			};
								
			// gather our form fields and save our data
			var item				= {};
				item.char_name		= ["Name", $("#char_name").val()];
				item.char_race		= ["Race", $("#char_race").val()];
				item.char_gen		= ["Gender", $("input:radio[name=char_gen]:checked").val()];
				item.char_class		= ["Class", $("#char_class").val()];
				item.char_age		= ["Age", $("#char_age").val()];
				item.char_desc		= ["Description", $("#char_desc").val()];
												
				// variablize our stringify
				var itemData = JSON.stringify(item);
										
			// save our data into local storage
			localStorage.setItem(id, itemData);
			
			// validation to change the alert message
			if (edit === true) {
				
				alert("Character Updated Successfully!");
				
			} else {
				
				alert("New Character Created and Saved Successfully!");
				
			}; // close if statement for proper alert message
			
		}; // close storeChar function
		
	}); // close the click event function
		
	
}); // end the pageinit for the add page

$(document).on('pageinit', "#news", function() {
	
	$.couch.db("asdproject").view("dndcharsheet/name", {
		
		success: function(data) {
		
			// empty fields
			$('#newsData').empty();
		   		
		   	// load our view
	   		$.each(data.rows, function(index, character) {
	   			
	   			var charName = character.value.name;
	   			var charRace = character.value.race;
	   			var charClass = character.value.class;
	   			var charGen = character.value.gender
	   			
	   			$('#newsData').append(
	   				$('<li>').text(charName)
	   			);
	   		}); // close our view loading
	   		
	   		// refresh for jquery css
	   		$('#newsData').listview('refresh');
	   		
	   	} // close our success call
	
	});	// close our couch view call
	
}); // close our news page display call
