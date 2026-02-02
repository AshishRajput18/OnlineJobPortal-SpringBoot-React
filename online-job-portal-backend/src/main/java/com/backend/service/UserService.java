package com.backend.service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.backend.dto.EmployeeProfileDTO;
import com.backend.dto.EmployerResponse;
import com.backend.dto.QualificationDTO;
import com.backend.dto.SkillDTO;
import com.backend.dto.WorkExperienceDTO;
import com.backend.entity.Qualification;
import com.backend.entity.Role;
import com.backend.entity.Skill;
import com.backend.entity.User;
import com.backend.entity.WorkExperience;
import com.backend.repository.UserRepository;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    // ================= REGISTER =================

    public User registerEmployee(User user) {
        user.setRole(Role.EMPLOYEE);
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        user.setRegistrationDate(LocalDateTime.now());
        return userRepository.save(user);
    }

    public User registerEmployer(User user) {
        user.setRole(Role.EMPLOYER);
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        user.setRegistrationDate(LocalDateTime.now());
        return userRepository.save(user);
    }

    // ================= FETCH USERS =================


    public List<EmployerResponse> getAllEmployers() {
        List<User> employers = userRepository.findByRole(Role.EMPLOYER); // assume Role enum exists

        return employers.stream()
                .map(emp -> new EmployerResponse(
                        emp.getId(),
                        emp.getFirstName(),
                        emp.getLastName(),
                        emp.getEmail(),
                        emp.getContactNo(),
                        emp.getStreet(),
                        emp.getCity(),
                        emp.getPincode(),
                        emp.getRegistrationDate() != null ? emp.getRegistrationDate().toString() : ""
                ))
                .collect(Collectors.toList());
    }

    public List<User> getAllEmployees() {
        return userRepository.findByRole(Role.EMPLOYEE);
    }

    // ================= PROFILE FETCH =================
//
    public EmployeeProfileDTO getEmployeeProfileById(Long id) {

        User user = getUserById(id);

        EmployeeProfileDTO dto = new EmployeeProfileDTO();

        dto.setId(user.getId());
        dto.setFirstName(user.getFirstName());
        dto.setLastName(user.getLastName());
        dto.setEmail(user.getEmail());
        dto.setContactNo(user.getContactNo());
        dto.setStreet(user.getStreet());
        dto.setCity(user.getCity());
        dto.setState(user.getState());
        dto.setCountry(user.getCountry());
        dto.setPincode(user.getPincode());
        dto.setRegistrationDate(user.getRegistrationDate());

        dto.setBio(user.getBio());
        dto.setAvatar(user.getAvatar());
        dto.setGithub(user.getGithub());
        dto.setLinkedin(user.getLinkedin());
        dto.setWebsite(user.getWebsite());
        dto.setResume(user.getResume());

        dto.setQualifications(
                user.getQualifications() != null ? user.getQualifications() : new ArrayList<>());

        dto.setSkills(
                user.getSkills() != null ? user.getSkills() : new ArrayList<>());

        dto.setWorkExperience(
                user.getWorkExperience() != null ? user.getWorkExperience() : new ArrayList<>());

        return dto;
    }
    
    public EmployeeProfileDTO getEmployeeProfileByIds(Long employeeId) {

        User user = getUserById(employeeId);

        EmployeeProfileDTO dto = new EmployeeProfileDTO();

        dto.setId(user.getId());
        dto.setFirstName(user.getFirstName());
        dto.setLastName(user.getLastName());
        dto.setEmail(user.getEmail());
        dto.setContactNo(user.getContactNo());
        dto.setStreet(user.getStreet());
        dto.setCity(user.getCity());
        dto.setState(user.getState());
        dto.setCountry(user.getCountry());
        dto.setPincode(user.getPincode());
        dto.setRegistrationDate(user.getRegistrationDate());

        dto.setBio(user.getBio());
        dto.setAvatar(user.getAvatar());
        dto.setGithub(user.getGithub());
        dto.setLinkedin(user.getLinkedin());
        dto.setWebsite(user.getWebsite());
        dto.setResume(user.getResume());

        dto.setQualifications(
                user.getQualifications() != null ? user.getQualifications() : new ArrayList<>());

        dto.setSkills(
                user.getSkills() != null ? user.getSkills() : new ArrayList<>());

        dto.setWorkExperience(
                user.getWorkExperience() != null ? user.getWorkExperience() : new ArrayList<>());

        return dto;
    }


    // ================= PROFILE UPDATE =================

    public EmployeeProfileDTO updateEmployeeProfile(Long id, EmployeeProfileDTO dto) {

        User user = getUserById(id);

        if (dto.getFirstName() != null) user.setFirstName(dto.getFirstName());
        if (dto.getLastName() != null) user.setLastName(dto.getLastName());
        if (dto.getEmail() != null) user.setEmail(dto.getEmail());
        if (dto.getContactNo() != null) user.setContactNo(dto.getContactNo());

        if (dto.getStreet() != null) user.setStreet(dto.getStreet());
        if (dto.getCity() != null) user.setCity(dto.getCity());
        if (dto.getState() != null) user.setState(dto.getState());
        if (dto.getCountry() != null) user.setCountry(dto.getCountry());
        if (dto.getPincode() != null) user.setPincode(dto.getPincode());

        if (dto.getBio() != null) user.setBio(dto.getBio());
        if (dto.getAvatar() != null) user.setAvatar(dto.getAvatar());
        if (dto.getGithub() != null) user.setGithub(dto.getGithub());
        if (dto.getLinkedin() != null) user.setLinkedin(dto.getLinkedin());
        if (dto.getWebsite() != null) user.setWebsite(dto.getWebsite());
        if (dto.getResume() != null) user.setResume(dto.getResume());
        
        dto.setQualifications(
                user.getQualifications() != null ? user.getQualifications() : new ArrayList<>());

        dto.setSkills(
                user.getSkills() != null ? user.getSkills() : new ArrayList<>());

        dto.setWorkExperience(
                user.getWorkExperience() != null ? user.getWorkExperience() : new ArrayList<>());

        userRepository.save(user);

        return getEmployeeProfileById(id);
    }

 // ================= UPDATE QUALIFICATION =================
    public EmployeeProfileDTO updateQualification(Long userId, Long qualId, Qualification updatedQual) {
        User user = getUserById(userId);
        Qualification qual = user.getQualifications().stream()
                .filter(q -> q.getId().equals(qualId))
                .findFirst()
                .orElseThrow(() -> new RuntimeException("Qualification not found"));
        
        qual.setDegree(updatedQual.getDegree());
        qual.setInstitution(updatedQual.getInstitution());
        qual.setStartDate(updatedQual.getStartDate());
        qual.setEndDate(updatedQual.getEndDate());
        
        userRepository.save(user);
        return getEmployeeProfileById(userId);
    }

    // ================= UPDATE SKILL =================
    public EmployeeProfileDTO updateSkill(Long userId, Long skillId, Skill updatedSkill) {
        User user = getUserById(userId);
        Skill skill = user.getSkills().stream()
                .filter(s -> s.getId().equals(skillId))
                .findFirst()
                .orElseThrow(() -> new RuntimeException("Skill not found"));
        
        skill.setName(updatedSkill.getName());
        skill.setExperience(updatedSkill.getExperience());
        
        userRepository.save(user);
        return getEmployeeProfileById(userId);
    }

    // ================= UPDATE WORK =================
    public EmployeeProfileDTO updateWorkExperience(Long userId, Long workId, WorkExperience updatedWork) {
        User user = getUserById(userId);
        WorkExperience work = user.getWorkExperience().stream()
                .filter(w -> w.getId().equals(workId))
                .findFirst()
                .orElseThrow(() -> new RuntimeException("Work experience not found"));
        
        work.setCompany(updatedWork.getCompany());
        work.setPosition(updatedWork.getPosition());
        work.setStartDate(updatedWork.getStartDate());
        work.setEndDate(updatedWork.getEndDate());
        work.setExperience(updatedWork.getExperience());
        
        userRepository.save(user);
        return getEmployeeProfileById(userId);
    }

    // ================= ADD QUALIFICATION =================
    public EmployeeProfileDTO addQualification(Long id, EmployeeProfileDTO dto) {
        User user = getUserById(id);
        if (dto.getQualifications() != null) {
            if (user.getQualifications() == null)
                user.setQualifications(new ArrayList<>());
            dto.getQualifications().forEach(q -> q.setUser(user));
            user.getQualifications().addAll(dto.getQualifications());
            userRepository.save(user);
        }
        return getEmployeeProfileById(id);
    }

    // ================= ADD SKILL =================
    public EmployeeProfileDTO addSkill(Long id, EmployeeProfileDTO dto) {
        User user = getUserById(id);
        if (dto.getSkills() != null) {
            if (user.getSkills() == null)
                user.setSkills(new ArrayList<>());
            dto.getSkills().forEach(s -> s.setUser(user));
            user.getSkills().addAll(dto.getSkills());
            userRepository.save(user);
        }
        return getEmployeeProfileById(id);
    }

    // ================= ADD WORK =================
    public EmployeeProfileDTO addWorkExperience(Long id, EmployeeProfileDTO dto) {
        User user = getUserById(id);
        if (dto.getWorkExperience() != null) {
            if (user.getWorkExperience() == null)
                user.setWorkExperience(new ArrayList<>());
            dto.getWorkExperience().forEach(w -> w.setUser(user));
            user.getWorkExperience().addAll(dto.getWorkExperience());
            userRepository.save(user);
        }
        return getEmployeeProfileById(id);
    }
    
    public EmployeeProfileDTO deleteQualification(Long userId, Long qualId) {
        User user = getUserById(userId);
        Qualification qual = user.getQualifications().stream()
                .filter(q -> q.getId().equals(qualId))
                .findFirst()
                .orElseThrow(() -> new RuntimeException("Qualification not found"));

        user.getQualifications().remove(qual);
        userRepository.save(user);
        return getEmployeeProfileById(userId);
    }

    public EmployeeProfileDTO deleteSkill(Long userId, Long skillId) {
        User user = getUserById(userId);
        Skill skill = user.getSkills().stream()
                .filter(s -> s.getId().equals(skillId))
                .findFirst()
                .orElseThrow(() -> new RuntimeException("Skill not found"));

        user.getSkills().remove(skill);
        userRepository.save(user);
        return getEmployeeProfileById(userId);
    }

    public EmployeeProfileDTO deleteWorkExperience(Long userId, Long workId) {
        User user = getUserById(userId);
        WorkExperience work = user.getWorkExperience().stream()
                .filter(w -> w.getId().equals(workId))
                .findFirst()
                .orElseThrow(() -> new RuntimeException("Work experience not found"));

        user.getWorkExperience().remove(work);
        userRepository.save(user);
        return getEmployeeProfileById(userId);
    }
    // ================= HELPER =================

    private User getUserById(Long id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }
  
    
}
