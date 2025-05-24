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

  const method = editingPaymentId ? "PUT" : "POST";
  const url = editingPaymentId ? `${PAYMENT_API_URL}/${editingPaymentId}` : PAYMENT_API_URL;

  fetch(url, {
    method: method,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payment)
  })
    .then(res => res.text())
    .then(msg => {
      alert(msg);
      document.querySelector('#payments form').reset();
      editingPaymentId = null;
      fetchPayments();
    })
    .catch(err => console.error("❌ Save payment error:", err));
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
  fetchPayments();
};
