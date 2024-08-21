package com.espumablanca.backend.domain.port;

import com.espumablanca.backend.domain.model.User;
import com.espumablanca.backend.domain.model.Role;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface UserPersistencePort {
    User create(User user);

    User getById(Long id);

    User update(User user);

    User updatePassword(User user);

    Page<User> getAll(String value, Role role, Boolean enabled, Pageable pageable);

    void delete(Long id);

    void disable(Long id);

    void enable(Long id);

}