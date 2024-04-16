import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import axios from 'axios';

const PerformanceReport = () => {
    const [reportData, setReportData] = useState({
        labels: [],
        datasets: [
            {
                label: 'Task Durations',
                data: [],
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
            },
            {
                label: 'Completed Sessions',
                data: [],
                backgroundColor: 'rgba(255, 99, 132, 0.6)',
            },
        ],
    });

    useEffect(() => {
        const fetchPerformanceData = async () => {
            try {
                const userId = localStorage.getItem('userId');
                const response = await axios.get(`http://localhost:8000/api/tasks/?user_id=${userId}`);
                const tasks = response.data;

                const labels = tasks.map((task) => task.name);
                const durations = tasks.map((task) => {
                    const sessions = task.session_set;
                    const totalDuration = sessions.reduce((sum, session) => {
                        const start = new Date(session.starttime);
                        const end = new Date(session.endtime);
                        const duration = (end - start) / 1000; // Duration in seconds
                        return sum + duration;
                    }, 0);
                    return totalDuration / 60; // Convert to minutes
                });
                const completedSessions = tasks.map((task) => task.completed_sessions);

                setReportData({
                    labels,
                    datasets: [
                        {
                            label: 'Task Durations (minutes)',
                            data: durations,
                            backgroundColor: 'rgba(75, 192, 192, 0.6)',
                        },
                        {
                            label: 'Completed Sessions',
                            data: completedSessions,
                            backgroundColor: 'rgba(255, 99, 132, 0.6)',
                        },
                    ],
                });
            } catch (error) {
                console.error('Error fetching performance data:', error);
            }
        };

        fetchPerformanceData();
    }, []);

    return (
        <div>
            <h2>Performance Report</h2>
            <Bar data={reportData} />
        </div>
    );
};

export default PerformanceReport;