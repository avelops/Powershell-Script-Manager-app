'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';

export default function ScheduledTasks() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get('/api/scheduled-tasks');
      setTasks(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching scheduled tasks:', error);
      setLoading(false);
    }
  };

  const handleDelete = async (taskId) => {
    try {
      await axios.delete(`/api/scheduled-tasks/${taskId}`);
      fetchTasks();
    } catch (error) {
      console.error('Error deleting scheduled task:', error);
    }
  };

  if (loading) {
    return <Loader2 className="h-8 w-8 animate-spin" />;
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Script Name</TableHead>
          <TableHead>Schedule</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {tasks.map((task) => (
          <TableRow key={task._id}>
            <TableCell>{task.scriptName}</TableCell>
            <TableCell>{task.schedule}</TableCell>
            <TableCell>
              <Button variant="destructive" onClick={() => handleDelete(task._id)}>Delete</Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}