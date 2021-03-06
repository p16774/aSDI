// JavaScript Document

/*

*********************
Author: Nathan Wharry
Title: Project 3 - D&D Character Sheet - Browse Javascript
Term: MiU 1308
*********************

*/
	
	// getElementById Function
	function ge(x) {
		
		var myElement = document.getElementById(x);
		return myElement;
		
	};
	
	// pull hash for sort order
	var display = window.location.hash,
		current_path = window.location.pathname.split('/').pop();
						
		
	function showChar(sortArray, pageId) {
		
		var sortData = sortArray,
			pageType = pageId + "Display";
			
						
		// remove all display data divs
		if (document.getElementById('dispData') != null) {
			
			remDiv = document.getElementById('dispData');
			remDiv.parentNode.removeChild(remDiv);
			
		};		
							
			// create our elements that will be used
			var dispDivMain = document.createElement("div"),
				dispPage = ge(pageType);
									
			// set up our main collapsible set div	
			dispDivMain.setAttribute("id", "dispData");
			dispDivMain.setAttribute("data-role", "collapsible-set");
			dispDivMain.setAttribute("data-inset", "false");
			
			// attach main div to our content				
			dispPage.appendChild(dispDivMain);
									
			// Loop through localStorage
			for(var i=0, j=sortData.length; i<j; i++) {
					
				// create our seperate div elements for the characters and header element
				var dispDivInner = document.createElement("div"),
					dispCharHdr = document.createElement("h3");
				
				// set attributes to our new inner div and attach to main div then attach our character header to inner div
				dispDivInner.setAttribute("data-role", "collapsible");
				dispDivMain.appendChild(dispDivInner);
				dispDivInner.appendChild(dispCharHdr);
																
				// extract our data
				var value = sortData[i];
					
										
				// recreate our object from our localStorage data
				var obj = value,
					key = obj.Key; // JSON.parse(value);
				
				
				// create img tag and data and attach to document h3 element
				var charItemHdr = "<img src=\"img/" + obj.Gender + ".png\" />" + obj.Name;
				dispCharHdr.innerHTML = charItemHdr;
								
				// create our inner formatted set list element
				var charItemInnerUL = document.createElement("ul"),
					charItemInnerLI = document.createElement("li"),
					charItemInnerHdr = document.createElement("h4");
					charItemInnerA = document.createElement("a");
					charItemAside = document.createElement("p");
					
				// set up our element attributes
				charItemInnerUL.setAttribute("data-role", "listview");
				charItemInnerUL.setAttribute("data-inset", "true");
				charItemInnerA.setAttribute("href", "#edit");
				charItemAside.setAttribute("class", "ui-li-aside");
				
				// append elements to our InnerDiv
				dispDivInner.appendChild(charItemInnerUL);
				charItemInnerUL.appendChild(charItemInnerLI);
				charItemInnerHdr.innerHTML = obj.Name;
				charItemInnerLI.appendChild(charItemInnerA);
				charItemInnerA.appendChild(charItemInnerHdr);
				charItemInnerA.appendChild(charItemAside);
				charItemAside.innerHTML = "<strong>Click to Edit</strong>";

				// loop through data for proper itemization
				for(var n in obj) {
					
					if ( (n === "Name") || (n === "Status") || (n === "Key") ) {
						
						// do nothing since we don't need these
						
					} else {
												
						// create our paragraphs and attach our elements
						var charItemInnerP = document.createElement("p");
						charItemInnerA.appendChild(charItemInnerP);
						
						// create our actual text
						var optSubText = n + ": " + value[n];
						charItemInnerP.innerHTML = optSubText;
						charItemInnerA.appendChild(charItemInnerP);
						
					}; // end our inner formatted list item
					
				}; // end for in loop
				
				// create our link element for deletion and attach to list item
				var charItemInnerDelA = document.createElement("a");
				charItemInnerDelA.setAttribute("href", "#del");
				charItemInnerDelA.setAttribute("data-icon", "delete");
				charItemInnerLI.appendChild(charItemInnerDelA);
				
				// set our keys and make sure we have our eventListeners
				charItemInnerA.key = key;
				charItemInnerA.addEventListener("click", editItem);
				charItemInnerDelA.key = key;
				charItemInnerDelA.addEventListener("click", delItem);
				
								
			}; // end for loop through localStorage
										
		}; // end function for displaying data
		
			
		
		// create function to insert testing data
		function autoPopulate() {
			
			// Pull JSON data and store it into localStorage from our json.js file
			for (var n in json) {
				
				// create our unique identifier
				var id = Math.floor(Math.random()*10000000);
				
				// store data
				localStorage.setItem(id, JSON.stringify(json[n]));
				
			}; // end for/in loop
			
		}; // end autoPopulate function
	
	function sortBy(sortField, sortReverse, dataType) {
		
		// create sort function to allow any field to be sorted
		var id = function (x) { return dataType ? dataType(x[sortField]) : x[sortField]};
		
		return function (a,b) {

			var A = id(a), B = id(b);
			return ((A < B) ? -1 : (A > B) ? 1 : 0) * [1,-1][+!!sortReverse];
			
		}; // close function that allow multiple sort types
		
	}; // close sortArray function
	
	
	// function for pulling data and turning into sortable array
	function pullLocalStorage (sortField) {
		
		// create our array that we'll store our singlular object
		var sortArray = new Array;
		
		// populate or pull localStorage correctly
		if (localStorage.length === 0) {
			
			alert("No character data to display so I created some for you!");
			
			// create testing data
			autoPopulate();
			
			// refresh page to load data that was just added
			pullLocalStorage(sortField);
			
		} else { 
						
			// loop through our localStorage to restructure our object
			for(var i=0, j=localStorage.length; i<j; i++) {
			
				// extract our data
				var key = localStorage.key(i),
					value = localStorage.getItem(key);
					
				// recreate our object from our localStorage data
				var charInfo = new Object,
					obj = JSON.parse(value);
					
				// make sure we keep our key value for edit function
				charInfo['Key'] = key;
				
				// loop through each object and push it into a singular array
				for (var n in obj) {
					
					// create object
					charInfo[obj[n][0]] = obj[n][1];	
					
				}; // close object creation
			
				// push object into our array
				sortArray.push(charInfo);
			
			}; // close loop through localStorage
			
			// run our sort for browsing
			browseType(sortArray, sortField);
						
		}; // close for/else to autopopulate
		
	}; // close pullLocalStorage function
		
			
	// function to sort localStorage by string
	function byText(sortArray, sortField) {
		
		// evaluate the array and sort properly
		return sortArray.sort(sortBy(sortField, false, function(a){return a.toUpperCase()}));				
		
	};
	
	
	// function to sort localStorage by number
	function byNumber(sortArray, sortField) {
		
		// evaluate the array and sort properly
		return sortArray.sort(sortBy(sortField, false, parseInt));				

	}; 
	
	// setup the proper pageinit actions for the sort order
	$('#disp').on('pageinit', function() {
		
		//showChar();
		
	});
	
	
	// browse functions
	function browseType(sortArray, sortField) {
										
		switch(sortField) {
						
			case "#name":
									
				// sort the array by name		
				dispData = byText(sortArray, 'Name');
				showChar(dispData, 'name');
				
				// create our listener event
				var clearChar = ge("charNameClear");
				clearChar.addEventListener("click", deleteChar); // clear ALL local storage data
				
				break;
			
			case "#race":
						
				// sort the array by name		
				dispData = byText(sortArray, 'Race');
				showChar(dispData, 'race');
				
				// create our listener event
				var clearChar = ge("charRaceClear");
				clearChar.addEventListener("click", deleteChar); // clear ALL local storage data
				
				break;
			
			case "#class":
				
				// sort the array by name		
				dispData = byText(sortArray, 'Class');
				showChar(dispData, 'class');
				
				// create our listener event
				var clearChar = ge("charClassClear");
				clearChar.addEventListener("click", deleteChar); // clear ALL local storage data
				
				break;

			case "#gender":
			
				// sort the array by name		
				dispData = byText(sortArray, 'Gender');
				showChar(dispData, 'gen');
				
				// create our listener event
				var clearChar = ge("charGenClear");
				clearChar.addEventListener("click", deleteChar); // clear ALL local storage data
				
				break;
				
			case "#status":
			
				// sort the array by name		
				dispData = byText(sortArray, 'Status');
				showChar(dispData, 'status');
				
				// create our listener event
				var clearChar = ge("charStatusClear");
				clearChar.addEventListener("click", deleteChar); // clear ALL local storage data
				
				break;
				
			default :
			
				// sort the array by name		
				dispData = byText(sortArray, 'Name');
				showChar(dispData);
				
				// create our listener event
				var clearChar = ge("charNameClear");
				clearChar.addEventListener("click", deleteChar); // clear ALL local storage data
				
				break;
			
		}; // end switch display
		
	}; // close browse function
	
		
		// delete selected character from localStorage
		function delItem () {
			
			// get data from local storage with our character information
			var value = localStorage.getItem(this.key);
				item = JSON.parse(value);
										
			// populate our data with the item to be edited
			var charName = item.char_name[1];
			
			// make sure we really want to delete the character
			var ask = confirm("Are you sure you want to delete " + charName + " from the database?");
			
			// check conditional to delete or not delete
			if (ask) {
				
				//remove from local storage
				localStorage.removeItem(this.key);
				alert("Character Removed.");
				window.location.reload();
								
			} else {
				
				//alert that our data has not been deleted
				alert("No characters have been removed!");
				window.location.reload();
				
			};
			
		};
		

	// Clear Data variables and functions **********	
	var deleteChar = function() {
		
			if (localStorage.length === 0) {
				
				alert("No current data to clear.");
				
			} else {
				
				// make sure we really want to delete all data
				var ask = confirm("Are you sure you want to clear the entire character database?");
				
				// check conditional to delete or not delete
				if (ask) {
					
					localStorage.clear();
					alert("Database Cleared! All characters removed.");
					window.location.assign("index.html");
					return false;
					
				} else {
					
					//alert that our data has not been deleted
					alert("Database Saved! No characters removed.");
					window.location.assign("index.html");
					return false;
					
				}; // end confirm if statement
								
			}; // end else statement to check for data
		
		}; // end delete database function
		
		
		// fuction to make it edit our items
		function editItem() {
						
			// reload the additems section of the page
			window.location.assign("#add");
						
			// get data from local storage with our character information
			var value = localStorage.getItem(this.key);
				item = JSON.parse(value);
											
			// turn our toggle controls off to display form
			//toggleControls("off");

			// populate our data with the item to be edited
			$("#char_name").val(item.char_name[1]);
			$("#char_race").val(item.char_race[1]);
						
			var radios = document.forms[0].char_gen;
			
			// loop through to get selected radio button
			for (var i=0; i<radios.length; i++) {
				
				// validate what is checked first
				if(radios[i].value == "Boy" && item.char_gen[1] == "Boy") {
						
					//assign value if checked
					radios[i].setAttribute("checked", "checked");
						
				} else if (radios[i].value == "Girl" && item.char_gen[1] == "Girl") {
					
					//assign value if checked
					radios[i].setAttribute("checked", "checked");
					
				}; // end validation for what is checked
				
			};

			$("#char_class").val(item.char_class[1]);
			$("#char_age").val(item.char_age[1]);
			$("#char_desc").val(item.char_desc[1]);
			
			// refresh our elements
			$('#char_race').selectmenu("refresh");	
			$('#char_class').selectmenu("refresh");			
			
			// change our submit button properties to edit data
			//addChar.removeEventListener("click", valChar);
			ge('charSubmitBtn').value = "Edit Character";
			var editSubmit = ge('charSubmitBtn');
			
			// create new event listener to run a new edit function and save key value for proper character editing
			//editSubmit.addEventListener("click", valChar);
			editSubmit.key = this.key;
			
		};

		
	// pull our localStorage to sort properly
	pullLocalStorage(display);
	

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
