document.addEventListener("DOMContentLoaded", async function () {
    const token = localStorage.getItem("token");
    if (!token) {
        console.log("האסימון לא פעיל, יש להתחבר מחדש.");
        window.location.href = "/login";
        return;
    }
});

document.addEventListener("DOMContentLoaded", async function () {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");

    if (!token || !userId) {
        console.error("User not authenticated");
        window.location.href = "/login"; // Redirect if not logged in
        return;
    }

    try {
        const response = await fetch(`http://localhost:3000/api/contacts/user/${userId}`, { // ✅ Ensure correct API URL
            headers: { Authorization: `Bearer ${token}` }
        });

        if (!response.ok) throw new Error("Unauthorized access");

        const contacts = await response.json();
        console.log("Fetched contacts:", contacts); // ✅ Debug output

        displayContacts(contacts); // ✅ Render contacts correctly
    } catch (error) {
        console.error("Error fetching contacts:", error);
    }

    // ✅ Attach event listener to "Add Contact" button
    document.getElementById("addContactBtn").addEventListener("click", function () {
        window.location.href = "/add-contact";
    });
});
function editContact(contactId) {
    console.log("Editing contact ID:", contactId); // ✅ Debugging output
    window.location.href = `/edit-contact?id=${contactId}`;
}

// ✅ Ensure edit button correctly references `idaddresses`
function displayContacts(contacts) {
    const tableBody = document.querySelector("table");

    contacts.forEach(contact => {
        console.log("Displaying contact:", contact); // ✅ Debugging output

        const row = document.createElement("tr");
        row.classList.add("Data");

        row.innerHTML = `
            <th>${contact.full_name || "לא צוין"}</th>
            <th>${contact.phone_number || "לא צוין"}</th>
            <th>${contact.address || "לא צוין"}</th>
            <th>
                <button onclick="editContact('${contact.idaddresses}')">✏️ ערוך</button>
                <button onclick="deleteContact('${contact.idaddresses}')">🗑️ מחק</button>
            </th>
        `;

        tableBody.appendChild(row);
    });
}
// ✅ Function to delete contact
async function deleteContact(contactId) {
    if (!confirm("האם אתה בטוח שברצונך למחוק את איש הקשר הזה?")) return;

    try {
        const token = localStorage.getItem("token");
        const response = await fetch(`http://localhost:3000/api/contacts/${contactId}`, { // ✅ Ensure correct API URL
            method: "DELETE",
            headers: { Authorization: `Bearer ${token}` }
        });

        if (!response.ok) throw new Error("Failed to delete contact.");

        console.log("איש הקשר נמחק בהצלחה!");
        location.reload(); // ✅ Refresh contacts list

    } catch (error) {
        console.error("Error deleting contact:", error);
        console.log("שגיאה במחיקת איש הקשר.");
    }
}