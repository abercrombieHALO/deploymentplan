# Deployment Plan Tool

## Introduction

### Browser support

Definitely won't work in Microsoft Edge. For best results, use Google Chrome.

## Underlying Data Format

### Staff to Section - `staff_to_section`

#### Mandatory Columns

| Column   | Description | Examples |
| ---     | --- | --- |
| `section` | <ul><li>Section that the person is assigned to.</li><li>If section is not also listed in the `section_to_task` sheet, the section and this person will not appear in the deployment plan.</li><li>Special case: to add this person to a special "Management" section for a task, write the task name in this column.</li></ul> | `MAN-17` |
| `ins` | <ul><li>Personnel identifier - usually insurance number.</li><li>Duplicates allowed - e.g. a Task commander appears in multiple sections.</li></ul> | `123`  |  |
| `pos` | <ul><li>Position abbreviation e.g. `SC` for Section Commander</li><li>CSS classes will be formed by converting to lower-case, and converting numerals to words - e.g. `SC` will be turned into `.sc`, `2IC` will be turned into `.twoic` etc.</li></ul> | `SC`<br>`D`<br>`DM`<br>`2IC`<br>`Op` |

#### Optional Columns

Any more columns of information about personnel that would be helpful to show on the deployment plan. Data in these columns will not be editable from within the deployment plan, but can always be edited within the spreadsheet.

Column names must not contain any spaces.

| Example Columns   | Example Data |
| ---     | --- |
| `name` | `Dominic McVey`<br>`Angelina Jolie` |
| `sex` | `M` or `F`<br>`♂` or `♀`  |  |
| `training`<br>`qualifications` | `REDs/HST/ML`<br>`Medic/TL/Sup`<br>`FEL/EXC` |
| `medic`<br>`CMD3` | `Y` or `N`<br>`✓` or `✗` |


### Section to Task - `section_to_task`

#### Mandatory Columns
| Column   | Description | Examples |
| ---     | --- | --- |
| `section` | <ul><li>Section name.</li><li>No duplicates.</li><li>Do not start with a number.</li></ul> | `MAN-17` |
| `task` | <ul><li>"Task" name. Used to group sections - each "task" will form one column group in the tool.</li><li>Doesn't have to actually be a task - any sensible grouping of sections will do.</li><li>Ideally max. 6 sections per task (for printing purposes)</li></ul> | `Dabogoroyaale MF-2`<br>`Training Sections`<br>`Mobile Teams`  |  |
| `location` | <ul><li>"Location" in the HALO sense.</li><li>Used to group tasks. Each location creates its own section of the tool.</li><li>Doesn't have to actually be a HALO location - any sensible grouping of tasks will do.</li><li>Each location will be on a separate page when exporting/printing.</li></ul> | `Anlong Veang`<br>`Mech Tasks`<br>`Burao`<br>`East Minefields` |

#### Optional Columns

##### Special Optional Columns
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

### Formatting setup

## Functionality

### Location-level

### Task-level

#### Rename a task

### Section-level

#### Move sections around

#### Change the donor for a section

### Person-level

#### Move people around

#### Change positions

## Saving, Printing & Exporting

### Save

### Print

### Export