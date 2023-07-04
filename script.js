// Sample student data
const students = [];

// Function to display students in the table
function displayStudents() {
    const tableBody = document.getElementById('tableBody');
    tableBody.innerHTML = '';

    students.forEach(student => {
        const row = document.createElement('tr');
        row.innerHTML = `
        <td>${student.ID}</td>
        <td>${student.name}</td>
        <td>${student.email}</td>
        <td>${student.age}</td>
        <td>${student.gpa}</td>
        <td>${student.degree}</td>
        <td class="actions">
          <button class="editButton" data-id="${student.ID}">
            <i class="editIcon">✎</i>
          </button>
          <button class="deleteButton" data-id="${student.ID}">
            <i class="deleteIcon">✖</i>
          </button>
        </td>
      `;
        tableBody.appendChild(row);
    });
}

// Function to clear the add student form
function clearForm() {
    document.getElementById('name').value = '';
    document.getElementById('email').value = '';
    document.getElementById('age').value = '';
    document.getElementById('gpa').value = '';
    document.getElementById('degree').value = '';
    document.getElementById('addButton').textContent = 'Add Student';
    document.getElementById('addButton').dataset.id = '';
}

// Function to add a new student
function addStudent(event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const age = document.getElementById('age').value;
    const gpa = document.getElementById('gpa').value;
    const degree = document.getElementById('degree').value;

    const studentId = document.getElementById('addButton').dataset.id;
    if (studentId) {
        // Editing an existing student
        const index = students.findIndex(student => student.ID === parseInt(studentId));
        if (index !== -1) {
            students[index] = { ID: parseInt(studentId), name, email, age, gpa, degree };
        }
    } else {
        // Adding a new student
        const id = students.length > 0 ? students[students.length - 1].ID + 1 : 1;
        students.push({ ID: id, name, email, age, gpa, degree });
    }

    // Clear the form inputs
    clearForm();

    // Display the updated list of students
    displayStudents();
}

// Function to handle button clicks within the student table
function handleTableButtonClick(event) {
    if (event.target.classList.contains('editIcon')) {
      const studentId = event.target.closest('.editButton').dataset.id;
      const student = students.find(student => student.ID === parseInt(studentId));
  
      if (student) {
        // Fill the form inputs with the student's data
        document.getElementById('name').value = student.name;
        document.getElementById('email').value = student.email;
        document.getElementById('age').value = student.age;
        document.getElementById('gpa').value = student.gpa;
        document.getElementById('degree').value = student.degree;
  
        // Change the button text to "Edit Student"
        const addButton = document.getElementById('addButton');
        addButton.textContent = 'Edit Student';
        addButton.dataset.id = student.ID.toString();
      }
    } else if (event.target.classList.contains('deleteIcon')) {
      if (confirm('Are you sure you want to delete this student?')) {
        const studentId = event.target.closest('.deleteButton').dataset.id;
        deleteStudent(studentId);
      }
    }
  }
  
  // Function to delete a student
  function deleteStudent(studentId) {
    const index = students.findIndex(student => student.ID === parseInt(studentId));
  
    if (index !== -1) {
      students.splice(index, 1);
      displayStudents();
    }
  } 
  

// Function to handle search input
function handleSearchInput(event) {
    const searchTerm = event.target.value.toLowerCase();
    const filteredStudents = students.filter(
        student =>
            student.name.toLowerCase().includes(searchTerm) ||
            student.email.toLowerCase().includes(searchTerm) ||
            student.degree.toLowerCase().includes(searchTerm)
    );
    displayFilteredStudents(filteredStudents);
}

// Function to display filtered students in the table
function displayFilteredStudents(filteredStudents) {
    const tableBody = document.getElementById('tableBody');
    tableBody.innerHTML = '';

    filteredStudents.forEach(student => {
        const row = document.createElement('tr');
        row.innerHTML = `
          <td>${student.ID}</td>
          <td>${student.name}</td>
          <td>${student.email}</td>
          <td>${student.age}</td>
          <td>${student.gpa}</td>
          <td>${student.degree}</td>
          <td class="actions">
            <button class="editButton" data-id="${student.ID}">
              <i class="editIcon">✎</i>
            </button>
            <button class="deleteButton" data-id="${student.ID}">
              <i class="deleteIcon">✖</i>
            </button>
          </td>
        `;
        tableBody.appendChild(row);
    });
}

// Event listeners
document.getElementById('addStudentForm').addEventListener('submit', addStudent);
document.getElementById('studentTable').addEventListener('click', handleTableButtonClick);
document.getElementById('searchInput').addEventListener('input', handleSearchInput);

// Initial display of students
displayStudents();

