'use client';

import { useState, useEffect } from 'react';
import { Editor } from '@monaco-editor/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/components/ui/use-toast';
import axios from 'axios';

interface Script {
  _id?: string;
  name: string;
  content: string;
  isPrivate: boolean;
}

export default function ScriptEditor({ script }: { script: Script | null }) {
  const [name, setName] = useState('');
  const [content, setContent] = useState('');
  const [isPrivate, setIsPrivate] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (script) {
      setName(script.name);
      setContent(script.content);
      setIsPrivate(script.isPrivate);
    }
  }, [script]);

  const handleSave = async () => {
    try {
      if (script?._id) {
        await axios.put(`/api/scripts/${script._id}`, { name, content, isPrivate });
      } else {
        await axios.post('/api/scripts', { name, content, isPrivate });
      }
      toast({
        title: 'Success',
        description: 'Script saved successfully',
      });
    } catch (error) {
      console.error('Error saving script:', error);
      toast({
        title: 'Error',
        description: 'Failed to save script',
        variant: 'destructive',
      });
    }
  };

  const handleExecute = async () => {
    try {
      const response = await axios.post('/api/execute', { script: content });
      toast({
        title: 'Execution Result',
        description: response.data.output,
      });
    } catch (error) {
      console.error('Error executing script:', error);
      toast({
        title: 'Error',
        description: 'Failed to execute script',
        variant: 'destructive',
      });
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="name">Script Name</Label>
        <Input id="name" value={name} onChange={(e) => setName(e.target.value)} />
      </div>
      <div>
        <Label htmlFor="editor">Script Content</Label>
        <Editor
          height="400px"
          language="powershell"
          value={content}
          onChange={(value) => setContent(value || '')}
          options={{
            minimap: { enabled: false },
          }}
        />
      </div>
      <div className="flex items-center space-x-2">
        <Checkbox
          id="isPrivate"
          checked={isPrivate}
          onCheckedChange={(checked) => setIsPrivate(checked as boolean)}
        />
        <Label htmlFor="isPrivate">Private Script</Label>
      </div>
      <div className="flex space-x-2">
        <Button onClick={handleSave}>Save</Button>
        <Button onClick={handleExecute}>Execute</Button>
      </div>
    </div>
  );
}