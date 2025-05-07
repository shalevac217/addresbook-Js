const email = document.getElementById('email');
const fullName = document.getElementById('fullName');
const password = document.getElementById('password');
const confirmPassword = document.getElementById('confirmPassword');
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

confirmPassword.onblur = () => {
    const passwordValue = password.value;
    const confirmPasswordValue = confirmPassword.value;
    let errors = []; // Array to store errors
    err.textContent = ""; // Clear previous errors

    if (confirmPasswordValue !== passwordValue) {
        errors.push("הסיסמאות אינן תואמות");
        confirmPassword.classList.add('invalid');
        confirmPassword.classList.remove('valid');
    } else {
        confirmPassword.classList.remove('invalid');
        confirmPassword.classList.add('valid');
    }

    err.textContent = errors.join("\n"); // Display errors
};

document.querySelector("form").addEventListener("submit", async function (event) {
    event.preventDefault();

    const emailValue = email.value.trim();
    const fullNameValue = fullName.value.trim();
    const passwordValue = password.value;
    const confirmPasswordValue = confirmPassword.value;

    if (passwordValue !== confirmPasswordValue) {
        err.textContent = "הסיסמאות אינן תואמות";
        return;
    }

    try {
        // ✅ Send signup request
        const signupResponse = await fetch("/api/users/signup", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email: emailValue, name: fullNameValue, password: passwordValue }),
        });

        const signupData = await signupResponse.json();
        console.log("Signup response:", signupData); // ✅ Debugging output

        if (!signupResponse.ok || !signupData.token) {
            err.textContent = signupData.error || "שגיאה ביצירת משתמש.";
            return;
        }

        console.log("משתמש נוצר בהצלחה! מחבר אותך אוטומטית...");

        // ✅ Store token and redirect
        localStorage.setItem("token", signupData.token);
        localStorage.setItem("userId", signupData.userId);
        window.location.href = "/contacts"; // ✅ Redirect after signup

    } catch (error) {
        console.error("Error during signup:", error);
        err.textContent = "שגיאה בהרשמה, נסה שוב.";
    }
});