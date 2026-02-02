package com.backend.service;

import com.backend.entity.Role;
import com.backend.entity.User;
import com.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AdminService {

	@Autowired
    private  UserRepository userRepository;
	@Autowired
    private  PasswordEncoder passwordEncoder;

	public String registerAdmin(User request) {

	    if (userRepository.findByEmail(request.getEmail()).isPresent()) {
	        return "Email Already Exists";
	    }

	    User admin = new User();
	    admin.setEmail(request.getEmail());
	    admin.setPassword(passwordEncoder.encode(request.getPassword()));
	    admin.setRole(Role.ADMIN);

	    userRepository.save(admin);

	    return "Admin Registered Successfully";
	}

}
