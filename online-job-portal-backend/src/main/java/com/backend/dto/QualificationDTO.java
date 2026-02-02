package com.backend.dto;

public class QualificationDTO {
    private Long id;
    private String degree;
    private String startDate;
    private String endDate;

    public QualificationDTO(Long id, String degree, String startDate, String endDate) {
        this.id = id;
        this.degree = degree;
        this.startDate = startDate;
        this.endDate = endDate;
    }

    public QualificationDTO() {}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getDegree() {
		return degree;
	}

	public void setDegree(String degree) {
		this.degree = degree;
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

    // getters & setters
    
}
