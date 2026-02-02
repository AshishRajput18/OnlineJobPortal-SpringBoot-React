package com.backend.dto;

import java.time.LocalDateTime;
import java.util.List;

import com.backend.entity.Qualification;
import com.backend.entity.Skill;
import com.backend.entity.WorkExperience;


public class EmployeeProfileDTO {

    private Long id;
    private String firstName;
    private String lastName;
    private String email;
    private String contactNo;

    private String street;
    private String city;
    private String state;
    private String country;
    private String pincode;

    private LocalDateTime registrationDate;

    // Profile
    private String bio;
    private String avatar;
    private String github;
    private String linkedin;
    private String website;
    private String resume;

    // Lists
    private List<Qualification> qualifications;
    private List<Skill> skills;
    private List<WorkExperience> workExperience;
	public EmployeeProfileDTO(Long id, String firstName, String lastName, String email, String contactNo, String street,
			String city, String state, String country, String pincode, LocalDateTime registrationDate, String bio,
			String avatar, String github, String linkedin, String website, String resume,
			List<Qualification> qualifications, List<Skill> skills, List<WorkExperience> workExperience) {
		super();
		this.id = id;
		this.firstName = firstName;
		this.lastName = lastName;
		this.email = email;
		this.contactNo = contactNo;
		this.street = street;
		this.city = city;
		this.state = state;
		this.country = country;
		this.pincode = pincode;
		this.registrationDate = registrationDate;
		this.bio = bio;
		this.avatar = avatar;
		this.github = github;
		this.linkedin = linkedin;
		this.website = website;
		this.resume = resume;
		this.qualifications = qualifications;
		this.skills = skills;
		this.workExperience = workExperience;
	}
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getFirstName() {
		return firstName;
	}
	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}
	public String getLastName() {
		return lastName;
	}
	public void setLastName(String lastName) {
		this.lastName = lastName;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getContactNo() {
		return contactNo;
	}
	public void setContactNo(String contactNo) {
		this.contactNo = contactNo;
	}
	public String getStreet() {
		return street;
	}
	public void setStreet(String street) {
		this.street = street;
	}
	public String getCity() {
		return city;
	}
	public void setCity(String city) {
		this.city = city;
	}
	public String getState() {
		return state;
	}
	public void setState(String state) {
		this.state = state;
	}
	public String getCountry() {
		return country;
	}
	public void setCountry(String country) {
		this.country = country;
	}
	
	public String getPincode() {
		return pincode;
	}
	public void setPincode(String pincode) {
		this.pincode = pincode;
	}
	public LocalDateTime getRegistrationDate() {
		return registrationDate;
	}
	public void setRegistrationDate(LocalDateTime registrationDate) {
		this.registrationDate = registrationDate;
	}
	public String getBio() {
		return bio;
	}
	public void setBio(String bio) {
		this.bio = bio;
	}
	public String getAvatar() {
		return avatar;
	}
	public void setAvatar(String avatar) {
		this.avatar = avatar;
	}
	public String getGithub() {
		return github;
	}
	public void setGithub(String github) {
		this.github = github;
	}
	public String getLinkedin() {
		return linkedin;
	}
	public void setLinkedin(String linkedin) {
		this.linkedin = linkedin;
	}
	public String getWebsite() {
		return website;
	}
	public void setWebsite(String website) {
		this.website = website;
	}
	public String getResume() {
		return resume;
	}
	public void setResume(String resume) {
		this.resume = resume;
	}
	public List<Qualification> getQualifications() {
		return qualifications;
	}
	public void setQualifications(List<Qualification> qualifications) {
		this.qualifications = qualifications;
	}
	public List<Skill> getSkills() {
		return skills;
	}
	public void setSkills(List<Skill> skills) {
		this.skills = skills;
	}
	public List<WorkExperience> getWorkExperience() {
		return workExperience;
	}
	public void setWorkExperience(List<WorkExperience> workExperience) {
		this.workExperience = workExperience;
	}
	public EmployeeProfileDTO() {
		super();
		// TODO Auto-generated constructor stub
	}
	
    
    
}
