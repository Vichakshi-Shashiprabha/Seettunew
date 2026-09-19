package com.seettumanager.seettu_backend.controller;

import com.seettumanager.seettu_backend.model.Preference;
import com.seettumanager.seettu_backend.repository.PreferenceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.Optional;

@RestController
@RequestMapping("/api/preferences")
public class PreferenceController {

    @Autowired
    private PreferenceRepository preferenceRepository;

    @GetMapping("/user/{userId}")
    public Optional<Preference> getPreference(
        @PathVariable Long userId) {
        return preferenceRepository.findByUserId(userId);
    }

    @PostMapping
    public Preference createPreference(
        @RequestBody Preference preference) {
        return preferenceRepository.save(preference);
    }

    @PutMapping("/user/{userId}")
    public Preference updatePreference(
        @PathVariable Long userId,
        @RequestBody Preference preference) {
        preference.setUserId(userId);
        return preferenceRepository.save(preference);
    }
}