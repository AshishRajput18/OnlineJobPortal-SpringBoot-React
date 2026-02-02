package com.backend.repository;

import com.backend.entity.JobApplication;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface JobApplicationRepository
        extends JpaRepository<JobApplication, Long> {

    List<JobApplication> findByEmployeeId(Long employeeId);

    Optional<JobApplication> findByApplicationId(String applicationId);

    boolean existsByEmployeeIdAndJobId(Long employeeId, Long jobId);
 // JobApplicationRepository.java

    List<JobApplication> findByJobIdIn(List<Long> jobIds);
 // JobApplicationRepository.java

    List<JobApplication> findByJobId(Long jobId);
}
