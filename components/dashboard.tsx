'use client';

import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ScriptList from '@/components/script-list';
import ScriptEditor from '@/components/script-editor';
import ExecutionHistory from '@/components/execution-history';
import ScheduledTasks from '@/components/scheduled-tasks';

export default function Dashboard() {
  const [selectedScript, setSelectedScript] = useState(null);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">PowerShell Script Manager</h1>
      <Tabs defaultValue="scripts">
        <TabsList>
          <TabsTrigger value="scripts">Scripts</TabsTrigger>
          <TabsTrigger value="editor">Editor</TabsTrigger>
          <TabsTrigger value="history">Execution History</TabsTrigger>
          <TabsTrigger value="scheduled">Scheduled Tasks</TabsTrigger>
        </TabsList>
        <TabsContent value="scripts">
          <ScriptList onSelectScript={setSelectedScript} />
        </TabsContent>
        <TabsContent value="editor">
          <ScriptEditor script={selectedScript} />
        </TabsContent>
        <TabsContent value="history">
          <ExecutionHistory />
        </TabsContent>
        <TabsContent value="scheduled">
          <ScheduledTasks />
        </TabsContent>
      </Tabs>
    </div>
  );
}