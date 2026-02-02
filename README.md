# 🏢 Online Job Portal — Full Stack Project

**Spring Boot + React JS + MySQL**

---

## 📝 Project Overview
This **Online Job Portal** application allows **Employers** to post jobs and **Employees** to find and apply for them. The project is built using a modern **full-stack tech stack**, with secure authentication and role-based access for **Admin, Employer, and Employee** users.

---

## 🚀 Key Features

### 🔐 Authentication
- Secure login and registration using **Spring Security with JWT**
- Three user roles: **Admin**, **Employer**, **Employee**

### 🧑‍💼 Admin Module
- Add, view, update, delete **Job Categories**
- View all **Employers, Employees, Jobs, and Job Applications**
- Manage system users and content

### 👨‍💼 Employer Module
- Register and login
- Add new **job postings** with details (title, category, skills, salary, experience, etc.)
- View and delete jobs
- View applicants and update **job application status**

### 👨‍🎓 Employee Module
- Register and login
- Update personal profile (**education, experience, skills**)
- Search and apply for jobs
- View and cancel applied jobs

---

## 🛠 Tech Stack

**Backend:**
- Java
- Spring Boot 3
- Spring Security 6
- JWT Authentication
- REST APIs
- Maven

**Frontend:**
- React JS
- Bootstrap
- Axios for API calls

**Database:**
- MySQL

**IDE:**
- Spring Tool Suite (STS) or IntelliJ IDEA
- VS Code for React
- MySQL Workbench

---

## 🖥 Software Used
- **STS (Spring Tool Suite)** for backend
- **VS Code** for frontend
- **MySQL Workbench** for database management

> 💡 Note: You can use other IDEs or databases (PostgreSQL, Oracle) with simple configuration changes.

---

## ⚙️ Functional Modules

1. **User Authentication Module:**  
   Registration and login system for authenticated users. Uses **Spring Security + JWT**.

2. **Employer Module:**  
   Register, login, post jobs, view applicants, update job status.

3. **Employee Module:**  
   Register, login, update profile, search jobs, apply/cancel jobs.

4. **Job Category Module:**  
   Add, view, update, delete job categories.

5. **Job Module:**  
   Add jobs, view jobs, search jobs by category, type, salary.

6. **Job Application Module:**  
   Apply for jobs, view job applications, update application status.

---

## 📌 How to Run the Project

### Backend (Spring Boot)
1. Clone the repository:
   ```bash
   git clone https://github.com/<your-username>/OnlineJobPortal-SpringBoot-React.git
Got it! You want the **instructions, roles, repository structure, and license** all in a **clean, properly formatted block** so you can copy-paste it easily. Here's the **ready-to-use Markdown snippet** for your README:

---

````markdown
## ⚙️ How to Run the Project

### Backend (Spring Boot)
1. Open the project with **STS** or **IntelliJ IDEA**
2. Configure `application.properties` for your **MySQL database**
3. Run the backend:
   ```bash
   mvn spring-boot:run
````

### Frontend (React JS)

1. Navigate to the frontend folder:

   ```bash
   cd frontend
   ```
2. Install dependencies:

   ```bash
   npm install
   ```
3. Start the React app:

   ```bash
   npm start
   ```

> 🌐 The frontend will run on `http://localhost:3000` and backend on `http://localhost:8080`

---

## 🏷 Roles of Users

### 👑 Admin Role

* Login with default credentials:
  `Email: demo.admin@demo.com`
  `Password: 123456`
* Register other admins
* Manage job categories, jobs, users, and applications

### 🏢 Employer Role

* Register and login
* Post jobs with company details
* View and delete jobs
* See applicants for their posted jobs

### 👨‍💻 Employee Role

* Register and login
* Update profile (education, experience, skills)
* Search and apply for jobs
* View applied jobs and cancel if needed

---

## 📁 Repository Structure

```
OnlineJobPortal-SpringBoot-React/
│
├── backend/          # Spring Boot Backend
│   ├── src/main/java/com/backend
│   ├── src/main/resources/application.properties
│   └── pom.xml
│
├── frontend/         # React JS Frontend
│   ├── src/components
│   ├── src/pages
│   ├── public
│   └── package.json
│
└── README.md
```

