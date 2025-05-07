document.addEventListener("DOMContentLoaded", async function () {
    const urlParams = new URLSearchParams(window.location.search);
    const contactId = urlParams.get("id"); // ✅ Get ID from URL

    if (contactId) {
        // ✅ Fetch existing contact details to pre-fill form
        const token = localStorage.getItem("token");
        try {
            const response = await fetch(`/api/contacts/${contactId}`, {
                headers: { Authorization: `Bearer ${token}` }
            });

            if (!response.ok) throw new Error("Failed to fetch contact");

            const contact = await response.json();

            // ✅ Pre-fill form with existing contact details
            document.getElementById("firstName").value = contact.first_name;
            document.getElementById("lastName").value = contact.last_name;
            document.getElementById("email").value = contact.email;
            document.getElementById("phone").value = contact.phone;
            document.getElementById("address").value = contact.address;
        } catch (error) {
            console.error("Error loading contact:", error);
            console.log("שגיאה בטעינת איש קשר.");
        }
    }
});

// ✅ Modify the form submission to update an existing contact if editing
document.getElementById("newContactForm").addEventListener("submit", async function (event) {
    event.preventDefault();

    const token = localStorage.getItem("token");
    if (!token) {
        console.log("אתה לא מחובר, יש להתחבר תחילה.");
        window.location.href = "/login";
        return;
    }

    const formData = {
        full_name: document.getElementById("name").value.trim(),
        phone_number: document.getElementById("phone").value.trim(),
        address: document.getElementById("address").value.trim()
    };

    console.log("Sent request data:", formData); // ✅ Debugging check

    const contactId = new URLSearchParams(window.location.search).get("id"); // ✅ Get contact ID if editing
    const method = contactId ? "PUT" : "POST"; // ✅ If editing, use PUT instead of POST
    const endpoint = contactId ? `/api/contacts/${contactId}` : "/api/contacts";

    try {
        const response = await fetch(endpoint, {
            method: method,
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(formData)
        });

        const data = await response.json();

        console.log("Response data:", data); // ✅ Debugging response

        if (!response.ok) {
            throw new Error(data.error || "שגיאה בהוספת איש קשר.");
        }

        console.log(contactId ? "איש הקשר עודכן בהצלחה!" : "איש הקשר נוסף בהצלחה!");
        window.location.href = "/contacts"; // ✅ Redirect back to contacts page

    } catch (error) {
        console.error("Error updating contact:", error);
        console.log("שגיאה בהוספת איש קשר, נסה שוב.");
    }
});