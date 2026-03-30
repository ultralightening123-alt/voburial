const scode = "vobpage123";
const messageElement = document.getElementById("message");
const codeInput = document.getElementById("codeinp");
const currentPage = window.location.pathname.split("/").pop().toLowerCase() || "index.html";
const query = new URLSearchParams(window.location.search);

const approvedFromQuery = query.get("approved") === "true";
const postApprovedFromQr = query.get("postapproved") === "true";

if (approvedFromQuery || postApprovedFromQr) {
    localStorage.setItem("approved", "true");
}

const isApproved = localStorage.getItem("approved") === "true";

if (currentPage === "main.html") {
    if (!isApproved) {
        window.location.href = "code.html";
    }
} else if (currentPage === "index.html" || currentPage === "") {
    if (isApproved) {
        window.location.href = "main.html";
    } else {
        window.location.href = "code.html";
    }
} else if (currentPage === "code.html") {
    if (isApproved) {
        window.location.href = "main.html";
    }
}

function checkCode() {
    if (!codeInput || !messageElement) return;
    const userCode = codeInput.value.trim();
    if (userCode === scode) {
        localStorage.setItem("approved", "true");
        window.location.href = "main.html";
    } else {
        messageElement.textContent = "Incorrect code. Please try again.";
    }
}