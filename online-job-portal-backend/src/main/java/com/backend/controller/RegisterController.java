package com.backend.controller;


import com.backend.entity.User;
import com.backend.service.AdminService;
import com.backend.service.UserService;
import lombok.RequiredArgsConstructor;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/register")
@RequiredArgsConstructor
@CrossOrigin("*")
public class RegisterController {

	@Autowired
    private  UserService userService;
	
	@Autowired
	 private  AdminService adminService;

    @PostMapping("/employee")
    public User registerEmployee(@RequestBody User user) {
        return userService.registerEmployee(user);
    }

    @PostMapping("/employer")
    public User registerEmployer(@RequestBody User user) {
        return userService.registerEmployer(user);
    }
    
    @PostMapping("/admin")
    public ResponseEntity<?> registerAdmin(@RequestBody User request) {
        String response = adminService.registerAdmin(request);
        return ResponseEntity.ok(response);
    }
}
