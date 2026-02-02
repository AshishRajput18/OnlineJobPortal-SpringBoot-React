package com.backend.util;

import com.backend.entity.*;
import com.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class DataInitializer implements CommandLineRunner {

	@Autowired
    private  UserRepository userRepository;
	@Autowired
    private  PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) {

        if (userRepository.findByEmail("demo.admin@demo.com").isEmpty()) {

        	User admin = new User();
        	admin.setFirstName("Demo");
        	admin.setLastName("Admin");
        	admin.setEmail("demo.admin@demo.com");
        	admin.setPassword(passwordEncoder.encode("123456"));
        	admin.setRole(Role.ADMIN);

        	userRepository.save(admin);


            System.out.println("Default Admin Created");
        }
    }
}
