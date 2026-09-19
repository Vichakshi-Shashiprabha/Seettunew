package com.seettumanager.seettu_backend.service;

import com.seettumanager.seettu_backend.model.AuditLog;
import com.seettumanager.seettu_backend.repository.AuditLogRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AuditLogService {

    private final AuditLogRepository auditLogRepository;

    public AuditLogService(AuditLogRepository auditLogRepository) {
        this.auditLogRepository = auditLogRepository;
    }

    // Record user activity into the database
    public void logActivity(Long userId, String action, String details) {
        AuditLog log = new AuditLog(userId, action, details);
        auditLogRepository.save(log);
    }

    // Retrieve activity history for a specific user
    public List<AuditLog> getUserLogs(Long userId) {
        return auditLogRepository.findByUserIdOrderByTimestampDesc(userId);
    }
}
