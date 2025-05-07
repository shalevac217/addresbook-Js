const express = require('express');
const path = require('path');
const sequelize = require('./src/config/database');
const userRoutes = require('./src/routes/userRoutes');
const contactRoutes = require('./src/routes/contactRoutes');

const port = 3000
const app = express();
app.use(express.json());

// Serve static files (CSS, images, JS)
app.use(express.static(path.join(__dirname, '../client')));
app.get("/test", (req, res) => {
    console.log("Test route accessed!");
    res.send("Middleware test successful.");
});
// API routes
app.use('/api/users', userRoutes);
app.use('/api/contacts', contactRoutes);

app.get("/nav.html", (req, res) => {
    res.sendFile(path.join(__dirname, "../client/CustomElements/nav/nav.html"));
});
app.get("/nav.css", (req, res) => {
    res.sendFile(path.join(__dirname, "../client/CustomElements/nav/nav.css"));
});

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../client/pages/index.html"));
});

app.get("/login", (req, res) => {
    res.sendFile(path.join(__dirname, "../client/pages/login.html"));
});

app.get("/signup", (req, res) => {
    res.sendFile(path.join(__dirname, "../client/pages/signup.html"));
});
app.get("/contacts", (req, res) => {
    res.sendFile(path.join(__dirname, "../client/pages/contacts.html"));
});

app.get("/add-contact", (req, res) => {
    res.sendFile(path.join(__dirname, "../client/pages/newContact.html"));
});

app.get("/edit-contact", (req, res) => {
    res.sendFile(path.join(__dirname, "../client/pages/editContact.html"));
});

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../client/pages/404.html"));
})
// Sync DB and Start Server
sequelize.sync()
    .then(() => console.log('Database synced'))
    .catch(err => console.error('Database sync error:', err));
app.listen(port, () =>  console.log(`Server listening at Port ${port} and url http://localhost:${port}`));
