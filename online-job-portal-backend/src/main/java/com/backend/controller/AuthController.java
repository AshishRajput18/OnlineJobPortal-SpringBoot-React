package com.backend.controller;

import com.backend.entity.User;
import com.backend.entity.Role; // Make sure you have Role enum imported
import com.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
@CrossOrigin("*")
public class AuthController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {

        Optional<User> userOpt = userRepository.findByEmail(request.getEmail());
        if (userOpt.isEmpty()) {
            return ResponseEntity.status(401).body("Email Not Found");
        }

        User user = userOpt.get();

        // Check password
        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            return ResponseEntity.status(401).body("Wrong Password");
        }

        // Check role - both are Role enums
        if (request.getRole() == null || user.getRole() == null || !user.getRole().equals(request.getRole())) {
            return ResponseEntity.status(401).body("Role Mismatch");
        }

        // Login successful - return DTO including role
        LoginResponse response = new LoginResponse(
                user.getId(),
                user.getFirstName(),
                user.getEmail(),
                user.getRole().name() // convert enum to string
        );

        return ResponseEntity.ok(response);
    }

    // DTO to receive login request
    public static class LoginRequest {
        private String email;
        private String password;
        private Role role; // Enum from your User entity

        // Getters and setters
        public String getEmail() { return email; }
        public void setEmail(String email) { this.email = email; }
        public String getPassword() { return password; }
        public void setPassword(String password) { this.password = password; }
        public Role getRole() { return role; }
        public void setRole(Role role) { this.role = role; }
    }

    // DTO to send response back
    public static class LoginResponse {
        private Long id;
        private String firstName;
        private String email;
        private String role;

        public LoginResponse(Long id, String firstName, String email, String role) {
            this.id = id;
            this.firstName = firstName;
            this.email = email;
            this.role = role;
        }

        // Getters
        public Long getId() { return id; }
        public String getFirstName() { return firstName; }
        public String getEmail() { return email; }
        public String getRole() { return role; }
    }
}
