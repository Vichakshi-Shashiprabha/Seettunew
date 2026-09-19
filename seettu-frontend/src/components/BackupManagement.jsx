import React, { useState } from 'react';
import axios from 'axios';

const BackupManagement = () => {
    // Local state to store response messages and restore path
    const [statusMessage, setStatusMessage] = useState('');
    const [restoreFilePath, setRestoreFilePath] = useState('');
    const [loading, setLoading] = useState(false);

    // Backend base API URL
    const API_BASE_URL = 'http://localhost:8080/api/admin/backup';

    // Function to trigger manual database backup
    const handleTriggerBackup = async () => {
        setLoading(true);
        setStatusMessage('Generating database backup...');

        try {
            const response = await axios.post(`${API_BASE_URL}/trigger`);
            setStatusMessage(response.data);
        } catch (error) {
            console.error('Backup error:', error);
            setStatusMessage('Failed to create database backup.');
        } finally {
            setLoading(false);
        }
    };

    // Function to restore database from a specified path
    const handleRestoreDatabase = async (e) => {
        e.preventDefault();
        
        if (!restoreFilePath.trim()) {
            setStatusMessage('Please provide a valid backup file path.');
            return;
        }

        setLoading(true);
        setStatusMessage('Restoring database, please wait...');

        try {
            const response = await axios.post(
                `${API_BASE_URL}/restore?filePath=${encodeURIComponent(restoreFilePath)}`
            );
            setStatusMessage(response.data);
        } catch (error) {
            console.error('Restore error:', error);
            setStatusMessage('Failed to restore database. Check server logs.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
            <h2>Database Backup & Recovery Support</h2>
            
            {/* Display status or error messages */}
            {statusMessage && (
                <div style={{ padding: '10px', marginBottom: '15px', background: '#f0f0f0', borderRadius: '4px' }}>
                    {statusMessage}
                </div>
            )}

            {/* Manual Backup Section */}
            <div style={{ marginBottom: '30px', border: '1px solid #ddd', padding: '15px', borderRadius: '5px' }}>
                <h3>1. Manual Backup</h3>
                <p>Click below to create an immediate backup of the MySQL database.</p>
                <button 
                    onClick={handleTriggerBackup} 
                    disabled={loading}
                    style={{ padding: '8px 16px', cursor: 'pointer' }}
                >
                    {loading ? 'Processing...' : 'Create Backup Now'}
                </button>
            </div>

            {/* Restore Database Section */}
            <div style={{ border: '1px solid #ddd', padding: '15px', borderRadius: '5px' }}>
                <h3>2. Data Recovery (Restore)</h3>
                <form onSubmit={handleRestoreDatabase}>
                    <div style={{ marginBottom: '10px' }}>
                        <label style={{ display: 'block', marginBottom: '5px' }}>SQL Backup File Path:</label>
                        <input 
                            type="text" 
                            placeholder="./backups/seettu_backup_2026-09-14.sql"
                            value={restoreFilePath}
                            onChange={(e) => setRestoreFilePath(e.target.value)}
                            style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
                        />
                    </div>
                    <button 
                        type="submit" 
                        disabled={loading}
                        style={{ padding: '8px 16px', cursor: 'pointer', backgroundColor: '#d9534f', color: '#fff', border: 'none' }}
                    >
                        {loading ? 'Restoring...' : 'Restore Database'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default BackupManagement;