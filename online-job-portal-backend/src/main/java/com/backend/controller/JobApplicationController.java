package com.backend.controller;

import com.backend.dto.JobApplicationResponse;
import com.backend.service.JobApplicationService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/applications")
@CrossOrigin("*")
public class JobApplicationController {

    private final JobApplicationService service;

    public JobApplicationController(JobApplicationService service) {
        this.service = service;
    }

    @PostMapping("/apply")
    public ResponseEntity<String> applyJob(
            @RequestParam Long employeeId,
            @RequestParam Long jobId) {
        return ResponseEntity.ok(service.applyJob(employeeId, jobId));
    }

    @GetMapping("/employee/{employeeId}")
    public ResponseEntity<List<JobApplicationResponse>> getEmployeeApplications(
            @PathVariable Long employeeId) {
        return ResponseEntity.ok(service.getEmployeeApplications(employeeId));
    }

    @DeleteMapping("/{applicationId}")
    public ResponseEntity<String> cancelApplication(@PathVariable String applicationId) {
        service.cancelApplication(applicationId);
        return ResponseEntity.ok("Application cancelled successfully");
    }
 // JobApplicationController.java

    /**
     * Get all applications for jobs posted by this employer
     */
    @GetMapping("/employer/{employerId}")
    public ResponseEntity<List<JobApplicationResponse>> getEmployerApplications(
            @PathVariable Long employerId) {
        return ResponseEntity.ok(service.getApplicationsForEmployer(employerId));
    }
    
 // JobApplicationController.java

    @GetMapping("/job/{jobId}")
    public ResponseEntity<List<JobApplicationResponse>> getApplicationsForJob(
            @PathVariable Long jobId) {
        return ResponseEntity.ok(service.getApplicationsForJob(jobId));
    }
    @PutMapping("/{applicationId}/status")
    public ResponseEntity<String> updateApplicationStatus(
            @PathVariable String applicationId,
            @RequestBody StatusUpdateRequest request) {

        service.updateApplicationStatus(applicationId, request.getStatus());
        return ResponseEntity.ok("Status updated successfully");
    }

    // Simple DTO for request body
    public static class StatusUpdateRequest {
        private String status;

        public String getStatus() { return status; }
        public void setStatus(String status) { this.status = status; }
    }
    
    @GetMapping("/all")
    public ResponseEntity<List<JobApplicationResponse>> getAllApplications() {
        return ResponseEntity.ok(service.getAllApplications());
    }

}