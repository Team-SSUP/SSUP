package sdn.backend.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class UserController {

    @GetMapping("/me")
    public Map<String, String> me(Principal principal) {
        Map<String, String> response = new HashMap<>();
        response.put("username", principal.getName());
        return response;
    }
}
