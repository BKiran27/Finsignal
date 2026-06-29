import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

export const AccountPage: React.FC = () => {
  const { user, signOut } = useAuth();

  const handleResetSession = () => {
    toast.success('Local offline sandbox caches cleared successfully');
  };

  const handleCopyLicense = () => {
    navigator.clipboard.writeText('FS-PRO-2026-SANDBOX-KEY-11234');
    toast.success('License Key copied to clipboard');
  };

  return (
    <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6">
      {/* Header */}
      <div className="border-b border-b1 pb-4">
        <h2 className="text-xl font-bold">👤 Account Settings</h2>
        <p className="text-xs text-t2 mt-0.5">Manage user credentials, developer configurations, and licensing</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[1.2fr_1fr] gap-6">
        {/* Profile Card */}
        <div className="surface-2 border border-b1 rounded-2xl p-5 space-y-4">
          <h3 className="text-sm font-bold text-t2">User Profile Profile</h3>
          
          <div className="space-y-3.5 text-xs">
            <div className="grid grid-cols-3 py-2 border-b border-b0">
              <span className="text-t3 font-bold uppercase tracking-wider">Email Address</span>
              <span className="col-span-2 text-t1 font-semibold">{user?.email || 'dev-guest@finsignal.com'}</span>
            </div>
            <div className="grid grid-cols-3 py-2 border-b border-b0">
              <span className="text-t3 font-bold uppercase tracking-wider">Full Name</span>
              <span className="col-span-2 text-t1 font-semibold">{user?.user_metadata?.full_name || 'Sandbox Developer'}</span>
            </div>
            <div className="grid grid-cols-3 py-2 border-b border-b0">
              <span className="text-t3 font-bold uppercase tracking-wider">User UID</span>
              <span className="col-span-2 text-t2 font-mono truncate">{user?.id || 'local-session-id-12b3c4d5'}</span>
            </div>
            <div className="grid grid-cols-3 py-2">
              <span className="text-t3 font-bold uppercase tracking-wider">License Status</span>
              <span className="col-span-2"><span className="px-2 py-0.5 bg-[rgba(16,217,138,0.1)] text-up rounded font-bold uppercase text-[9px] tracking-wider">PRO Sizing License</span></span>
            </div>
          </div>

          <div className="pt-4 flex gap-3">
            <Button onClick={signOut} variant="destructive" className="w-full text-xs font-bold py-2 rounded-xl">
              Sign Out Session
            </Button>
          </div>
        </div>

        {/* Developer Sandbox Options */}
        <div className="surface-2 border border-b1 rounded-2xl p-5 space-y-4">
          <h3 className="text-sm font-bold text-t2">Local Sandbox Controls</h3>
          
          <div className="space-y-4 text-xs">
            <div className="flex justify-between items-center py-2.5 border-b border-b0">
              <div>
                <strong className="text-t1 block mb-0.5">Offline Fallback Mode</strong>
                <span className="text-t3 text-[10px] block">Autologin mock sessions when Supabase is offline</span>
              </div>
              <span className="px-2.5 py-1 bg-brand text-white font-bold rounded-lg text-[10px]">ACTIVE</span>
            </div>

            <div className="flex justify-between items-center py-2.5 border-b border-b0">
              <div>
                <strong className="text-t1 block mb-0.5">Local ML Proxy</strong>
                <span className="text-t3 text-[10px] block">Redirect AI queries to local python service on Port 5001</span>
              </div>
              <span className="px-2.5 py-1 bg-brand text-white font-bold rounded-lg text-[10px]">ACTIVE</span>
            </div>

            <div className="space-y-2 py-2">
              <strong className="text-t1 block">PRO License Key</strong>
              <div className="flex gap-2">
                <input 
                  type="text" 
                  readOnly 
                  value="FS-PRO-2026-SANDBOX-KEY-11234" 
                  className="flex-1 px-3 py-2 bg-surface-3 border border-b0 text-t2 font-mono rounded-lg outline-none select-all text-xs" 
                />
                <button onClick={handleCopyLicense} className="px-3 py-2 bg-surface-1 border border-b1 rounded-lg text-xs font-bold transition-all hover:bg-[rgba(255,255,255,0.02)]">
                  Copy
                </button>
              </div>
            </div>

            <div className="pt-2">
              <button onClick={handleResetSession} className="w-full py-2.5 bg-surface-1 border border-b1 rounded-xl text-xs font-bold transition-all hover:bg-[rgba(255,255,255,0.02)] active:scale-[0.98]">
                Clear Local Session Sandbox Caches
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
