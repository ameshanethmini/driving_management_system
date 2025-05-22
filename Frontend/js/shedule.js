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

window.onload = function () {
  fetchLessonRequests();
};

