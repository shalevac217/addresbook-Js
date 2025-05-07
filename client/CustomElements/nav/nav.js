class CustomNav extends HTMLElement {
    constructor() {
        super();
    }

    async connectedCallback() {
        console.log("Fetching navbar...");
    
        try {
            const response = await fetch("/nav.html"); // ✅ Fetch nav.html correctly
            const html = await response.text();
    
            // ✅ Extract only the template content
            const tempDiv = document.createElement("div");
            tempDiv.innerHTML = html;
    
            const template = tempDiv.querySelector("#nav-template");
            if (!template) {
                console.error("Nav template not found in nav.html!");
                return;
            }
    
            // Append content to `<custom-nav>`
            this.appendChild(template.content.cloneNode(true));
    
            this.updateNav();
            this.setupBurgerMenu();
        } catch (error) {
            console.error("Error fetching navbar:", error);
        }
    }
    
    updateNav() {
        const loginLink = this.querySelector("#loginLink");
        const signupLink = this.querySelector("[href='/signup']"); // ✅ Target signup link
        const logoutLink = this.querySelector("#logoutLink");
        const contactsLink = this.querySelector("#contactsLink");
        const token = localStorage.getItem("token"); // ✅ Check if user is logged in

        if (token) {
            loginLink.style.display = "none";
            signupLink.style.display = "none";
            logoutLink.style.display = "inline";
            contactsLink.style.display = "inline";

            logoutLink.onclick = () => {
                localStorage.removeItem("token");
                window.location.href = "/login"; // Redirect after logout
            };
        } else {
            loginLink.style.display = "inline";
            signupLink.style.display = "inline";
            logoutLink.style.display = "none";
            contactsLink.style.display = "none";
        }
    }
    
    setupBurgerMenu() {
        const burger = this.querySelector(".burger");
        const navLinks = this.querySelector(".nav-links");

        burger.addEventListener("click", () => {
            navLinks.classList.toggle("nav-active");
            burger.classList.toggle("toggle");
        });
    }
}

// ✅ Register custom `<custom-nav>` element
customElements.define("custom-nav", CustomNav);