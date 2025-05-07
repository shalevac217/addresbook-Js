document.addEventListener("DOMContentLoaded", async function () {
    const urlParams = new URLSearchParams(window.location.search);
    const contactId = urlParams.get("id");

    if (!contactId) {
        console.log("שגיאה: אין מזהה איש קשר.");
        window.location.href = "/contacts";
        return;
    }

    try {
        const token = localStorage.getItem("token");
        const response = await fetch(`http://localhost:3000/api/contacts/${contactId}`, {
            headers: { Authorization: `Bearer ${token}` }
        });

        const contact = await response.json();
        console.log("Loaded contact:", contact); // ✅ Debugging output

        // ✅ Ensure fields match API response
        document.getElementById("name").value = contact.full_name || "לא צוין";
        document.getElementById("phone").value = contact.phone_number || "לא צוין";
        document.getElementById("address").value = contact.address || "לא צוין"; // ✅ Ensure correct field usage

    } catch (error) {
        console.error("Error loading contact:", error);
        console.log("שגיאה בטעינת איש הקשר.");
    }
});

// ✅ Function to update existing contact
document.getElementById("editContactForm").addEventListener("submit", async function (event) {
    event.preventDefault();

    const token = localStorage.getItem("token");
    if (!token) {
        console.log("אתה לא מחובר, יש להתחבר תחילה.");
        window.location.href = "/login";
        return;
    }

    const contactId = new URLSearchParams(window.location.search).get("id"); // ✅ Get contact ID
    const formData = {
        name: document.getElementById("name").value.trim(),
        phone: document.getElementById("phone").value.trim(),
        address: document.getElementById("address").value.trim()
    };

    try {
        const response = await fetch(`/api/contacts/${contactId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(formData)
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || "שגיאה בעדכון איש קשר.");
        }

        console.log("איש הקשר עודכן בהצלחה!");
        window.location.href = "/contacts"; // ✅ Redirect back to contacts page

    } catch (error) {
        console.error("Error updating contact:", error);
        console.log("שגיאה בעדכון איש קשר, נסה שוב.");
    }
});