'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Loader2 } from 'lucide-react';

export default function ExecutionHistory() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      const response = await axios.get('/api/execution-history');
      setHistory(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching execution history:', error);
      setLoading(false);
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
          <TableHead>Execution Date</TableHead>
          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {history.map((entry) => (
          <TableRow key={entry._id}>
            <TableCell>{entry.scriptName}</TableCell>
            <TableCell>{new Date(entry.executionDate).toLocaleString()}</TableCell>
            <TableCell>{entry.status}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}