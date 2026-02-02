package com.backend.service;

import com.backend.dto.JobDTO;
import com.backend.dto.JobResponse;
import com.backend.entity.Category;
import com.backend.entity.Job;
import com.backend.entity.User;
import com.backend.repository.CategoryRepository;
import com.backend.repository.JobRepository;
import com.backend.repository.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class JobService {

    @Autowired
    private JobRepository jobRepository;

    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private UserRepository userRepository;

    // Save job
    public Job saveJob(Job job, Long categoryId, Long employerId) {

        Category category = categoryRepository.findById(categoryId)
                .orElseThrow(() -> new RuntimeException("Category not found"));

        User employer = userRepository.findById(employerId)
                .orElseThrow(() -> new RuntimeException("Employer not found"));

        job.setCategory(category);
        job.setEmployer(employer);

        if (job.getPostedDate() == null) {
            job.setPostedDate(LocalDateTime.now());
        }

        return jobRepository.save(job);
    }

 // Employer jobs
    public List<JobResponse> getMyJobs(Long employerId) {

        DateTimeFormatter formatter =
                DateTimeFormatter.ofPattern("dd/MM/yyyy hh:mm a");

        return jobRepository.findByEmployerId(employerId)
                .stream()
                .map(job -> convertToResponse(job, formatter))
                .collect(Collectors.toList());
    }
    private JobResponse convertToResponse(Job job,
            DateTimeFormatter formatter) {

String postedDate = "";
if (job.getPostedDate() != null) {
postedDate = job.getPostedDate().format(formatter);
}

return new JobResponse(
job.getId(),
job.getCompanyName(),
job.getLogo(),
job.getJobTitle(),
job.getJobDescription(),
job.getCategory() != null
? job.getCategory().getTitle()
: "",
job.getType(),
job.getSalary(),
job.getExperience(),
job.getSkills(),
job.getCity(),
postedDate,
job.getApplicationCount()// applicants count
);
}



    // Delete job
    public void deleteJob(Long jobId) {
        jobRepository.deleteById(jobId);
    }

    // All jobs
    public List<JobDTO> getAllJobs() {
        return jobRepository.findAll()
                .stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    // DTO mapping
    private JobDTO mapToDTO(Job job) {

        DateTimeFormatter formatter =
                DateTimeFormatter.ofPattern("dd/MM/yyyy hh:mm a");

        String postedDate = "";
        if (job.getPostedDate() != null) {
            postedDate = job.getPostedDate().format(formatter);
        }

        User employer = job.getEmployer();

        String employerName = "";
        String employerEmail = "";
        String employerContact = "";

        if (employer != null) {
            employerName =
                    (employer.getFirstName() != null ? employer.getFirstName() : "")
                            + " "
                            + (employer.getLastName() != null ? employer.getLastName() : "");

            employerEmail = employer.getEmail();
            employerContact = employer.getContactNo();
        }

        String companyAddress =
                job.getStreet() + ", " +
                job.getCity() + ", " +
                job.getState() + ", " +
                job.getCountry();

        return new JobDTO(
                job.getId(),
                job.getLogo(),
                job.getJobTitle(),
                job.getCategory() != null ? job.getCategory().getTitle() : "",
                job.getType(),
                job.getSalary(),
                job.getExperience(),
                job.getCompanyName(),
                companyAddress,
                employerName,
                employerEmail,
                employerContact,
                job.getJobDescription(),
                job.getCategory() != null ? job.getCategory().getTitle() : "",
                job.getSkills(),
                postedDate,
                job.getApplicationCount()
                
        );
    }
    
}
