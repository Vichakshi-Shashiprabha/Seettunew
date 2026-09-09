package com.seettumanager.seettu_backend.controller;

import com.seettumanager.seettu_backend.model.AuditLog;
import com.seettumanager.seettu_backend.repository.AuditLogRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/audit-logs")
public class AuditLogController {

    @Autowired
    private AuditLogRepository auditLogRepository;

    @GetMapping
    public List<AuditLog> getAllLogs() {
        return auditLogRepository.findAll();
    }

    @GetMapping("/user/{userId}")
    public List<AuditLog> getLogsByUser(
        @PathVariable Long userId) {
        return auditLogRepository.findByUserId(userId);
    }

    @PostMapping
    public AuditLog createLog(
        @RequestBody AuditLog auditLog) {
        return auditLogRepository.save(auditLog);
    }
}