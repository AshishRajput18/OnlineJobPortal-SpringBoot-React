package com.backend.controller;

import com.backend.dto.JobDTO;
import com.backend.dto.JobResponse;
import com.backend.entity.Job;
import com.backend.service.JobService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/jobs")
@CrossOrigin("*")
public class JobController {

    @Autowired
    private JobService jobService;

    // Add Job
    @PostMapping("/add")
    public Job addJob(
            @RequestParam Long categoryId,
            @RequestParam Long employerId,
            @RequestBody Job job
    ) {
        return jobService.saveJob(job, categoryId, employerId);
    }

    // Employer jobs
 // Employer jobs
    @GetMapping("/my-jobs")
    public List<JobResponse> getJobsByEmployer(
            @RequestParam Long employerId) {

        return jobService.getMyJobs(employerId);
    }


    // Delete
    @DeleteMapping("/delete/{jobId}")
    public String deleteJob(@PathVariable Long jobId) {
        jobService.deleteJob(jobId);
        return "Job deleted successfully";
    }

    // All jobs for JobGrid
    @GetMapping("/all")
    public List<JobDTO> getAllJobs() {
        return jobService.getAllJobs();
    }
}
