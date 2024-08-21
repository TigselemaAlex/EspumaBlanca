package com.espumablanca.backend.common.util.utils;

import java.util.Objects;
import java.util.Random;

public class PasswordUtils {
    public static String passwordGenerate(String password) {
        if (Objects.nonNull(password)) return password;
        int leftLimit = 48;
        int rightLimit = 122;
        int targetStringLength = 6;
        Random random = new Random();
        return random.ints(leftLimit, rightLimit + 1)
            .filter(i -> (i <= 57 || i >= 65) && (i <= 90 || i >= 97))
            .limit(targetStringLength)
            .collect(StringBuilder::new, StringBuilder::appendCodePoint, StringBuilder::append)
            .toString();
    }
}