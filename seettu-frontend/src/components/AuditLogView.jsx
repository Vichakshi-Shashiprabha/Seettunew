import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AuditLogView = ({ userId }) => {
    const [logs, setLogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch user logs from backend port 8081
    const AUDIT_LOG_API = `http://localhost:8080/api/audit-logs/user/${userId ||1}`;

    useEffect(() => {
        fetchLogs();
    }, [userId]);

    const fetchLogs = async () => {
        try {
            setLoading(true);
            const response = await axios.get(AUDIT_LOG_API);
            setLogs(response.data);
            setError(null);
        } catch (err) {
            console.error('Error fetching audit logs:', err);
            setError('Failed to load activity log history.');
        } finally {
            setLoading(false);
        }
    };

    // Download CSV file from backend endpoint
    const handleExportCsv = () => {
        window.open(`http://localhost:8080/api/export/logs/csv/${userId || 1}`, '_blank');
    };

    return (
        <div style={{ padding: '20px', maxWidth: '800px', margin: '20px auto', backgroundColor: '#fff', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
                <h3 style={{ margin: 0 }}>Activity & Audit Logs 📝</h3>
                <div style={{ display: 'flex', gap: '8px' }}>
                    <button 
                        onClick={fetchLogs} 
                        style={{ padding: '6px 12px', cursor: 'pointer', backgroundColor: '#6c757d', color: '#fff', border: 'none', borderRadius: '4px' }}
                    >
                        Refresh
                    </button>
                    <button 
                        onClick={handleExportCsv} 
                        style={{ padding: '6px 12px', cursor: 'pointer', backgroundColor: '#28a745', color: '#fff', border: 'none', borderRadius: '4px' }}
                    >
                        Export CSV 📥
                    </button>
                </div>
            </div>

            {loading && <p>Loading logs...</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}

            {!loading && !error && (
                <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '10px' }}>
                    <thead>
                        <tr style={{ backgroundColor: '#f8f9fa', textAlign: 'left', borderBottom: '2px solid #dee2e6' }}>
                            <th style={{ padding: '10px' }}>ID</th>
                            <th style={{ padding: '10px' }}>Action</th>
                            <th style={{ padding: '10px' }}>Details</th>
                            <th style={{ padding: '10px' }}>Date & Time</th>
                        </tr>
                    </thead>
                    <tbody>
                        {logs.length > 0 ? (
                            logs.map((log) => (
                                <tr key={log.id} style={{ borderBottom: '1px solid #eee' }}>
                                    <td style={{ padding: '10px' }}>{log.id}</td>
                                    <td style={{ padding: '10px' }}>
                                        <span style={{ backgroundColor: '#e9ecef', padding: '3px 8px', borderRadius: '4px', fontSize: '13px' }}>
                                            {log.action}
                                        </span>
                                    </td>
                                    <td style={{ padding: '10px' }}>{log.details}</td>
                                    <td style={{ padding: '10px', fontSize: '13px', color: '#666' }}>
                                        {new Date(log.timestamp).toLocaleString()}
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="4" style={{ textAlign: 'center', padding: '20px', color: '#888' }}>
                                    No activity logs found for this user.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default AuditLogView;