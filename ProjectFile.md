# 🗂 תיק פרויקט לפיתוח Web – Address Book

## 1. אפיון ותכנון הפרויקט

### 1.1 שם ותיאור הפרויקט

- **שם הפרויקט**: Address Book  
- **תיאור כללי**: מערכת אינטרנטית לניהול אנשי קשר. כל משתמש יכול להירשם, להתחבר, להוסיף, לערוך ולמחוק אנשי קשר הכוללים שם, טלפון וכתובת.  
- **בעיה שהפרויקט פותר**: מאפשר למשתמשים לנהל אנשי קשר בממשק קל ונגיש במקום לכתוב פתקים או להשתמש בקבצים מסובכים.  
- **קהל יעד**: כל אדם שזקוק לרשימה מאורגנת של אנשי קשר: תלמידים, סטודנטים, בעלי עסקים ואנשים פרטיים.

### 1.2 דרישות מערכת

#### דרישות פונקציונליות
- הרשמה והתחברות מאובטחת  
- הוספה, עדכון ומחיקה של אנשי קשר  
- חיפוש אנשי קשר  
- הצגת אנשי קשר בטבלה מסודרת

#### דרישות טכניות
- Frontend: HTML, CSS, JavaScript  
- Backend: Node.js, Express  
- ORM: Sequelize  
- Database: MySQL  
- Authentication: JWT  
- Password Hashing: bcrypt

---

## 2. תכנון מבנה האפליקציה

### 2.1 מבנה תיקיות


/address-book ├── /client/ │   ├── /pages/ │   ├── /css/ │   ├── /js/ │   └── /CustomElements/ ├── /server/ │   ├── server.js │   ├── package.json │   └── /src/ │       ├── /routes/ │       ├── /controllers/ │       ├── /models/ │       ├── /middleware/ │       └── /config/


### 2.2 ניווט

- `/` – עמוד הבית  
- `/signup` – הרשמה  
- `/login` – התחברות  
- `/contacts` – אנשי קשר  
- `/add-contact` – הוספת איש קשר  
- `/edit-contact?id=...` – עריכת איש קשר  
- `/404` – דף שגיאה מותאם

---

## 3. פיתוח צד לקוח (Frontend)

### 3.1 HTML

- שימוש ברכיב `<custom-nav>` לניווט קבוע
- דפים: `index.html`, `signup.html`, `login.html`, `contacts.html`, `add-contact.html`, `edit-contact.html`, `404.html`

### 3.2 JavaScript

- `signup.js` – אימות טופס, שליחה ל־API, שמירת JWT  
- `login.js` – התחברות, שמירת token והפניה  
- `newContact.js` – הוספה/עדכון איש קשר  
- `editContact.js` – טעינת פרטים לעריכה לפי מזהה  
- `contacts.js` – שליפת אנשי קשר, הצגה, מחיקה, עריכה  
- `nav.js` – טענת תפריט לפי סטטוס התחברות + התנתקות

### 3.3 CSS

- עיצוב אחיד ורספונסיבי לכל העמודים  
- תאימות מלאה ל-RTL  
- צבעי תכלת, ירוק ובז'  

---

## 4. פיתוח צד שרת (Backend)

### 4.1 server.js – הגדרה כללית

```javascript
const express = require('express');
const path = require('path');
const sequelize = require('./src/config/database');
const userRoutes = require('./src/routes/userRoutes');
const contactRoutes = require('./src/routes/contactRoutes');
// הגדרות routes, static, הפעלת השרת...

4.2 ניתובים עיקריים

/api/users/signup – יצירת משתמש עם bcrypt

/api/users/login – התחברות עם JWT

/api/contacts – CRUD לאנשי קשר, עם אימות

כל הנתיבים מוגנים על ידי authMiddleware.js

4.3 Controllers

userController.js – יצירה, התחברות, מחיקה

contactController.js – ניהול אנשי קשר לפי משתמש

5. מסד נתונים

CREATE TABLE users (
  idusers INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(45),
  email VARCHAR(45) UNIQUE,
  password VARCHAR(255)
);

CREATE TABLE contacts (
  idaddresses INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT,
  full_name VARCHAR(100),
  phone_number VARCHAR(20),
  address VARCHAR(255),
  FOREIGN KEY (user_id) REFERENCES users(idusers) ON DELETE CASCADE
);

6. בדיקות ואבטחת מידע

אבטחה

הצפנת סיסמאות עם bcrypt

אימות משתמשים עם jsonwebtoken

שימוש ב־middleware לבדיקת אסימון

בדיקות

טופסי התחברות והרשמה – בדיקת שדות חובה

הרשאה לניהול אנשי קשר – רק למשתמש המחובר

הודעות שגיאה בשפות מתאימות

כפתורי מחיקה עם confirm()

7. הצגת הפרויקט

הצעות למצגת

שקופית 1 – שם, תאריך

שקופית 2 – תיאור קצר + קהל יעד

שקופית 3 – תרשים מערכת או מבנה תיקיות

שקופית 4 – צילום מסך או השראה גרפית

שקופית 5 – צילום מסך של טופס או טבלה

שקופית 6 – טכנולוגיות בשימוש

שקופית 7 – הפקת לקחים ותובנות

🔖 נוצר על ידי שליו במסגרת פרויקט גמר במדעי המחשב (פיתוח Web)


---

כשתעתיק את זה, תוכל:
1. לשמור כ־`ProjectReport.md`
2. להציג כקובץ Markdown ב־VS Code / GitHub / Notepad++
3. או להמיר ל־Word / PDF תוך שמירה על סגנון

רוצה שאכין גם גרסת HTML במקרה שתרצה להגיש את זה כדף אינטרנט? 💡📄
