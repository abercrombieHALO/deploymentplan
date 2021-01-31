// add the draggable and droppable elements

// draggable
$("tr.sectionname").draggable({
      helper: draggable_tables
 });

// droppable
$("div.tasktable > table").droppable({
    accept: ".draggable_section",
	drop: droppable_tasktables
});


// when row is clicked, toggle selection
$(document).on("click", ".draggable_section tr.sectionname", function () {
    $(this).toggleClass("selectedSection");
	// deselect all person rows
	$(".selectedRow").removeClass("selectedRow");
});


/* // when row is clicked, toggle selection
$(document).on("click", ".draggable_section tr.sectionname", function (e) {
    if (!$(e.target).is(".donor")) {
		$(this).toggleClass("selectedSection");
		// deselect all person rows
		$(".selectedRow").removeClass("selectedRow");
	}
	else {
		$(this).focus();
	};
}); */




// helper function for draggable elements
function draggable_tables() {
	// deselect all person rows
	$(".selectedRow").removeClass("selectedRow");
	
	
	// get all selected tables
	var selected = $('tbody > tr.selectedSection');
	
	// if there are no tables already selected, get the table that's being dragged
	if (selected.length === 0) {
		selected = $(this).addClass('selectedSection');
	}
	
	// create a container to hold the sections being dragged
	var container = $('<div/>').attr('id', 'draggingContainer');
	
	// add clone of parent draggable_section row to container
	selected.each(function() {
		var taskName = $(this).closest('.tasktable').find('thead').text();
		var locName = $(this).closest('.location').find('h1').text();
		
		var dragTable = $(this).closest(".draggable_section").clone()
			.append($("<td />").addClass("fromtask").text(taskName))
			.append($("<td />").addClass("fromloc").text(locName))
		//dragTable.find(".selectedSection").removeClass("selectedSection");
		container.append(dragTable);
	});
	
	return container;
}

// drop function for droppable elements
function droppable_tasktables(event, ui) {
	var target = $(this);
	
	// get the "to" details: location, task
	var toTask = $(this).children("thead").text();
	var toLoc = $(this).closest(".location").find("h1").text();
	
	// for each dragged table, determine whether it has actually moved to a new task
	// if it has, continue with the drop, and update the changes table,
	// if it hasn't, do nothing
	ui.helper.children().each(function() {
		// get "from" details
		var fromTask = $(this).children(".fromtask").text();
		var fromLoc = $(this).children(".fromloc").text();
		
		// check whether it has actually moved
		var changeIndicator = !((fromLoc == toLoc) && (fromTask == toTask));
		
		if(changeIndicator) {
			// check if the section is already in the personnel changes table
			var changedSec = $('#personnelchanges .ins').map(function() {
				return $(this).text();
			}).get();
			var thisSec = $(this).find(".sectionname_name").text();
			
			if(changedSec.includes(thisSec)) {
				changedRow = $('#personnelchanges .ins:contains("'+thisSec+'")').parent();
			
				var originalTask = changedRow.children(".fromtask").text();
				var originalLoc = changedRow.children(".fromloc").text();
				
				// remove "from" details from dragged row (not needed)
				$(this).children(".fromloc").remove();
				$(this).children(".fromtask").remove();
				
				// check if the row has been moved back to original section
				originIndicator = (originalLoc == toLoc) && (originalTask == toTask);
				if(originIndicator) {
					// if it has moved back to it's origin, delete the change table row
					changedRow.remove()
					// and add the dragged row without the "changed" class
					target.append($(this).removeClass("changed"));
				}
				else {
					// if it hasn't moved back to its origin, modify changes table row
					changedRow.children(".toloc").text(toLoc);
					changedRow.children(".totask").text(toTask);

					// and add the dragged row as normal
					target.append($(this).addClass("changed"));
				}
			}
			else {
				// if the section isn't already in the table, add new row to the personnel changes table
				var fromSec = $(this).find(".sectionname_name").text();
				$("#personnelchanges tbody").append($("<tr />")
					.append($("<td />").addClass("ins").text(fromSec).attr("colspan", "2"))
					.append($(this).children(".fromloc"))
					.append($(this).children(".fromtask"))
					.append($("<td />").addClass("fromsec"))
					.append($("<td />").addClass("toloc").text(toLoc))
					.append($("<td />").addClass("totask").text(toTask))
					.append($("<td />").addClass("tosec"))
					.append($("<td />").addClass("reason").prop("contenteditable", true))
				);
			
				// and add the section to the new task
				target.append($(this).addClass("changed"));
			};
		}
		else {
			$(this).remove();
		}
	});
	
	// remove the dragged elements from the old table
	$(this).find(".selectedSection").removeClass("selectedSection");
	$('.selectedSection').parents(".draggable_section").remove();
	
	// sort the destination tables by section name, alphabetically. "management" overrides and goes to top.
	$(this).each(sort_section_tables);
	
	// resize all the location divs to accommodate any expanded team lists
	resizeLocationDivs();
	
	// make sure the dropped table is draggable
	$("tr.sectionname").draggable({
		helper: draggable_tables
	});
	
	// make sure the rows of the dropped table are draggable
	$(".tasktable .childgrid tr").not(".section_th").draggable({
		helper: draggable_rows
	});	
	
	// make section tables droppable
	$(".tasktable .childgrid").droppable({
		accept: ".draggable_tr",
		drop: droppable_tables
	});
	
}

function sort_section_tables() {
	tbl = $(this);
	var arrData = $(this).find('tr.draggable_section').get();
	arrData.sort(function(a, b) {
		// check their positions, and their priorit using sortOrder
		var sec1 = $(a).find(".sectionname_name").text();
		var sec2 = $(b).find(".sectionname_name").text();
		if (sec1.toLowerCase() == "management") {
			return -1;
		}
		else if (sec2.toLowerCase() == "management") {
			return 1;
		}
		else {
			return (sec1 < sec2) ? -1 : ((sec1 > sec2) ? 1 : 0);
		}
	});
	$.each(arrData, function(index, row) {
		tbl.append(row);
	});
}