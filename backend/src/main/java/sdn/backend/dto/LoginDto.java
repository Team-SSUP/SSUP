package sdn.backend.dto;

import lombok.Setter;
import lombok.Getter;

@Getter @Setter

public class LoginDto{
    private String email;
    private String password;
}