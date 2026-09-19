package com.seettumanager.seettu_backend.controller;

import com.seettumanager.seettu_backend.model.AuditLog;
import com.seettumanager.seettu_backend.service.AuditLogService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/audit-logs")
@CrossOrigin(origins = "http://localhost:3000")
public class AuditLogController {

    private final AuditLogService auditLogService;

    public AuditLogController(AuditLogService auditLogService) {
        this.auditLogService = auditLogService;
    }

    // API to view logs for a specific user ID
    @GetMapping("/user/{userId}")
    public List<AuditLog> getLogsByUser(@PathVariable Long userId) {
        return auditLogService.getUserLogs(userId);
    }
}