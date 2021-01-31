// DONOR EDITING

// when user clicks donor (focus)
$(document).on("focus", "td.donor", function() {
	// check if this section is already listed in the donor changes table
	var changedSections = $("#donorchanges td.section_name").map(function() {
		return $(this).text();
	}).get();
	var thisSection = $(this).siblings(".sectionname_name").text();
	var fromDonor = $(this).text();
	
	if(!changedSections.includes(thisSection)) {
		// if it isn't add, add a new row for the section, with the current donor in the "from" column
		$("#donorchanges").append($("<tr />")
			.append($("<td />")
				.text(thisSection)
				.addClass("section_name"))
			.append($("<td />")
				.text(fromDonor)
				.addClass("fromdonor")
				.addClass(convert_donor_to_class(fromDonor))
			)
			.append($("<td />")
				.addClass("todonor")
			)
		)
	}
});

// as the user types
$(document).on("input", ".donor", function() {
	// update the class of the donor elementFromPoint
	$(this).removeClass()
		.addClass("donor")
		.addClass(convert_donor_to_class($(this).text()));
});

// when the user clicks out of donor (blur)
$(document).on("blur", ".donor", function() {
	// get the new donor
	var newDonor = $(this).text();
	
	// get the old donor
	var thisSection = $(this).siblings(".sectionname_name").text();
	var tableRow = $("#donorchanges tr")
			.filter(function() {
				return $(this).children(".section_name").text() == thisSection
			})
	var oldDonor = tableRow.children(".fromdonor").text();
	
	// compare the new to the old
	if(newDonor === oldDonor) {
		// if they're the same, delete the row from the table, and remove the "changeddonor" class
		tableRow.remove();
		$(this).removeClass("changeddonor");
	}
	else {
		// if they're different, add the "changeddonor" class, and update the "to" column in the table
		tableRow.children(".todonor")
			.text(newDonor)
			.addClass(convert_donor_to_class(newDonor));
		$(this).addClass("changeddonor");
	}
	
	// deselect any sections that have accidentally been selected
	$(".selectedSection").removeClass("selectedSection");
});

// POSITION EDITING

// when user clicks donor (focus)
$(document).on("focus", "#teamlist .pos", function() {
	// check if this ins is already listed in the position changes table
	var changedIns = $("#poschanges td.ins").map(function() {
		return $(this).text();
	}).get();
	var thisIns = $(this).siblings(".ins").text();
	var fromPos = $(this).text();
	
	if(!changedIns.includes(thisIns)) {
		// if it isn't add, add a new row for the Ins, with the current pos in the "from" column
		$("#poschanges").append($("<tr />")
			.append($("<td />")
				.text(thisIns)
				.addClass("ins"))
			.append($("<td />")
				.text(fromPos)
				.addClass("frompos")
				.addClass(convert_pos_to_class(fromPos))
			)
			.append($("<td />")
				.addClass("topos")
			)
			.append($("<td />")
				.addClass("reason")
				.attr("contenteditable", "true")
			)
		)
	}
});

// as the user types
$(document).on("input", "#teamlist .pos", function() {
	// update the class of the pos element
	$(this).removeClass()
		.addClass("pos")
		.addClass(convert_pos_to_class($(this).text()));
});

// when the user clicks out of donor (blur)
$(document).on("blur", "#teamlist .pos", function() {
	// get the new pos
	var newPos = $(this).text();
	
	// get the old pos
	var thisIns = $(this).siblings(".ins").text();
	var tableRow = $("#poschanges tr")
			.filter(function() {
				return $(this).children(".ins").text() == thisIns;
			})
	var originalPos = tableRow.children(".frompos").text();
	
	// compare the new to the old
	if(newPos === originalPos) {
		// if they're the same, delete the row from the table, and remove the "changedpos" class
		tableRow.remove();
		$(this).removeClass("changedpos");
	}
	else {
		// if they're different, add the "changedpos" class, and update the "to" column in the table
		tableRow.children(".topos")
			.text(newPos)
			.addClass(convert_pos_to_class(newPos));
		$(this).addClass("changedpos");
	}
	
	// sort the section by position
	$(this).closest(".childgrid").each(sort_team_list_tables);
});