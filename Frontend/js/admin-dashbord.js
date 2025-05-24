// ---------------- STUDENT MANAGEMENT ----------------
const STUDENT_API_URL = "http://localhost:8080/students";
let editingStudentId = null;

function saveStudent(event) {
  event.preventDefault();

  const name = document.getElementById("studentName").value.trim();
  const id = document.getElementById("studentId").value.trim();
  const email = document.getElementById("studentEmail").value.trim();
  const password = document.getElementById("studentPassword").value;
  const confirmPassword = document.getElementById("confirmPassword").value;

  if (!name || !id || !email || !password || !confirmPassword) {
    alert("❌ All fields are required.");
    return;
  }

  if (password !== confirmPassword) {
    alert("❌ Passwords do not match!");
    return;
  }

  const student = {
    fullName: name,
    studentId: id,
    email: email,
    password: password
  };

  const method = editingStudentId ? "PUT" : "POST";
  const url = editingStudentId ? `${STUDENT_API_URL}/${editingStudentId}` : STUDENT_API_URL;

  fetch(url, {
    method,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(student)
  })
    .then(res => res.text())
    .then(msg => {
      alert(msg);
      document.getElementById("studentForm").reset();
      editingStudentId = null;
      fetchStudents();
    })
    .catch(err => console.error("❌ Student Save Error:", err));
}

function fetchStudents() {
  fetch(STUDENT_API_URL)
    .then(res => res.json())
    .then(renderStudentTable)
    .catch(err => console.error("❌ Fetch students error:", err));
}

function renderStudentTable(students) {
  const tbody = document.querySelector("#students-table tbody");
  tbody.innerHTML = "";

  students.forEach(student => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${student.fullName}</td>
      <td>${student.studentId}</td>
      <td>${student.email}</td>
      <td>${student.password}</td>
      <td>
        <button class="action-btn edit-btn" onclick='editStudent(${JSON.stringify(student)})'>Edit</button>
        <button class="action-btn delete-btn" onclick='deleteStudent("${student.studentId}")'>Delete</button>
      </td>
    `;
    tbody.appendChild(row);
  });
}

function editStudent(student) {
  if (!confirm(`Edit student ${student.fullName}?`)) return;

  document.getElementById("studentName").value = student.fullName;
  document.getElementById("studentId").value = student.studentId;
  document.getElementById("studentEmail").value = student.email;
  document.getElementById("studentPassword").value = student.password;
  document.getElementById("confirmPassword").value = student.password;
  editingStudentId = student.studentId;
}

function deleteStudent(studentId) {
  if (!confirm("Delete this student?")) return;

  fetch(`${STUDENT_API_URL}/${studentId}`, { method: "DELETE" })
    .then(res => res.text())
    .then(msg => {
      alert(msg);
      fetchStudents();
    })
    .catch(err => console.error("❌ Delete student error:", err));
}

// ---------------- INSTRUCTOR MANAGEMENT ----------------
const INSTRUCTOR_API_URL = "http://localhost:8080/instructors";
let editingInstructorId = null;

function saveInstructor(event) {
  event.preventDefault();

  const name = document.getElementById("InstructorName").value.trim();
  const id = document.getElementById("InstructorID").value.trim();
  const exp = parseInt(document.getElementById("InstructorExp").value.trim());

  if (!name || !id || isNaN(exp)) {
    alert("❌ All fields are required.");
    return;
  }

  const instructor = {
    instructorName: name,
    instructorID: id,
    experience: exp
  };

  const method = editingInstructorId ? "PUT" : "POST";
  const url = editingInstructorId ? `${INSTRUCTOR_API_URL}/${editingInstructorId}` : INSTRUCTOR_API_URL;

  fetch(url, {
    method,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(instructor)
  })
    .then(res => res.text())
    .then(msg => {
      alert(msg);
      document.getElementById("instructorForm").reset();
      editingInstructorId = null;
      fetchInstructors();
    })
    .catch(err => console.error("❌ Instructor Save Error:", err));
}

function fetchInstructors() {
  fetch(INSTRUCTOR_API_URL)
    .then(res => res.json())
    .then(renderInstructorTable)
    .catch(err => console.error("❌ Fetch instructors error:", err));
}

function renderInstructorTable(instructors) {
  const tbody = document.querySelector("#instructors-table tbody");
  tbody.innerHTML = "";

  instructors.forEach(instructor => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${instructor.instructorName}</td>
      <td>${instructor.instructorID}</td>
      <td>${instructor.experience} years</td>
      <td>
        <button class="action-btn edit-btn" onclick='editInstructor(${JSON.stringify(instructor)})'>Edit</button>
        <button class="action-btn delete-btn" onclick='deleteInstructor("${instructor.instructorID}")'>Delete</button>
      </td>
    `;
    tbody.appendChild(row);
  });
}

function editInstructor(instructor) {
  if (!confirm(`Edit instructor ${instructor.instructorName}?`)) return;

  document.getElementById("InstructorName").value = instructor.instructorName;
  document.getElementById("InstructorID").value = instructor.instructorID;
  document.getElementById("InstructorExp").value = instructor.experience;
  editingInstructorId = instructor.instructorID;
}

function deleteInstructor(id) {
  if (!confirm("Delete this instructor?")) return;

  fetch(`${INSTRUCTOR_API_URL}/${id}`, { method: "DELETE" })
    .then(res => res.text())
    .then(msg => {
      alert(msg);
      fetchInstructors();
    })
    .catch(err => console.error("❌ Delete instructor error:", err));
}



// ---------------- VEHICLE MANAGEMENT ----------------
const VEHICLE_API_URL = "http://localhost:8080/vehicles";
let editingVehicleId = null;

function saveVehicle(event) {
  event.preventDefault();

  const number = document.getElementById("vehicleNumber").value.trim();
  const model = document.getElementById("model").value.trim();
  const type = document.getElementById("type").value;

  if (!number || !model || !type) {
    alert("❌ All fields are required for vehicle.");
    return;
  }

  const vehicle = {
    vehicleId: editingVehicleId || Date.now().toString(), // generate id if new
    vehicleNumber: number,
    model: model,
    vehicleType: type
  };

  const method = editingVehicleId ? "PUT" : "POST";
  const url = editingVehicleId ? `${VEHICLE_API_URL}/${editingVehicleId}` : VEHICLE_API_URL;

  fetch(url, {
    method,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(vehicle)
  })
    .then(res => res.text())
    .then(msg => {
      alert(msg);
      document.getElementById("vehicleForm").reset();
      editingVehicleId = null;
      fetchVehicles();
    })
    .catch(err => console.error("❌ Vehicle Save Error:", err));
}

function fetchVehicles() {
  fetch(VEHICLE_API_URL)
    .then(res => res.json())
    .then(renderVehicleTable)
    .catch(err => console.error("❌ Fetch vehicle error:", err));
}

function renderVehicleTable(vehicles) {
  const tbody = document.querySelector("#vehicles-table tbody");
  tbody.innerHTML = "";

  vehicles.forEach(vehicle => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${vehicle.vehicleNumber}</td>
      <td>${vehicle.model}</td>
      <td>${vehicle.vehicleType}</td>
      <td>
        <button class="action-btn edit-btn" onclick='editVehicle(${JSON.stringify(vehicle)})'>Edit</button>
        <button class="action-btn delete-btn" onclick='deleteVehicle("${vehicle.vehicleId}")'>Delete</button>
      </td>
    `;
    tbody.appendChild(row);
  });
}

function editVehicle(vehicle) {
  if (!confirm(`Edit vehicle ${vehicle.vehicleNumber}?`)) return;

  document.getElementById("vehicleNumber").value = vehicle.vehicleNumber;
  document.getElementById("model").value = vehicle.model;
  document.getElementById("type").value = vehicle.vehicleType;
  editingVehicleId = vehicle.vehicleId;
}

function deleteVehicle(id) {
  if (!confirm("Delete this vehicle?")) return;

  fetch(`${VEHICLE_API_URL}/${id}`, { method: "DELETE" })
    .then(res => res.text())
    .then(msg => {
      alert(msg);
      fetchVehicles();
    })
    .catch(err => console.error("❌ Delete vehicle error:", err));
}

// ---------------- LESSON QUEUE MANAGEMENT ----------------
const LESSON_API_URL = "http://localhost:8080/lesson-queue";

function saveLessonRequest(event) {
  event.preventDefault();

  const studentId = document.getElementById("lessonStudentId").value.trim();
  const studentName = document.getElementById("lessonStudentName").value.trim();
  const phone = document.getElementById("lessonPhone").value.trim();
  const email = document.getElementById("lessonEmail").value.trim();
  const course = document.getElementById("lessonCourse").value;
  const dateTime = document.getElementById("lessonDateTime").value;

  if (!studentId || !studentName || !phone || !email || !course || !dateTime) {
    alert("❌ All fields are required.");
    return;
  }

  const request = { studentId, studentName, phone, email, course, dateTime };

  fetch(LESSON_API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(request)
  })
    .then(res => res.text())
    .then(msg => {
      alert(msg);
      document.getElementById("lessonRequestForm").reset();
      fetchLessonRequests();
    })
    .catch(err => console.error("❌ Error saving lesson request:", err));
}

function fetchLessonRequests() {
  fetch(LESSON_API_URL)
    .then(res => res.json())
    .then(data => renderLessonRequestTable(data))
    .catch(err => console.error("❌ Error fetching requests:", err));
}

function renderLessonRequestTable(requests) {
  const tbody = document.querySelector("#lesson-queue-table tbody");
  tbody.innerHTML = "";

  requests.forEach((req, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${req.studentId}</td>
      <td>${req.studentName}</td>
      <td>${req.phone}</td>
      <td>${req.email}</td>
      <td>${req.course}</td>
      <td>${req.dateTime}</td>
    `;
    tbody.appendChild(row);
  });
}

//----------------------------------------
const PAYMENT_API_URL = "http://localhost:8080/payments";
let editingPaymentId = null;

function savePayment(event) {
  event.preventDefault();

  const studentId = document.querySelector('#payments input[placeholder="Student ID"]').value.trim();
  const amount = parseFloat(document.querySelector('#payments input[placeholder="Amount (LKR)"]').value.trim());
  const date = document.querySelector('#payments input[placeholder="Payment Date"]').value;

  if (!studentId || isNaN(amount) || !date) {
    alert("❌ All fields are required.");
    return;
  }

  const payment = {
    studentId,
    amount,
    paymentDate: date
  };

  console.log("🟢 Sending Payment:", payment);

  const method = editingPaymentId ? "PUT" : "POST";
  const url = editingPaymentId ? `${PAYMENT_API_URL}/${editingPaymentId}` : PAYMENT_API_URL;

  fetch(url, {
    method: method,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payment)
  })
    .then(res => {
      if (!res.ok) throw new Error("Failed to save payment");
      return res.text();
    })
    .then(msg => {
      alert(msg);
      document.querySelector('#payments form').reset();
      editingPaymentId = null;
      fetchPayments();
    })
    .catch(err => {
      console.error("❌ Save payment error:", err);
      alert("Error saving payment. Check console.");
    });
}

function fetchPayments() {
  fetch(PAYMENT_API_URL)
    .then(res => res.json())
    .then(data => renderPaymentTable(data))
    .catch(err => console.error("❌ Fetch payments error:", err));
}

function renderPaymentTable(payments) {
  const tbody = document.querySelector("#payments-table tbody");
  tbody.innerHTML = "";

  payments.forEach(payment => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${payment.studentId}</td>
      <td>${payment.amount}</td>
      <td>${payment.paymentDate}</td>
      <td>
        <button class="action-btn edit-btn" onclick='editPayment(${JSON.stringify(payment)})'>Edit</button>
        <button class="action-btn delete-btn" onclick='deletePayment("${payment.studentId}")'>Delete</button>
      </td>
    `;
    tbody.appendChild(row);
  });
}

function editPayment(payment) {
  if (!confirm(`Edit payment for ${payment.studentId}?`)) return;

  document.querySelector('#payments input[placeholder="Student ID"]').value = payment.studentId;
  document.querySelector('#payments input[placeholder="Amount (LKR)"]').value = payment.amount;
  document.querySelector('#payments input[placeholder="Payment Date"]').value = payment.paymentDate;

  editingPaymentId = payment.studentId;
}

function deletePayment(studentId) {
  if (!confirm("Delete this payment?")) return;

  fetch(`${PAYMENT_API_URL}/${studentId}`, {
    method: "DELETE"
  })
    .then(res => res.text())
    .then(msg => {
      alert(msg);
      fetchPayments();
    })
    .catch(err => console.error("❌ Delete payment error:", err));
}




window.onload = function () {
  fetchStudents();
  fetchInstructors();
  fetchVehicles(); 
  fetchLessonRequests();
  fetchPayments();
}
