package com.backend.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class JobResponse {

    private Long id;
    private String companyName;
    private String logo;
    private String jobTitle;
    private String jobDescription;
    private String category;
    private String type;
    private String salary;
    private String experience;
    private String skills;
    private String city;
    private String postedDate;
    private long applicationCount;
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getCompanyName() {
		return companyName;
	}
	public void setCompanyName(String companyName) {
		this.companyName = companyName;
	}
	public String getLogo() {
		return logo;
	}
	public void setLogo(String logo) {
		this.logo = logo;
	}
	public String getJobTitle() {
		return jobTitle;
	}
	public void setJobTitle(String jobTitle) {
		this.jobTitle = jobTitle;
	}
	public String getJobDescription() {
		return jobDescription;
	}
	public void setJobDescription(String jobDescription) {
		this.jobDescription = jobDescription;
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
	public String getCity() {
		return city;
	}
	public void setCity(String city) {
		this.city = city;
	}
	public String getPostedDate() {
		return postedDate;
	}
	public void setPostedDate(String postedDate) {
		this.postedDate = postedDate;
	}
	
		public long getApplicationCount() {
		return applicationCount;
	}
	public void setApplicationCount(long applicationCount) {
		this.applicationCount = applicationCount;
	}
		public JobResponse(Long id, String companyName, String logo, String jobTitle, String jobDescription,
			String category, String type, String salary, String experience, String skills, String city,
			String postedDate,long applicationCount) {
		super();
		this.id = id;
		this.companyName = companyName;
		this.logo = logo;
		this.jobTitle = jobTitle;
		this.jobDescription = jobDescription;
		this.category = category;
		this.type = type;
		this.salary = salary;
		this.experience = experience;
		this.skills = skills;
		this.city = city;
		this.postedDate = postedDate;
		this.applicationCount = applicationCount;
	}
	public JobResponse() {
		super();
		// TODO Auto-generated constructor stub
	}
	
    
}
