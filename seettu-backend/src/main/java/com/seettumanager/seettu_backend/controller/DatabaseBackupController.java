package com.seettumanager.seettu_backend.controller;

import com.seettumanager.seettu_backend.service.DatabaseBackupService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin/backup")
public class DatabaseBackupController {

    @Autowired
    private DatabaseBackupService backupService;

    // Trigger manual backup
    @PostMapping("/trigger")
    public ResponseEntity<String> triggerManualBackup() {
        String filePath = backupService.generateDatabaseBackup();

        if (filePath != null) {
            return ResponseEntity.ok("Backup created: " + filePath);
        } else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Backup failed. Check server logs.");
        }
    }

    // Restore DB from a given file path
    @PostMapping("/restore")
    public ResponseEntity<String> restoreDatabase(@RequestParam("filePath") String filePath) {
        boolean isRestored = backupService.restoreDatabase(filePath);

        if (isRestored) {
            return ResponseEntity.ok("Database restored successfully.");
        } else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Restore failed. Check file path or DB logs.");
        }
    }
}