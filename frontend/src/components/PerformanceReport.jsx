import React, { useEffect, useState, useCallback } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { DateRangePicker } from '@nextui-org/react';
import axios from 'axios';

const PerformanceReport = () => {
  const [dateRange, setDateRange] = useState({ start: null, end: null });
  const [durationData, setDurationData] = useState([]);
  const [completedSessionsData, setCompletedSessionsData] = useState([]);

  const fetchDurationData = useCallback(async () => {
    console.log('Selected date range:', dateRange);
    try {
      const userId = localStorage.getItem('userId');
      const response = await axios.get('http://localhost:8000/api/performance-reports/duration_by_date/', {
        params: {
          user_id: userId,
          start_date: dateRange.start,
          end_date: dateRange.end,
        },
      });
      console.log('API response data:', response.data);
      print("test")
      const durationData = response.data.map(item => ({
        date: item.date,
        duration: item.duration / 60, // Convert seconds to minutes
      }));
      console.log('Processed duration data:', durationData);
      setDurationData(durationData);
    } catch (error) {
      console.error('Error fetching duration data:', error);
    }
  }, [dateRange]);

  const fetchCompletedSessionsData = useCallback(async () => {
    try {
      const userId = localStorage.getItem('userId');
      const response = await axios.get(`http://localhost:8000/api/tasks/?user_id=${userId}`);
      const tasks = response.data;
      const completedSessionsData = tasks.map((task) => ({
        name: task.name,
        completedSessions: task.completed_sessions,
      }));
      setCompletedSessionsData(completedSessionsData);
    } catch (error) {
      console.error('Error fetching completed sessions data:', error);
    }
  }, []);

  useEffect(() => {
    console.log('Date range state changed:', dateRange);
    if (dateRange.start && dateRange.end) {
      fetchDurationData();
    }
    fetchCompletedSessionsData();
  }, [fetchDurationData, fetchCompletedSessionsData, dateRange]);

  const handleDateRangeChange = (dates) => {
    console.log('Date range changed:', dates);
    if (Array.isArray(dates) && dates.length === 2) {
      const startDate = new Date(dates[0].year, dates[0].month - 1, dates[0].day);
      const endDate = new Date(dates[1].year, dates[1].month - 1, dates[1].day);
      setDateRange({ start: startDate.toISOString().slice(0, 10), end: endDate.toISOString().slice(0, 10) });
    }
  };

  const sampleData = [
    { date: '2023-04-15', duration: 120 },
    { date: '2023-04-16', duration: 180 },
  ];
  

  return (
    <div>
      <h2>Performance Report</h2>
      <div>
        <label htmlFor="date-range-picker">Select Date Range:</label>
        <DateRangePicker
          id="date-range-picker"
          onChange={handleDateRangeChange}
          aria-label="Select Date Range"
        />
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={durationData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="duration" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={completedSessionsData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="completedSessions" fill="#82ca9d" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PerformanceReport;