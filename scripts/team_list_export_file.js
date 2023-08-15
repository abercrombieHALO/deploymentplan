function writeOutputFile() {
	
	// get output filename from "Save as:" form box with id outputFilename
	var outputFilename = $("#outputFilename").val();
	// if it's empty, use the input file name instead
	if (outputFilename == "") {
		outputFilename = $("#controls input:first").val().replace("C:\\fakepath\\", "");
	}
	// if it doesn't end with .xlsx, end it with that instead
	if (!(outputFilename.endsWith(".xlsx"))) {
		// remove any preexisting file extensions
		outputFilename = outputFilename.replace(/\.[^/.]+$/, "");
		// add .xlsx to the end
		outputFilename = outputFilename + ".xlsx";
	}
	
	// process the team lists
	var sheetNames = workbook.SheetNames;
	if (sheetNames.includes('staff_to_section') && sheetNames.includes('section_to_task')) {
		
		// get section_to_task sheet from workbook
		var stt_sheet = workbook.Sheets['section_to_task'];
		var stt = XLSX.utils.sheet_to_json(stt_sheet);
		var stt_headers = XLSX.utils.sheet_to_json(stt_sheet, {header: 1})[0];

		// get staff_to_section sheet from workbook
		var sts_sheet = workbook.Sheets['staff_to_section'];
		var sts = XLSX.utils.sheet_to_json(sts_sheet);
		
		// get header row of staff_to_section sheet and remove "section" from index 0;
		var sts_headers = XLSX.utils.sheet_to_json(sts_sheet, {header: 1})[0];
		sts_headers = sts_headers.slice(1, sts_headers.length);
		
		// populate data arrays of arrays to be written to workbook
		var stt_data = [["team", "task", "location", "donor"]];
		var sts_data = [];
		
		$(".location").each(function() {
			// get the location name
			var loc = $(this).children("h1").text();
			// loop through the task table divs
			$(this).children("div").children().each(function() {
				// get the task name
				var task = $(this).find("> table > thead > tr > th").text();
				// loop through the section names
				$(this).find("table.section").each(function() {
					// get the section name
					var section = $(this).find("tr.sectionname td").first().text();
					var donor = "";
					// get the donor name
					if($(this).find("tr.sectionname td").length > 1) {
						donor = $(this).find(".donor").text();
					};
					// if the section name isn't management, push to stt_data
					if (section.toLowerCase() != "management") {
						stt_data.push([section, task, loc, donor]);
					};
					// loop through the section tables to get staff data
					$(this).find(".childgrid").each(function(index) {
						var ws = XLSX.utils.table_to_sheet($(this)[0]);
						ws = XLSX.utils.sheet_to_json(ws, {header:1});
						
						if (sts_data.length == 0) {
							// if this is the first row, add headers
							sts_data.push(["team"].concat(ws[0]))
						}
						
						// remove header row
						ws = ws.slice(1, ws.length);
						
						for(row of ws) {
							// add the section name to the start of each row
							if(section.toLowerCase() == "management") {
								sts_data.push([task].concat(row));
							} else {
								sts_data.push([section].concat(row));
							}
						}
						
					});
				});
				
			});
		});
	
		stt_sheet = XLSX.utils.aoa_to_sheet(stt_data);
		sts_sheet = XLSX.utils.aoa_to_sheet(sts_data);
		workbook.Sheets['section_to_task'] = stt_sheet;
		workbook.Sheets['staff_to_section'] = sts_sheet;
		
		
		// convert personnel changes to worksheet
		workbook.Sheets['personnel_changes'] = XLSX.utils.table_to_sheet($("#personnelchanges")[0]);
		
		// convert donor changes to worksheet
		workbook.Sheets['donor_changes'] = XLSX.utils.table_to_sheet($("#donorchanges")[0]);
		
		// convert position changes to worksheet
		workbook.Sheets['pos_changes'] = XLSX.utils.table_to_sheet($("#poschanges")[0]);
		
		XLSX.writeFile(workbook, outputFilename);
}
}

function exportExcelFile() {
	
	// get output filename from "Save as:" form box with id outputFilename
	var outputFilename = $("#outputFilename").val();
	// if it's empty, use the input file name instead
	if (outputFilename == "") {
		outputFilename = $("#controls input:first").val().replace("C:\\fakepath\\", "");
	}
	// prepend with EXCEL_
	outputFilename = "EXCEL_"+outputFilename;
	// if it doesn't end with .xlsx, end it with that instead
	if (!(outputFilename.endsWith(".xlsx"))) {
		// remove any preexisting file extensions
		outputFilename = outputFilename.replace(/\.[^/.]+$/, "");
		// add .xlsx to the end
		outputFilename = outputFilename + ".xlsx";
	}
	
	// process the team lists
	
	// populate data arrays of arrays to be written to workbook
	var sts_data = [];
	
	// loop through the location divs
	$(".location").each(function() {
		
		// get the location name
		var loc = $(this).children("h1").text();
		sts_data.push([loc]);
		
		// loop through the task table divs
		$(this).children("div").children().each(function() {
			
			// get the task name
			var task = $(this).find("> table > thead > tr > th").text();
			sts_data.push([task]);
			
			// loop through the section names
			$(this).find("table.section").each(function() {
				
				// get the section name
				var section = $(this).find("tr.sectionname td").first().text();
				var donor = "";
				
				// get the donor name
				if($(this).find("tr.sectionname td").length > 1) {
					donor = $(this).find(".donor").text();
				};
				
				sts_data.push([section, donor]);
				
				// loop through the section tables to get staff data
				$(this).find(".childgrid").each(function(index) {
					
					var ws = XLSX.utils.table_to_sheet($(this)[0]);
					//ws = XLSX.utils.sheet_to_json(ws, {header:1});
					ws = XLSX.utils.sheet_to_json(ws);
					for(row of ws) {
						sts_data.push(row);
					};
				});
			});
			
		});
	});

	sts_sheet = XLSX.utils.aoa_to_sheet(sts_data);
	
	const workbook = XLSX.utils.book_new()
	XLSX.utils.book_append_sheet(workbook, sts_sheet, "staff_to_section");
	
	XLSX.utils.book_append_sheet(workbook, XLSX.utils.table_to_sheet($("#personnelchanges")[0]), "personnel_changes");
	XLSX.utils.book_append_sheet(workbook, XLSX.utils.table_to_sheet($("#donorchanges")[0]), "donor_changes");
	XLSX.utils.book_append_sheet(workbook, XLSX.utils.table_to_sheet($("#poschanges")[0]), "pos_changes");
	
	XLSX.writeFile(workbook, outputFilename);
}

function clearChanges() {
	// remove class "changed" + "changeddonor"
	$(".changed").removeClass("changed");
	$(".changeddonor").removeClass("changeddonor");
	$(".changedpos").removeClass("changedpos");
	
	// clear personnel changes table
	$("#personnelchanges tbody tr").slice(2).remove();
	
	// clear donor changes table
	$("#donorchanges tr").slice(1).remove();
	
	// clear pos changes table
	$("#poschanges tr").slice(1).remove();
	
}

function printPage() {
	// get the current value of outputFilename form field
	var title = $("#outputFilename").val();
	if (title !== "") {
		// remove any file extensions
		title = title.replace(/\.[^/.]+$/, "");
	}
	// update page title
	//title = title + " - Date exported: "+(new Date()).toISOString().slice(2,10).replace(/-/g,"");
	var dateOptions = {day: "numeric", month: "short", year: "numeric"};
	var strDate = (new Date()).toLocaleDateString("en-GB", dateOptions);
	title = title + " - Date exported: " + strDate;
	$("#printTitle").text(title);
	
	window.print();
}