package com.backend.entity;


import jakarta.persistence.*;
import lombok.*;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonBackReference;

@Entity
@Data

@Builder
public class WorkExperience {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ElementCollection
    private List<String> company;

    private String position;
    private String startDate;
    private String endDate;
    private String experience;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    @JsonBackReference
    private User user;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public List<String> getCompany() {
		return company;
	}

	public void setCompany(List<String> company) {
		this.company = company;
	}

	public String getPosition() {
		return position;
	}

	public void setPosition(String position) {
		this.position = position;
	}

	public String getStartDate() {
		return startDate;
	}

	public void setStartDate(String startDate) {
		this.startDate = startDate;
	}

	public String getEndDate() {
		return endDate;
	}

	public void setEndDate(String endDate) {
		this.endDate = endDate;
	}

	public String getExperience() {
		return experience;
	}

	public void setExperience(String experience) {
		this.experience = experience;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public WorkExperience(Long id, List<String> company, String position, String startDate, String endDate,
			String experience, User user) {
		super();
		this.id = id;
		this.company = company;
		this.position = position;
		this.startDate = startDate;
		this.endDate = endDate;
		this.experience = experience;
		this.user = user;
	}

	public WorkExperience() {
		super();
		// TODO Auto-generated constructor stub
	}
    
    
}
