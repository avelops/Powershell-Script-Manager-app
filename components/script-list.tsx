'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';

interface Script {
  _id: string;
  name: string;
  description: string;
}

export default function ScriptList({ onSelectScript }: { onSelectScript: (script: Script) => void }) {
  const [scripts, setScripts] = useState<Script[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchScripts();
  }, []);

  const fetchScripts = async () => {
    try {
      const response = await axios.get<Script[]>('/api/scripts');
      setScripts(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching scripts:', error);
      setLoading(false);
    }
  };

  if (loading) {
    return <Loader2 className="h-8 w-8 animate-spin" />;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {scripts.map((script) => (
        <Card key={script._id}>
          <CardHeader>
            <CardTitle>{script.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">{script.description}</p>
            <Button onClick={() => onSelectScript(script)}>Edit</Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}