package com.backend.dto;

import java.util.List;

public class WorkExperienceDTO {
    private Long id;
    private List<String> company;
    private String position;
    private String startDate;
    private String endDate;
    private String experience;

    public WorkExperienceDTO(Long id, List<String> company, String position, String startDate, String endDate, String experience) {
        this.id = id;
        this.company = company;
        this.position = position;
        this.startDate = startDate;
        this.endDate = endDate;
        this.experience = experience;
    }

    public WorkExperienceDTO() {}

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

    // getters & setters
}
