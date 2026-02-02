package com.backend.dto;

import lombok.Data;

@Data

public class EmployerResponse {
    private Long id;
    private String firstName;
    private String lastName;
    private String email;
    private String contactNo;
    private String street;
    private String city;
    private String pin;
    private String registrationDate; // optional, can be String
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
	public String getPin() {
		return pin;
	}
	public void setPin(String pin) {
		this.pin = pin;
	}
	public String getRegistrationDate() {
		return registrationDate;
	}
	public void setRegistrationDate(String registrationDate) {
		this.registrationDate = registrationDate;
	}
	public EmployerResponse(Long id, String firstName, String lastName, String email, String contactNo, String street,
			String city, String pin, String registrationDate) {
		super();
		this.id = id;
		this.firstName = firstName;
		this.lastName = lastName;
		this.email = email;
		this.contactNo = contactNo;
		this.street = street;
		this.city = city;
		this.pin = pin;
		this.registrationDate = registrationDate;
	}
	public EmployerResponse() {
		super();
		// TODO Auto-generated constructor stub
	}
    
    
}
