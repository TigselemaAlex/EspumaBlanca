package com.espumablanca.backend.domain.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class Client extends AbstractModel {
    private String name;
    private String lastname;
    private String email;
    private String phone;
    private String address;
    private String city;
    private String ci;
}
