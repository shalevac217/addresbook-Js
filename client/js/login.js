const email = document.getElementById('email');
const password = document.getElementById('password');
const err = document.getElementById('err');

email.onblur = () => {
    const emailValue = email.value.trim();
    let errors = []; // Array to store errors
    err.textContent = ""; // Clear previous errors

    if (emailValue === "") {
        errors.push("לא הכנסת אימייל");
        email.classList.remove('valid', 'invalid');
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailValue)) {
        errors.push("האימייל שהוכנס אינו תקין");
        email.classList.add('invalid');
        email.classList.remove('valid');
    } else {
        email.classList.remove('invalid');
        email.classList.add('valid');
    }

    err.textContent = errors.join("\n"); // Display errors
};
password.onblur = () => {
    const passwordValue = password.value;
    let errors = []; // Array to store errors
    err.textContent = ""; // Clear previous errors

    if (passwordValue.length < 8) {
        errors.push("הסיסמה חייבת להיות לפחות 8 תווים");
        password.classList.add('invalid');
        password.classList.remove('valid');
    } else {
        password.classList.remove('invalid');
        password.classList.add('valid');
    }

    err.textContent = errors.join("\n"); // Display errors
};

document.querySelector("form").addEventListener("submit", async function(event) {
    event.preventDefault(); // Prevent form from refreshing the page

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const errorDiv = document.getElementById("err"); // Error message container

    try {
        const response = await fetch('/api/users/login', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();

        if (response.ok) {
            localStorage.setItem("token", data.token);  // Store JWT token
            localStorage.setItem("userId", data.userId); // Store user ID
            window.location.href = "contacts"; // Redirect after successful login
        } else {
            errorDiv.innerText = data.error; // Show login error
        }
    } catch (error) {
        errorDiv.innerText = "שגיאה בהתחברות. נסה שוב.";
        console.error("Login error:", error);
    }
});
