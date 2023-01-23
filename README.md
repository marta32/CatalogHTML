# School Catalog - JavaScript Project

This project is a Web Application for managing a school catalog. It allows creating, updating, and deleting students, as well as creating, updating, and deleting grades. 

## Tech stack

- JavaScript (plain)
- HTML
- CSS
- Bootstrap

## User interaction

The application shows the list of students when it is opened. There are three icon buttons displayed next to each student, and their role is the following. The "pencil" button redirects the user to a new page where he can add grades, the "eraser" button allows to update the student, the "trash" button can be used for deletion a student. The "Add new student" button allows adding a new student to the list.

![Screenshot](https://github.com/marta32/CatalogHTML/blob/main/images/FirstPage.png)

The application displays a modal window when the user presses the "eraser" icon or the "Add new student" button. Depending on the case (edit/add) the user has to fill in the form or alter the existing details in the form. He has to press the "Save" button to finalize the operation. 

![Screenshot](https://github.com/marta32/CatalogHTML/blob/main/images/ModalEditButton.png)

If the user wants to delete a student, he has to press the "trash" icon. The application shows a modal window to check if the user really wants to perform this operation. He has to press the "YES" button to go further.

![Screenshot](https://github.com/marta32/CatalogHTML/blob/main/images/ModalDeleteButton.png)

To add a grade to a student, the user has to press the "pencil" button. On this new page, he can see all the grades for all the subjects. 

![Screenshot](https://github.com/marta32/CatalogHTML/blob/main/images/SecondPage.png)

The "Add grade" button is the one that is actually used to add a grade. When it is pressed, the application opens a modal window where the user can fill in the details.

![Screenshot](https://github.com/marta32/CatalogHTML/blob/main/images/ModalAddButton.png)
