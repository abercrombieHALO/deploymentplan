# Deployment Plan Tool

## Table of Contents

<details>
  <summary><b>Expand to show Table of Contents</b></summary>

<!-- toc -->

- [Introduction](#introduction)
  * [General process](#general-process)
  * [Browser support](#browser-support)
- [Underlying Data Format](#underlying-data-format)
  * [Staff to Section](#staff-to-section---staff_to_section)
  * [Section to Task](#section-to-task---section_to_task)
  * [Changes Tables](#changes-tables)
  * [Formatting](#formatting)
- [Functionality](#functionality)
  * [Location-level](#location-level)
  * [Task-level](#task-level)
  	+ [Rename a task](#rename-a-task)
  * [Section-level](#section-level)
  	+ [Move sections around](#move-sections-around) 
  	+ [Change the donor for a section](#change-the-donor-for-a-section) 
  * [Person-level](#person-level)
  	+ [Move people around](#move-people-around) 
  	+ [Change positions](#change-positions)
- [Saving, Printing & Exporting](#saving-printing--exporting)
  * [Save](#save)
  * [Print](#print)
  * [Export to PDF](#export-to-pdf)

<!-- tocstop -->

</details>

## Introduction

This is a tool to help plan the deployment of teams. The aim is to be able to quickly and easily:

1. Assign staff to teams
2. Assign teams to tasks/activities
3. Assign donors to teams
4. Highlight and keep a record of changes from previous version of the deployment plan
5. Export a PDF or print the deployment plan

The data used by the tool is stored as lists in an Excel file. Before using the tool for the first time, you will need to fill in a blank version of the spreadsheet with your programme's data - staff, sections, tasks etc.

![Screenshot of deployment planning tool](/assets/deployment_planning_tool.jpg)

## General process

The general process for using the tool is:

1. Load in a previous version of your deployment plan (an excel file)
	* Any changes made for the previous plan will be highlighted in yellow.
	* To start afresh, press the "clear changes" button.
2. Update the deployment plan according to your needs
	* Any changes will be recorded in the changes tables at the bottom of the page
3. Save the new deployment plan (as an excel file)
4. Export/print the new deployment plan (if desired)

### Browser support

Definitely won't work in Microsoft Edge. For best results, use Google Chrome.

## Underlying Data Format

There are 6 sheets in the excel file:

1. [`staff_to_section`](#staff-to-section---staff_to_section)
2. [`section_to_task`](#section-to-task---section_to_task)
3. [`personnel_changes`](#changes-tables)
4. [`position_changes`](#changes-tables)
5. [`donor_changes`](#changes-tables)
6. [`formatting`](#formatting)

### Staff to Section - `staff_to_section`

This is a list of all staff (identified by insurance number), along with their positions and the section that they are assigned to. Optionally, it can also include columns of other staff information that you wish to show on the deployment plan (e.g. name, training etc).

![Screenshot of `staff_to_section`](/assets/staff_to_section.jpg)

#### Mandatory Columns

| Column   | Description | Examples |
| ---     | --- | --- |
| `section` | <ul><li>Section that the person is assigned to.</li><li>If section is not also listed in the `section_to_task` sheet, the section and this person will not appear in the deployment plan.</li><li>Special case: to add this person to a special "Management" section for a task, write the task name in this column.</li></ul> | `MAN-17` |
| `ins` | <ul><li>Personnel identifier - usually insurance number.</li><li>Duplicates allowed - e.g. a Task commander appears in multiple sections.</li></ul> | `123`  |  |
| `pos` | <ul><li>Position abbreviation e.g. `SC` for Section Commander</li><li>CSS classes will be formed by converting to lower-case, and converting numerals to words - e.g. `SC` will be turned into `.sc`, `2IC` will be turned into `.twoic` etc.</li></ul> | `SC`<br>`D`<br>`DM`<br>`2IC`<br>`Op` |

#### Optional Columns

Any additional columns of information about personnel that would be helpful to show on the deployment plan. Data in these columns will not be editable from within the deployment plan, but can always be edited within the spreadsheet itself.

Column names must not contain any spaces.

| Example Columns   | Example Data |
| ---     | --- |
| `name` | `Dominic McVey`<br>`Angelina Jolie` |
| `sex` | `M` or `F`<br>`♂` or `♀`  |  |
| `training`<br>`qualifications` | `REDs/HST/ML`<br>`Medic/TL/Sup`<br>`FEL/EXC` |
| `medic`<br>`CMD3` | `Y` or `N`<br>`✓` or `✗` |


### Section to Task - `section_to_task`

This is a list of all sections, along with the task that they are assigned to, and the "location" to which that task belongs (in the HALO sense of "location"). Optionally, it can also include a column indicating the donor assigned to that section.

![Screenshot of `section_to_task`](/assets/section_to_task.jpg)

#### Mandatory Columns
| Column   | Description | Examples |
| ---     | --- | --- |
| `section` | <ul><li>Section name.</li><li>No duplicates.</li><li>Do not start with a number.</li></ul> | `MAN-17` |
| `task` | <ul><li>"Task" name. Used to group sections - each "task" will form one column group in the tool.</li><li>Doesn't have to actually be a task - any sensible grouping of sections will do.</li><li>Ideally max. 6 sections per task (for printing purposes)</li></ul> | `Dabogoroyaale MF-2`<br>`Training Sections`<br>`Mobile Teams`  |  |
| `location` | <ul><li>"Location" in the HALO sense.</li><li>Used to group tasks. Each location creates its own section of the tool.</li><li>Doesn't have to actually be a HALO location - any sensible grouping of tasks will do.</li><li>Each location will be on a separate page when exporting/printing.</li></ul> | `Anlong Veang`<br>`Mech Tasks`<br>`Burao`<br>`East Minefields` |

#### Optional Columns

| Column  | Description | Examples |
| ---     | --- | --- |
| `donor` | <ul><li>Donor allocation for each section.</li><li>Ideally use cost centres (e.g. `N61`) instead of donor (e.g. `DFID`) - helps with multi-contract donors.</li><li>Do not start with a number.</li><li>CSS classes will be formed by removing anything after the first whitespace, and converting to lower-case - e.g. `N82 (UNMAS)` will be turned into `.n82`</li></ul> | `N82 (UNMAS FAL)`<br>`N82`<br>`DFID`<br> |

### Change tables

<ul>
	<li>These three sheets record information that you have changed while using the tool.
    	<ul>
        <li><code>donor_changes</code> - changes to section donor-allocations</li>
        <li><code>personnel_changes</code> - people that have been moved to different sections, and sections that have been moved to new tasks</li>
        <li><code>pos_changes</code> - people that have changed position (e.g. promoted or demoted)</li>
        </ul>
    </li>
    <li>Any changes recorded in these sheets will be highlighted in yellow when you load the file into the tool.</li>
    <li>Do not change the format of the sheets.</li>
    <li>Do not delete any rows in the sheets. If you want to clear changes, open the file in the tool and press the "Clear changes" button</li>
</ul>

### Formatting

This sheet serves two optional functions:
1. Define format (background color and font color) to be applied to donors and positions e.g. PMWRA should have a blue background and white font, section commanders should be light green etc.
2. Define the sort order of positions within a section e.g. Section Commanders appear above Medic Deminers, Medic Deminers above Deminers, etc.

![Screenshot of `formatting` and results on deployment plan](/assets/formatting.jpg)

#### Colors
Any colour that is recognised in HTML can be entered in the `background-color` and `text-color` columns. Some common ways of specifying the colours are listed in the table below (see [here](https://www.w3schools.com/colors/default.asp) for a full rundown. If a colour is not specified (i.e. the cell is left blank) then the default colours will be used (background: white, text: black).

| Colour type | Examples | Reference Link |
| --- | --- | --- |
| HTML color name | <span style="background-color: BlanchedAlmond">`BlanchedAlmond`</span><br><span style="background-color: DarkOliveGreen">`DarkOliveGreen`</span><br><span style="background-color: Cyan">`Cyan`</span> | [W3 HTML Color Names](https://www.w3schools.com/colors/colors_names.asp) |
| Hex code | <span style="background-color: #ef4036">`#ef4036`</span><br><span style="background-color: #062135; color: white">`#062135`</span> | [W3 Hex Calculator](https://www.w3schools.com/colors/colors_hexadecimal.asp) |
| RGB | <span style="background-color: rgb(0, 25, 250)">`rgb(0, 25, 250)`</span><br><span style="background-color: rgb(170, 20, 200)">`rgb(170, 20, 200)`</span><br><span style="background-color: rgb(250, 250, 20)">`rgb(250, 250, 20)`</span> | [W3 RGB Calculator](https://www.w3schools.com/colors/colors_rgb.asp) |

### Position sort order
The order that positions are displayed on the deployment plan will exactly match the order that positions appear on the `formatting` sheet. Any positions that are missing from the `formatting` sheet will be sorted to the bottom by default on the deployment plan.

## Functionality

### Location-level

#### Add/remove/rename a location

Edit in the `section_to_task` sheet of the Excel file.

### Task-level

#### Add or remove a task

* To remove a task and all the sections within it, delete the corresponding rows in the Excel file.
* To remove a task but keep all of the sections, rename the task (to wherever the sections have now gone) - see below.
* To add a new task and move some sections into it, edit the `task` column of the cooresponding rows in the excel file.
	* Note: it is not currently possible to add a new task and leave it empty (e.g. no sections).

#### Rename a task

Click on the task name in the deployment plan, and type.

### Section-level

#### Add a new section

Add a new row for the section to the `section_to_task` sheet of the excel file, making sure to  also include the task and location.

#### Move section(s) to a new task

* Click on a section name to select the section. The section name will be highlighted in pink.
* Click on multiple section names to select more than one at a time.
* Click and drag the section(s) to their new task.
* Any sections that have been moved will be highlighted in yellow, and the move will be recorded in the "Personnel changes" table at the bottom of the page.

#### Change the donor for a section

* Click on the donor name, and type.
* Any changed donors will be highlighted with a yellow border, and the change will be recorded in the "Donor changes" table at the bottom of the page, and reflected in the "Donors > Summary" and "Donors > By Section" tables.

### Person-level

#### Add or remove a person

* To add a new person, add a new row to the `staff_to_section` sheet of the Excel file, making sure to fill in their insurance number and section, as well as any optional columns.
* To delete a person, delete the corresponding row in the `staff_to_section` sheet of the Excel file.

#### Move a person/people to a new section

* Click on a person to select them. The person will be highlighted in grey.
* Click on multiple people to select more than one at a time.
* Click and drag the person/people to their new section.
* Any people that have been moved will be highlighted in yellow, and the move will be recorded in the "Personnel changes" table at the bottom of the page.

#### Change positions

* Click on the position of the person, and type.
* Any changed positions will be highlighted with yellow font, and the change will be recorded in the "Position Changes" table at the bottom of the page.

## Saving, Printing & Exporting

### Save

Enter a name for the file in the "Save as:" text box, then press the "Save" button. This will output a new Excel file in your "Downloads" folder.

Note: on some systems, pressing "Save" may open a file dialog where you can choose where to save your file.

### Print

Press the "Print/Export as PDF" button. This will open a print dialog. Each location should on its own page, and scaled so that all sections fit on the page.

Note: for some large programmes/locations, there is no easy way to automatically format a page to properly show all the sections at a readable size. Sorry. One solution might be to reorganise your deployment plan with smaller "locations" - e.g. split "Muhamalai" into "Muhamalai - East", "Muhamalai - West" etc.

### Export to PDF

Same as Print instructions above, but change "Destination"/"Printer" to "Save as PDF".