package com.seettumanager.seettu_backend.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.io.File;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Date;

@Service
public class DatabaseBackupService {

    // Reading database details from application.properties file
    @Value("${spring.datasource.username}")
    private String dbUser;

    @Value("${spring.datasource.password}")
    private String dbPassword;

    // Database name (Make sure to match your actual database name)
    private final String dbName = "seettumanager_db";

    // Standard folder location to save our daily backup files
    private final String backupFolderPath = "./backups/";


     //Runs automatically every day at midnight (12:00 AM)
     //Cron expression syntax: second, minute, hour, day, month, weekday

    @Scheduled(cron = "0 0 0 * * ?")
    public String generateDatabaseBackup() {
        // Create the backup directory if it doesn't exist yet
        File backupFolder = new File(backupFolderPath);
        if (!backupFolder.exists()) {
            backupFolder.mkdirs();
        }

        // Add today's timestamp to the filename so we don't overwrite older backups
        String timeStamp = new SimpleDateFormat("yyyy-MM-dd_HH-mm-ss").format(new Date());
        String backupFilePath = backupFolderPath + "seettu_backup_" + timeStamp + ".sql";

        // Construct the mysqldump command line script
        String dumpCommand = String.format("mysqldump -u%s -p%s %s -r %s",
                dbUser, dbPassword, dbName, backupFilePath);

        try {
            // Run the command using system runtime process
            Process process = Runtime.getRuntime().exec(dumpCommand);
            int processComplete = process.waitFor();

            if (processComplete == 0) {
                System.out.println("Backup created successfully at: " + backupFilePath);
                return backupFilePath;
            } else {
                System.err.println("Database backup failed with error code: " + processComplete);
            }
        } catch (IOException | InterruptedException e) {
            System.err.println("Exception occurred while generating DB backup: " + e.getMessage());
            Thread.currentThread().interrupt();
        }

        return null;
    }

    //Restores the MySQL database using a specified .sql file path
   //@param filePath Path of the backup SQL file to restore
    //@return true if successful, false otherwise

    public boolean restoreDatabase(String filePath) {
        // Command to execute mysql import script
        String[] restoreCommand = new String[]{
                "mysql",
                "-u" + dbUser,
                "-p" + dbPassword,
                dbName,
                "-e",
                "source " + filePath
        };

        try {
            // Run the restore command in system shell
            Process process = Runtime.getRuntime().exec(restoreCommand);
            int processComplete = process.waitFor();

            if (processComplete == 0) {
                System.out.println("Database restored successfully from: " + filePath);
                return true;
            } else {
                System.err.println("Database restore failed with exit code: " + processComplete);
            }
        } catch (IOException | InterruptedException e) {
            System.err.println("Exception during database restoration: " + e.getMessage());
            Thread.currentThread().interrupt();
        }

        return false;
    }
}