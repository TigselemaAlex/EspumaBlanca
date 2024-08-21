package com.espumablanca.backend.infrastructure.util.exception;

public class AdviceMessage {

    public static String constraintKeyToMessage(String key) {
        if (key.contains("name")) {
            return key.replaceAll("name", "nombre");
        }
        if (key.contains("lastname")) {
            return key.replaceAll("lastname", "apellido");
        }
        if (key.contains("email")) {
            return key.replaceAll("email", "correo");
        }
        if (key.contains("phone")) {
            return key.replaceAll("phone", "teléfono");
        }
        if (key.contains("address")) {
            return key.replaceAll("address", "dirección");
        }
        if (key.contains("city")) {
            return key.replaceAll("city", "ciudad");
        }
        if (key.contains("ci")) {
            return key.replaceAll("ci", "cédula");
        }
        return key;
    }
}
