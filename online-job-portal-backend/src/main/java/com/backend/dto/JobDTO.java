package com.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data

public class JobDTO {

    private Long id;
    private String logo;
    private String title;
    private String category;
    private String type;
    private String salary;
    private String exp;
    private String company;
    private String companyAddress;
    private String employerName;
    private String employerEmail;
    private String employerContact;
    private String jobDescription;
    private String jobCategory;
    private String requiredSkills;
    private String datePosted;
    private Integer applicants;
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getLogo() {
		return logo;
	}
	public void setLogo(String logo) {
		this.logo = logo;
	}
	public String getTitle() {
		return title;
	}
	public void setTitle(String title) {
		this.title = title;
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
	public String getExp() {
		return exp;
	}
	public void setExp(String exp) {
		this.exp = exp;
	}
	public String getCompany() {
		return company;
	}
	public void setCompany(String company) {
		this.company = company;
	}
	public String getCompanyAddress() {
		return companyAddress;
	}
	public void setCompanyAddress(String companyAddress) {
		this.companyAddress = companyAddress;
	}
	public String getEmployerName() {
		return employerName;
	}
	public void setEmployerName(String employerName) {
		this.employerName = employerName;
	}
	public String getEmployerEmail() {
		return employerEmail;
	}
	public void setEmployerEmail(String employerEmail) {
		this.employerEmail = employerEmail;
	}
	public String getEmployerContact() {
		return employerContact;
	}
	public void setEmployerContact(String employerContact) {
		this.employerContact = employerContact;
	}
	public String getJobDescription() {
		return jobDescription;
	}
	public void setJobDescription(String jobDescription) {
		this.jobDescription = jobDescription;
	}
	public String getJobCategory() {
		return jobCategory;
	}
	public void setJobCategory(String jobCategory) {
		this.jobCategory = jobCategory;
	}
	public String getRequiredSkills() {
		return requiredSkills;
	}
	public void setRequiredSkills(String requiredSkills) {
		this.requiredSkills = requiredSkills;
	}
	public String getDatePosted() {
		return datePosted;
	}
	public void setDatePosted(String datePosted) {
		this.datePosted = datePosted;
	}
	public Integer getApplicants() {
		return applicants;
	}
	public void setApplicants(Integer applicants) {
		this.applicants = applicants;
	}
	public JobDTO(Long id, String logo, String title, String category, String type, String salary, String exp,
			String company, String companyAddress, String employerName, String employerEmail, String employerContact,
			String jobDescription, String jobCategory, String requiredSkills, String datePosted, Integer applicants) {
		super();
		this.id = id;
		this.logo = logo;
		this.title = title;
		this.category = category;
		this.type = type;
		this.salary = salary;
		this.exp = exp;
		this.company = company;
		this.companyAddress = companyAddress;
		this.employerName = employerName;
		this.employerEmail = employerEmail;
		this.employerContact = employerContact;
		this.jobDescription = jobDescription;
		this.jobCategory = jobCategory;
		this.requiredSkills = requiredSkills;
		this.datePosted = datePosted;
		this.applicants = applicants;
	}
	public JobDTO() {
		super();
		// TODO Auto-generated constructor stub
	}
    
    
}
