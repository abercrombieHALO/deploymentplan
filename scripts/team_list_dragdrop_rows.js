// if area outside task tables is clicked, clear all selections
$(document).on('click', ":not(.tasktable *)", function (e) {
	if (this === e.target) {
		$(".selectedRow").removeClass("selectedRow");
		$(".selectedSection").removeClass("selectedSection");
	};
});

// make section table rows draggable
$(".tasktable .childgrid tr").not(".section_th").draggable({
      helper: draggable_rows
 });

// make section tables droppable
$(".tasktable .childgrid").droppable({
    accept: ".draggable_tr",
	drop: droppable_tables
});

// when row is clicked, toggle selection
$(document).on("click", ".tasktable .childgrid .draggable_tr", function () {
    $(this).toggleClass("selectedRow");
	// deselect all section names
	$(".selectedSection").removeClass("selectedSection");
});

// helper function for draggable elements
function draggable_rows() {
	// deselect all section names
	$(".selectedSection").removeClass("selectedSection");
	
	// get all selected rows
	var selected = $('.childgrid tr.selectedRow');
	
	// if there are no selected rows already, get this row that's being dragged
	if (selected.length === 0) {
		selected = $(this).addClass('selectedRow');
	}
	
	// create a container to hold the rows being dragged
	var container = $('<div/>').attr('id', 'draggingContainer');
	
	// add the selected rows to the container
	// at the same time, retrieve the location, task, section, and add those to each row
	selected.each(function() {
		var sectionName = $(this).closest(".section").find(".sectionname_name").text();
		var taskName = $(this).closest(".tasktable").find("thead").text();
		var locName = $(this).closest(".location").find("h1").text();
		container.append($(this).clone()
			.append($("<td />").addClass("fromsec").text(sectionName))
			.append($("<td />").addClass("fromtask").text(taskName))
			.append($("<td />").addClass("fromloc").text(locName))
			.removeClass("selectedRow")
		);
	});
	
	return container;
}

// drop function for droppable elements
function droppable_tables(event, ui) {
	var target = $(this);
	
	// get the "to" details: location, task, section
	var toSec = $(this).closest(".section").find(".sectionname_name").text();
	var toTask = $(this).closest(".tasktable").find("thead").text();
	var toLoc = $(this).closest(".location").find("h1").text();
	
	
	// for each dragged row, determine whether it has actually moved to a new section
	// if it has, continue with the drop, and update the changes table,
	// if it hasn't, do nothing
	ui.helper.children().each(function() {
		// get "from" details
		var fromSec = $(this).children(".fromsec").text();
		var fromTask = $(this).children(".fromtask").text();
		var fromLoc = $(this).children(".fromloc").text();
		
		// check whether it has actually moved
		var changeIndicator = !((fromLoc == toLoc) && (fromTask == toTask) && (fromSec == toSec));
		
		if(changeIndicator) {
			// check if the row is already in the personnel changes table
			var changedIns = $('#personnelchanges .ins').map(function() {
				return $(this).text();
			}).get();
			var thisIns = $(this).children(".ins").text();
			if(changedIns.includes(thisIns)) {
				changedRow = $('#personnelchanges .ins:contains("'+thisIns+'")').parent();
				
				var originalLoc = changedRow.children(".fromloc").text();
				var originalTask = changedRow.children(".fromtask").text();
				var originalSec = changedRow.children(".fromsec").text();
				
				// remove "from" details from dragged row (not needed)
				$(this).children(".fromloc").remove();
				$(this).children(".fromtask").remove();
				$(this).children(".fromsec").remove();				
				
				// check if row has been moved back to original section
				originIndicator = (originalLoc == toLoc) && (originalTask == toTask) && (originalSec == toSec);
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
					changedRow.children(".tosec").text(toSec);

					// and add the dragged row as normal
					target.append($(this).addClass("changed"));
				}
			}
			else {
				// if it has moved and is not already in the changes table, add a new row
				$("#personnelchanges tbody").append($("<tr />")
					.append($(this).children(".ins").clone())
					.append($(this).children(".pos").clone().attr("contenteditable", "false"))
					.append($(this).children(".fromloc"))
					.append($(this).children(".fromtask"))
					.append($(this).children(".fromsec"))
					.append($("<td />").addClass("toloc").text(toLoc))
					.append($("<td />").addClass("totask").text(toTask))
					.append($("<td />").addClass("tosec").text(toSec))
					.append($("<td />").addClass("reason").prop("contenteditable", true))
				);
				
				// and add the row to the new table
				target.append($(this).addClass("changed"));
			};
		}
		else {
			$(this).remove();
		}
	});
	
	// remove the dragged elements from the old table
	$(this).find(".selectedRow").removeClass("selectedRow");
	$('.selectedRow').remove();
	
	// sort the destination tables by position, sort order defined in sortOrder array
	$(this).each(sort_team_list_tables);
	
	// resize all the location divs to accommodate any expanded team lists
	resizeLocationDivs();
	
	// make sure the dropped row is draggable
	$(".tasktable .childgrid tr").not(".section_th").draggable({
		helper: draggable_rows
	});	
}

function sort_team_list_tables() {
	tbl = $(this);
	var sortOrder = ['pos'].concat(positionSortOrder);
	var arrData = $(this).find('tbody >tr:has(td)').get();
	arrData.sort(function(a, b) {
		// check their positions, and their priorit using sortOrder
		var pos1 = sortOrder.indexOf($(a).children('td').eq(1).text());
		var pos2 = sortOrder.indexOf($(b).children('td').eq(1).text());
		if (pos1 == pos2) {
			// if they have the same position, order by insurance number
			var ins1 = +($(a).children('td').eq(0).text());
			var ins2 = +($(b).children('td').eq(0).text());
			return ins1 - ins2;
		}
		else if ((pos1 == -1) || (pos2 == -1)) {
			// if one of the pos is not in the sort list, it loses
			return pos1 < pos2 ? 1 : -1;
		}		
		else {
			return pos1 - pos2;
		}
	});
	$.each(arrData, function(index, row) {
		tbl.append(row);
	});
}