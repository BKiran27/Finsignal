import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';

export const Header: React.FC<{ onSignOut: () => void; userName: string }> = ({ onSignOut, userName }) => {
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await onSignOut();
    navigate('/auth');
  };

  return (
    <div className="h-16 border-b border-b1 surface-1 flex items-center justify-between px-6">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-brand flex items-center justify-center">
          <span className="text-white font-bold text-sm">FS</span>
        </div>
        <h1 className="font-bold text-lg">FinSignal Capital</h1>
      </div>
      <div className="flex items-center gap-4">
        <span className="text-sm text-t2">Welcome, {userName}</span>
        <Button
          onClick={handleSignOut}
          variant="outline"
          size="sm"
          className="text-xs"
        >
          Sign Out
        </Button>
      </div>
    </div>
  );
};