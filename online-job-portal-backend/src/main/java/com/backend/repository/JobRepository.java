package com.backend.repository;

import com.backend.entity.Job;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface JobRepository extends JpaRepository<Job, Long> {
	 List<Job> findByEmployerId(Long employerId);
}
