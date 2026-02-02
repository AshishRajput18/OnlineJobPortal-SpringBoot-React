import Header from "./components/HomeComponent/Header";
import HeroSection from "./components/HomeComponent/HeroSection";
import JobsGrid from "./components/HomeComponent/JobsGrid";
import Footer from "./components/HomeComponent/Footer";
import EmployerForm from "./components/HomeComponent/EmployerForm";
import { Routes, Route } from "react-router-dom";
import EmployeeForm from "./components/HomeComponent/EmployeeForm";
import LoginForm from "./components/HomeComponent/LoginForm";
import About from "./components/HomeComponent/About";
import ContactUs from "./components/HomeComponent/ContactUs";

import RegisterAdmin from "./components/Admin/RegisterAdmin";
import AddCategory from "./components/Admin/AddCategory";
import AllCategories from "./components/Admin/AllCategories";
import UpdateCategory from "./components/Admin/UpdateCategory";
import AllJobs from "./components/Admin/AllJobs";
import AllApplications from "./components/Admin/AllApplications";
import ViewEmployers from "./components/Admin/ViewEmployers";
import ViewEmployees from "./components/Admin/ViewEmployees";
import AddJob from "./components/Employer/AddJob";
import MyJobs from "./components/Employer/MyJobs";
import JobApplications from "./components/Employer/JobApplications";
import UserProfile from "./components/Employer/UserProfile";
import AppliedJobs from "./components/Employees/AppliedJobs";
import EmployeeProfile from "./components/Employees/EmployeeProfile";
import UpdateProfileForm from "./components/Employees/UpdateProfileForm";
import UserProfileWithAdd from "./components/Employees/UserProfileWithAdd";
import AllApplicationsId from "./components/Admin/AllApplicationsId";
import JobApplicationsId from "./components/Employer/JobApplicationsId";

function App() {
  return (
    <>
      {/* HEADER (always visible) */}
      <Header />

      {/* MAIN CONTENT */}
      <main>
       <Routes>
  {/* HOME PAGE */}
  <Route
    path="/"
    element={
      <>
        <HeroSection />
        <JobsGrid />
        <Footer />
      </>
    }
  />

  {/* REGISTER EMPLOYER */}
  <Route path="/register/employer" element={<EmployerForm />} />

  {/* REGISTER EMPLOYEE */}
  <Route path="/register/employee" element={<EmployeeForm />} />

  {/* USER LOGIN */}
  <Route path="/user/login" element={<LoginForm />} />

  {/* ABOUT PAGE */}
  <Route path="/about" element={<About />} />

  {/* CONTACT US PAGE */}
  <Route path="/contact" element={<ContactUs />} />

  <Route path="/register/admin" element={<RegisterAdmin />} />
  <Route path="/add-category" element={<AddCategory />} />
  <Route path="/all-categories" element={<AllCategories />} />
    {/* Dynamic route for updating category */}
      <Route path="/update-category/:id" element={<UpdateCategory />} />
  <Route path="/all-jobs" element={<AllJobs />} />
  <Route path="/all-applications" element={<AllApplications />} />
   <Route path="/all-applications/:jobId" element={<AllApplicationsId />} />
  <Route path="/view-employers" element={<ViewEmployers />} />
  <Route path="/view-employees" element={<ViewEmployees />} />
  



  <Route path="/add-job" element={<AddJob />} />
  <Route path="/my-jobs" element={<MyJobs />} />
  <Route path="/job-applications" element={<JobApplications />} /> 
     {/* User Profile Page */}
      <Route path="/user-profile/:employeeId" element={<UserProfile />} />

      <Route path="/my-jobs/applications/:jobId" element={<JobApplicationsId />} />



      <Route path="/applied-jobs" element={<AppliedJobs />} />
        <Route path="/employee-profile" element={<EmployeeProfile />} />
        <Route path="/update-profile" element={<UpdateProfileForm />} />
        <Route path="/user-profiles" element={<UserProfileWithAdd />} />

</Routes>


  
      </main>
    </>
  );
}

export default App;
