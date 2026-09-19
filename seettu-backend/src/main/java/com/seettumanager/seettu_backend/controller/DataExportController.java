package com.seettumanager.seettu_backend.controller;

import com.seettumanager.seettu_backend.model.AuditLog;
import com.seettumanager.seettu_backend.service.AuditLogService;
import com.seettumanager.seettu_backend.service.CsvExportService;
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.ByteArrayInputStream;
import java.util.List;

@RestController
@RequestMapping("/api/export")
@CrossOrigin(origins = "http://localhost:3000")
public class DataExportController {

    private final AuditLogService auditLogService;
    private final CsvExportService csvExportService;

    public DataExportController(AuditLogService auditLogService, CsvExportService csvExportService) {
        this.auditLogService = auditLogService;
        this.csvExportService = csvExportService;
    }

    // Endpoint to stream CSV file to the browser
    @GetMapping("/logs/csv/{userId}")
    public ResponseEntity<InputStreamResource> exportLogsToCsv(@PathVariable Long userId) {
        List<AuditLog> logs = auditLogService.getUserLogs(userId);
        ByteArrayInputStream in = csvExportService.exportAuditLogsToCsv(logs);

        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Disposition", "attachment; filename=audit_logs_user_" + userId + ".csv");

        return ResponseEntity.ok()
                .headers(headers)
                .contentType(MediaType.parseMediaType("text/csv"))
                .body(new InputStreamResource(in));
    }
}
