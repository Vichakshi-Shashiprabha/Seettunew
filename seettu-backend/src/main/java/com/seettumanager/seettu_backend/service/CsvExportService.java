package com.seettumanager.seettu_backend.service;

import com.seettumanager.seettu_backend.model.AuditLog;
import org.springframework.stereotype.Service;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.PrintWriter;
import java.util.List;

@Service
public class CsvExportService {

    // Converts audit log list into downloadable CSV byte stream
    public ByteArrayInputStream exportAuditLogsToCsv(List<AuditLog> logs) {
        ByteArrayOutputStream out = new ByteArrayOutputStream();
        PrintWriter writer = new PrintWriter(out);

        // Standard CSV headers
        writer.println("Log ID,User ID,Action,Details,Timestamp");

        for (AuditLog log : logs) {
            String detailsText = log.getDetails() != null ? log.getDetails().replace("\"", "\"\"") : "";
            String row = String.format("%d,%d,\"%s\",\"%s\",\"%s\"",
                    log.getId(),
                    log.getUserId(),
                    log.getAction() != null ? log.getAction() : "",
                    detailsText,
                    log.getTimestamp() != null ? log.getTimestamp().toString() : ""
            );
            writer.println(row);
        }

        writer.flush();
        return new ByteArrayInputStream(out.toByteArray());
    }
}
