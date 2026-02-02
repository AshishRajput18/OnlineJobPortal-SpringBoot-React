package com.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@Builder

@AllArgsConstructor
public class JobApplicationResponse {

    private String applicationId;
    private String appliedDate;     // formatted string
    private String status;

    private Long jobId;
    private String jobTitle;
    private String category;
    private String type;
    private String salary;
    private String experience;
    private String skills;

    private String companyName;
    private String companyLogo;

    private Long employeeId;   // IMPORTANT
    private String employeeName;
    private String location;
	public String getApplicationId() {
		return applicationId;
	}
	public void setApplicationId(String applicationId) {
		this.applicationId = applicationId;
	}
	public String getAppliedDate() {
		return appliedDate;
	}
	public void setAppliedDate(String appliedDate) {
		this.appliedDate = appliedDate;
	}
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	public Long getJobId() {
		return jobId;
	}
	public void setJobId(Long jobId) {
		this.jobId = jobId;
	}
	public String getJobTitle() {
		return jobTitle;
	}
	public void setJobTitle(String jobTitle) {
		this.jobTitle = jobTitle;
	}
	public String getCategory() {
		return category;
	}
	public void setCategory(String category) {
		this.category = category;
	}
	public String getType() {
		return type;
	}
	public void setType(String type) {
		this.type = type;
	}
	public String getSalary() {
		return salary;
	}
	public void setSalary(String salary) {
		this.salary = salary;
	}
	public String getExperience() {
		return experience;
	}
	public void setExperience(String experience) {
		this.experience = experience;
	}
	public String getSkills() {
		return skills;
	}
	public void setSkills(String skills) {
		this.skills = skills;
	}
	public String getCompanyName() {
		return companyName;
	}
	public void setCompanyName(String companyName) {
		this.companyName = companyName;
	}
	public String getCompanyLogo() {
		return companyLogo;
	}
	public void setCompanyLogo(String companyLogo) {
		this.companyLogo = companyLogo;
	}
	public String getEmployeeName() {
		return employeeName;
	}
	public void setEmployeeName(String employeeName) {
		this.employeeName = employeeName;
	}
	public String getLocation() {
		return location;
	}
	public void setLocation(String location) {
		this.location = location;
	}
	
	public Long getEmployeeId() {
		return employeeId;
	}
	public void setEmployeeId(Long employeeId) {
		this.employeeId = employeeId;
	}
	public JobApplicationResponse() {
		super();
		// TODO Auto-generated constructor stub
	}
	public JobApplicationResponse(String applicationId, String appliedDate, String status, Long jobId, String jobTitle,
			String category, String type, String salary, String experience, String skills, String companyName,
			String companyLogo, String employeeName, String location,Long employeeId) {
		super();
		this.applicationId = applicationId;
		this.appliedDate = appliedDate;
		this.status = status;
		this.jobId = jobId;
		this.jobTitle = jobTitle;
		this.category = category;
		this.type = type;
		this.salary = salary;
		this.experience = experience;
		this.skills = skills;
		this.companyName = companyName;
		this.companyLogo = companyLogo;
		this.employeeName = employeeName;
		this.location = location;
		this.employeeId = employeeId;
	}
    
    
}