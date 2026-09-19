package com.seettumanager.seettu_backend.repository;

import com.seettumanager.seettu_backend.model.Preference;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface PreferenceRepository 
    extends JpaRepository<Preference, Long> {

    Optional<Preference> findByUserId(Long userId);
}