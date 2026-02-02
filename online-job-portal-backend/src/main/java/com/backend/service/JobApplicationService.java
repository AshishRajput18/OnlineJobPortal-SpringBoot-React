package com.backend.service;

import com.backend.dto.JobApplicationResponse;
import com.backend.entity.Job;
import com.backend.entity.JobApplication;
import com.backend.entity.User;
import com.backend.repository.JobApplicationRepository;
import com.backend.repository.JobRepository;
import com.backend.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class JobApplicationService {

    private final JobApplicationRepository applicationRepo;
    private final JobRepository jobRepo;
    private final UserRepository userRepo;

    // Date formatter for consistent appliedDate display
    private static final DateTimeFormatter DATE_FORMATTER =
            DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");

    // Constructor injection (no Lombok RequiredArgsConstructor)
    public JobApplicationService(
            JobApplicationRepository applicationRepo,
            JobRepository jobRepo,
            UserRepository userRepo) {
        this.applicationRepo = applicationRepo;
        this.jobRepo = jobRepo;
        this.userRepo = userRepo;
    }

    /**
     * Allows an employee to apply for a job.
     * Sets appliedDate and default status automatically.
     */
    public String applyJob(Long employeeId, Long jobId) {
        // Check if already applied
        if (applicationRepo.existsByEmployeeIdAndJobId(employeeId, jobId)) {
            return "You have already applied for this job!";
        }

        // Fetch entities
        User employee = userRepo.findById(employeeId)
                .orElseThrow(() -> new IllegalArgumentException("Employee not found"));

        Job job = jobRepo.findById(jobId)
                .orElseThrow(() -> new IllegalArgumentException("Job not found"));

        // Create application using constructor (no builder)
        JobApplication app = new JobApplication();
        app.setEmployee(employee);
        app.setJob(job);
        // @PrePersist will automatically set appliedDate, status, and applicationId
     // Increment application count on the job
        job.incrementApplicationCount();
        applicationRepo.save(app);

        return "Application submitted successfully!";
    }

    /**
     * Returns list of applications made by the given employee.
     * Null-safe handling for appliedDate and other optional fields.
     */
    public List<JobApplicationResponse> getEmployeeApplications(Long empId) {
        return applicationRepo.findByEmployeeId(empId)
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    private JobApplicationResponse mapToResponse(JobApplication app) {
        Job job = app.getJob();
        User employee = app.getEmployee();

        JobApplicationResponse res = new JobApplicationResponse();

        res.setApplicationId(app.getApplicationId());

        // Null-safe date formatting
        res.setAppliedDate(
                Optional.ofNullable(app.getAppliedDate())
                        .map(d -> d.format(DATE_FORMATTER))
                        .orElse("—")
        );

        res.setStatus(Optional.ofNullable(app.getStatus()).orElse("Unknown"));

        // Job details
        res.setJobId(job.getId());
        res.setJobTitle(job.getJobTitle());
        res.setCategory(
                job.getCategory() != null
                        ? job.getCategory().getTitle()
                        : "—"
        );
        res.setType(job.getType() != null ? job.getType() : "—");
        res.setSalary(job.getSalary() != null ? job.getSalary() : "—");
        res.setExperience(job.getExperience() != null ? job.getExperience() : "—");
        res.setSkills(job.getSkills() != null ? job.getSkills() : "—");

        // Company info
        res.setCompanyName(job.getCompanyName() != null ? job.getCompanyName() : "—");
        res.setCompanyLogo(job.getLogo());
     // Employee info
        res.setEmployeeId(employee.getId());

        // Employee name
        res.setEmployeeName(
                (employee.getFirstName() != null ? employee.getFirstName() : "") + " " +
                (employee.getLastName() != null ? employee.getLastName() : "")
        );

        // Location
        String city = Optional.ofNullable(job.getCity()).orElse("");
        String state = Optional.ofNullable(job.getState()).orElse("");
        String locationStr = (city + (state.isEmpty() ? "" : ", " + state)).trim();
        res.setLocation(locationStr.isEmpty() ? "—" : locationStr);
        

        return res;
    }

    /**
     * Cancels (deletes) an application by its unique applicationId.
     */
    public void cancelApplication(String applicationId) {
        JobApplication app = applicationRepo.findByApplicationId(applicationId)
                .orElseThrow(() -> new IllegalArgumentException("Application not found: " + applicationId));
        Job job = app.getJob();

        applicationRepo.delete(app);

        // Decrement count if > 0
        job.decrementApplicationCount();
        jobRepo.save(job);
    }

    /**
     * Checks if the employee has already applied to the job.
     */
    public boolean hasApplied(Long employeeId, Long jobId) {
        return applicationRepo.existsByEmployeeIdAndJobId(employeeId, jobId);
    }
 // JobApplicationService.java

    /**
     * Returns all applications for jobs posted by the given employer.
     */
    public List<JobApplicationResponse> getApplicationsForEmployer(Long employerId) {
        // Find all jobs by this employer
        List<Job> employerJobs = jobRepo.findByEmployerId(employerId);

        // Get all job IDs
        List<Long> jobIds = employerJobs.stream()
                .map(Job::getId)
                .collect(Collectors.toList());

        // Find all applications for these jobs
        List<JobApplication> applications = applicationRepo.findByJobIdIn(jobIds);

        return applications.stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }
 // JobApplicationService.java

    /**
     * Returns all applications for a specific job.
     */
    public List<JobApplicationResponse> getApplicationsForJob(Long jobId) {
        List<JobApplication> applications = applicationRepo.findByJobId(jobId);
        return applications.stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }
    public void updateApplicationStatus(String applicationId, String newStatus) {
        JobApplication app = applicationRepo.findByApplicationId(applicationId)
                .orElseThrow(() -> new IllegalArgumentException("Application not found: " + applicationId));

        if (!isValidStatus(newStatus)) {
            throw new IllegalArgumentException("Invalid status: " + newStatus);
        }

        app.setStatus(newStatus);
        applicationRepo.save(app);
    }

    private boolean isValidStatus(String status) {
        return List.of("Applied", "Shortlisted", "Rejected", "Cancelled", "Pending")
                   .contains(status);
    }
    
    
    public List<JobApplicationResponse> getAllApplications() {
        return applicationRepo.findAll()
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

}