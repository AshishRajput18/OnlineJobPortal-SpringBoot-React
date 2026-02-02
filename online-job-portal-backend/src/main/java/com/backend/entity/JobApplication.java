package com.backend.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "job_applications")
public class JobApplication {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false, updatable = false)
    private String applicationId;

    @Column(nullable = false, updatable = false)
    private LocalDateTime appliedDate;

    @Column(nullable = false)
    private String status;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "employee_id", nullable = false)
    private User employee;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "job_id", nullable = false)
    private Job job;

    // Default constructor
    public JobApplication() {
    }

    // Full constructor
    public JobApplication(Long id, String applicationId, LocalDateTime appliedDate, 
                          String status, User employee, Job job) {
        this.id = id;
        this.applicationId = applicationId;
        this.appliedDate = appliedDate;
        this.status = status;
        this.employee = employee;
        this.job = job;
    }

    // Getters & Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getApplicationId() { return applicationId; }
    public void setApplicationId(String applicationId) { this.applicationId = applicationId; }

    public LocalDateTime getAppliedDate() { return appliedDate; }
    public void setAppliedDate(LocalDateTime appliedDate) { this.appliedDate = appliedDate; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public User getEmployee() { return employee; }
    public void setEmployee(User employee) { this.employee = employee; }

    public Job getJob() { return job; }
    public void setJob(Job job) { this.job = job; }

    @PrePersist
    protected void onCreate() {
        if (appliedDate == null) {
            this.appliedDate = LocalDateTime.now();
        }
        if (status == null || status.trim().isEmpty()) {
            this.status = "Applied";
        }
        if (applicationId == null || applicationId.trim().isEmpty()) {
            this.applicationId = UUID.randomUUID()
                    .toString()
                    .replaceAll("-", "")
                    .substring(0, 12)
                    .toUpperCase();
        }
    }
    
}