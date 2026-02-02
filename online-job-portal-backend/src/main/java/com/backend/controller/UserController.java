package com.backend.controller;

import com.backend.dto.EmployeeProfileDTO;
import com.backend.dto.EmployerResponse;
import com.backend.entity.Qualification;
import com.backend.entity.Skill;
import com.backend.entity.User;
import com.backend.entity.WorkExperience;
import com.backend.service.UserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
@CrossOrigin("*")
public class UserController {

    @Autowired
    private UserService userService;

    // ================= EMPLOYERS =================
    @GetMapping("/employers")
    public List<EmployerResponse> getAllEmployers() {
        return userService.getAllEmployers();
    }

    // ================= EMPLOYEES =================
    @GetMapping("/employees")
    public List<User> getAllEmployees() {
        return userService.getAllEmployees();
    }
    @GetMapping("/employee")
    public EmployeeProfileDTO getEmployeeProfiles(@RequestParam Long employeeId) {
        return userService.getEmployeeProfileByIds(employeeId);
    }


    // ================= PROFILE FETCH =================
    @GetMapping("/employee/{id}")
    public EmployeeProfileDTO getEmployeeProfile(@PathVariable Long id) {
        return userService.getEmployeeProfileById(id);
    }

    // ================= PROFILE UPDATE =================
    @PutMapping("/employee/{id}")
    public EmployeeProfileDTO updateEmployeeProfile(
            @PathVariable Long id,
            @RequestBody EmployeeProfileDTO dto) {
        return userService.updateEmployeeProfile(id, dto);
    }

 // ================= UPDATE QUALIFICATION =================
    @PutMapping("/employee/{id}/qualification/{qualId}")
    public EmployeeProfileDTO updateQualification(
            @PathVariable Long id,
            @PathVariable Long qualId,
            @RequestBody Qualification updatedQual) {
        return userService.updateQualification(id, qualId, updatedQual);
    }

    // ================= UPDATE SKILL =================
    @PutMapping("/employee/{id}/skill/{skillId}")
    public EmployeeProfileDTO updateSkill(
            @PathVariable Long id,
            @PathVariable Long skillId,
            @RequestBody Skill updatedSkill) {
        return userService.updateSkill(id, skillId, updatedSkill);
    }

    // ================= UPDATE WORK =================
    @PutMapping("/employee/{id}/work/{workId}")
    public EmployeeProfileDTO updateWork(
            @PathVariable Long id,
            @PathVariable Long workId,
            @RequestBody WorkExperience updatedWork) {
        return userService.updateWorkExperience(id, workId, updatedWork);
    }

    // ================= ADD QUALIFICATION =================
    @PostMapping("/employee/{id}/qualification")
    public EmployeeProfileDTO addQualification(
            @PathVariable Long id,
            @RequestBody EmployeeProfileDTO dto) {
        return userService.addQualification(id, dto);
    }

    // ================= ADD SKILL =================
    @PostMapping("/employee/{id}/skill")
    public EmployeeProfileDTO addSkill(
            @PathVariable Long id,
            @RequestBody EmployeeProfileDTO dto) {
        return userService.addSkill(id, dto);
    }

    // ================= ADD WORK =================
    @PostMapping("/employee/{id}/work")
    public EmployeeProfileDTO addWork(
            @PathVariable Long id,
            @RequestBody EmployeeProfileDTO dto) {
        return userService.addWorkExperience(id, dto);
    }
 // ================= DELETE QUALIFICATION =================
    @DeleteMapping("/employee/{id}/qualification/{qualId}")
    public EmployeeProfileDTO deleteQualification(
            @PathVariable Long id,
            @PathVariable Long qualId) {
        return userService.deleteQualification(id, qualId);
    }

    // ================= DELETE SKILL =================
    @DeleteMapping("/employee/{id}/skill/{skillId}")
    public EmployeeProfileDTO deleteSkill(
            @PathVariable Long id,
            @PathVariable Long skillId) {
        return userService.deleteSkill(id, skillId);
    }

    // ================= DELETE WORK EXPERIENCE =================
    @DeleteMapping("/employee/{id}/work/{workId}")
    public EmployeeProfileDTO deleteWorkExperience(
            @PathVariable Long id,
            @PathVariable Long workId) {
        return userService.deleteWorkExperience(id, workId);
    }
   
}
