// DONOR EDITING

// when user clicks donor (focus)
// use .one() instead of .on() because otherwise use can click multiple times and keep
// subtracting 1 from the donor summary table
// event is rebound on blur (see below)
$(document).one("focus", "td.donor", donor_focus);

function donor_focus() {
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
	
	// subtract 1 from relevant cell of donor summary table
	var secType = extract_section_type(thisSection);
	var secTypeCol = $("#donorcounts td").filter(function() {
			return $(this).text() == secType;
		}).index();
	if(fromDonor == "") {
		fromDonor = "Unallocated";
	}
	var countCell = $("#donorcounts tr").filter(function() {
		return $(this).children().eq(0).text() === fromDonor;
	}).children().eq(secTypeCol);
	countCell.text(parseInt(countCell.text())-1);
};

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
	
	// get the section name and type
	var thisSection = $(this).siblings(".sectionname_name").text();
	var secType = extract_section_type(thisSection);
	
	// get the old donor
	var tableRow = $("#donorchanges tr")
			.filter(function() {
				return $(this).children(".section_name").text() == thisSection
			})
	var oldDonor = tableRow.children(".fromdonor").text();
	
	// get the cell of the relevant donor by section table
	var ttodCell = $("#ttod-"+secType+" td").filter(function() {
		return $(this).text() == thisSection;
	});
	
	// update the donor of the donor by section table
	ttodCell.next()
		.text(newDonor)
		.removeClass()
		.addClass(convert_donor_to_class(newDonor))
	
	// compare the new to the old
	if(newDonor === oldDonor) {
		// if they're the same, delete the row from the table, and remove the "changeddonor" class
		tableRow.remove();
		$(this).removeClass("changeddonor");
		
		// remove changed class from donor by section table
		ttodCell.removeClass("changed");
	}
	else {
		// if they're different, add the "changeddonor" class, and update the "to" column in the table
		tableRow.children(".todonor")
			.text(newDonor)
			.addClass(convert_donor_to_class(newDonor));
		$(this).addClass("changeddonor");
		
		// add changed class to donor by section table
		ttodCell.addClass("changed")
	}
	
	// deselect any sections that have accidentally been selected
	$(".selectedSection").removeClass("selectedSection");
	
	// add 1 to the relevant cell of the donor summary table (add a new row if necessary)
	var secTypeCol = $("#donorcounts td").filter(function() {
			return $(this).text() == secType;
		}).index();
	if(newDonor == "") {
		newDonor = "Unallocated";
	}
	var donorRow = $("#donorcounts tr").filter(function() {
		return $(this).children().eq(0).text() === newDonor;
	});
	// add a new row if necessary
	if (donorRow.length === 0) {
		// add a new row to the table for this donor
		$("#donorcounts tr").eq(-3).after(
			$("<tr />").append($("<td />")
				.text(newDonor)
				.addClass(convert_donor_to_class(newDonor))
			)
		);
		donorRow = $("#donorcounts tr").filter(function() {
			return $(this).children().eq(0).text() === newDonor;
		});
		console.log($("#donorcounts tr").eq(0).children().length - 1);
		for(var i = 0; i < $("#donorcounts tr").eq(0).children().length - 1; i++) {
			donorRow.append($("<td />").text(0));
		}
	}
	var countCell = donorRow.children().eq(secTypeCol);
	countCell.text(parseInt(countCell.text())+1);
	
	// rebind the focus event
	$(document).one("focus", "td.donor", donor_focus);
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