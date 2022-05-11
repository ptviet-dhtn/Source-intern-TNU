package com.example.booking.payload.request;

import lombok.Data;
import lombok.RequiredArgsConstructor;

import java.util.Set;

import javax.validation.constraints.*;

@Data
@RequiredArgsConstructor
public class SignupRequest {
    @NotBlank
    @Size(min = 3, max = 20)
    private String username;

    @NotBlank
    @Size(max = 50)
    @Email
    private String email;

    private Set<String> role;

    @NotBlank
    @Size(min = 6, max = 40)
    private String password;

}
