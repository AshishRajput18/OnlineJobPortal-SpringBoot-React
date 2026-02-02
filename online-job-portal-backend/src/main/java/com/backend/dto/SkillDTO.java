package com.backend.dto;

public class SkillDTO {
    private Long id;
    private String name;
    private String experience;

    public SkillDTO(Long id, String name, String experience) {
        this.id = id;
        this.name = name;
        this.experience = experience;
    }

    public SkillDTO() {}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getExperience() {
		return experience;
	}

	public void setExperience(String experience) {
		this.experience = experience;
	}

    // getters & setters
}
