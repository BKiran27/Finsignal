import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

export const AuthPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [loading, setLoading] = useState(false);
  const { signUp, signIn } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isSignUp) {
        const { error } = await signUp(email, password, name);
        if (error) {
          toast.error(error.message || 'Sign up failed');
        } else {
          toast.success('Sign up successful! Check your email.');
          setEmail('');
          setPassword('');
          setName('');
        }
      } else {
        const { error } = await signIn(email, password);
        if (error) {
          toast.error(error.message || 'Sign in failed');
        } else {
          toast.success('Signed in successfully!');
        }
      }
    } catch (error) {
      toast.error('An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-surface-1 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-surface-2 border border-b1 rounded-2xl p-8">
          <div className="flex justify-center mb-8">
            <div className="w-12 h-12 rounded-xl bg-brand flex items-center justify-center">
              <span className="text-white font-bold text-lg">FS</span>
            </div>
          </div>
          
          <h1 className="text-2xl font-bold text-center mb-2">FinSignal Capital</h1>
          <p className="text-sm text-t2 text-center mb-8">
            AI-Powered Investment Research & Personal Finance
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            {isSignUp && (
              <div>
                <label className="block text-sm font-medium mb-2">Full Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-2 bg-surface-3 border border-b0 rounded-lg focus:outline-none focus:border-brand transition-colors"
                  placeholder="Your name"
                  required={isSignUp}
                />
              </div>
            )}

            <div>
              <label className="block text-sm font-medium mb-2">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 bg-surface-3 border border-b0 rounded-lg focus:outline-none focus:border-brand transition-colors"
                placeholder="your@email.com"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 bg-surface-3 border border-b0 rounded-lg focus:outline-none focus:border-brand transition-colors"
                placeholder="••••••••"
                required
              />
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-brand hover:bg-brand/90 text-white font-semibold py-2 rounded-lg transition-all"
            >
              {loading ? 'Loading...' : isSignUp ? 'Create Account' : 'Sign In'}
            </Button>
          </form>

          {/* Social Logins Divider */}
          <div className="my-5 flex items-center justify-between text-xs text-t3">
            <span className="w-[30%] h-[1px] bg-b1"></span>
            <span>OR CONTINUE WITH</span>
            <span className="w-[30%] h-[1px] bg-b1"></span>
          </div>

          {/* Social Logins Mock Buttons */}
          <div className="grid grid-cols-2 gap-3 mb-5">
            <button 
              onClick={() => {
                toast.info("Simulating Secure Google Authentication Flow...");
                setTimeout(() => {
                  signIn("google-developer@example.com", "google-oauth-1123");
                  toast.success("Successfully logged in via Google sandbox!");
                }, 1000);
              }}
              className="py-2 px-3 border border-b1 rounded-lg hover:bg-[rgba(255,255,255,0.02)] text-xs font-semibold flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
            >
              <span>🌐</span> Google
            </button>
            <button 
              onClick={() => {
                toast.info("Simulating Secure GitHub Authentication Flow...");
                setTimeout(() => {
                  signIn("github-developer@example.com", "github-oauth-1123");
                  toast.success("Successfully logged in via GitHub sandbox!");
                }, 1000);
              }}
              className="py-2 px-3 border border-b1 rounded-lg hover:bg-[rgba(255,255,255,0.02)] text-xs font-semibold flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
            >
              <span>🐙</span> GitHub
            </button>
          </div>

          {/* Guest Logins Section */}
          <div className="space-y-2">
            <button 
              onClick={() => {
                signIn("sandbox-guest@example.com", "sandbox-pass");
                toast.success("Logged in successfully as Guest Sandbox Developer!");
              }}
              className="w-full py-2 bg-surface-3 hover:bg-surface-3/80 text-t1 border border-b1 text-xs font-bold rounded-lg transition-all active:scale-[0.98]"
            >
              👤 Quick Guest Sandbox Login
            </button>
            <button 
              onClick={() => {
                signIn("admin-monitor@finsignal.com", "admin-pass");
                toast.success("Logged in successfully as Admin Monitor!");
              }}
              className="w-full py-2 bg-brand/10 hover:bg-brand/15 text-brand border border-brand/20 text-xs font-bold rounded-lg transition-all active:scale-[0.98]"
            >
              🛡️ Quick Admin Monitor Login
            </button>
          </div>

          <div className="mt-5 text-center">
            <p className="text-sm text-t2">
              {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
              <button
                onClick={() => {
                  setIsSignUp(!isSignUp);
                  setEmail('');
                  setPassword('');
                  setName('');
                }}
                className="text-brand font-semibold hover:text-brand/80 transition-colors"
              >
                {isSignUp ? 'Sign In' : 'Sign Up'}
              </button>
            </p>
          </div>
        </div>

        <div className="mt-6 text-center text-[10px] text-t3">
          <p>Local sandbox offline bypass active.</p>
        </div>
      </div>
    </div>
  );
};