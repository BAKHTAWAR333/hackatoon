import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { storage } from "../utils/storage";

// Add Google Identity Services types
declare global {
  interface Window {
    google: any;
  }
}

export function Auth() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [selectedUser, setSelectedUser] = useState('ayesha');
  const [role, setRole] = useState<'need-help' | 'can-help' | 'both'>('both');
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [googleUser, setGoogleUser] = useState<any>(null);

  const demoUsers = [
    { id: 'ayesha', name: 'Ayesha Khan', email: 'community@helphub.ai' },
    { id: 'sara', name: 'Sara Noor', email: 'sara@helphub.ai' },
    { id: 'rahul', name: 'Rahul Sharma', email: 'rahul@helphub.ai' },
    { id: 'john', name: 'John Doe', email: 'john@helphub.ai' },
  ];

  // Initialize Google Sign-In
  useEffect(() => {
    // Load Google Identity Services script
    const script = document.createElement('script');
    script.src = 'https://accounts.google.com/gsi/client';
    script.async = true;
    script.defer = true;
    document.head.appendChild(script);

    script.onload = () => {
      if (window.google) {
        initializeGoogleSignIn();
      }
    };

    return () => {
      // Cleanup
      const existingScript = document.querySelector('script[src="https://accounts.google.com/gsi/client"]');
      if (existingScript) {
        existingScript.remove();
      }
    };
  }, []);

  const initializeGoogleSignIn = () => {
    if (!window.google) return;

    window.google.accounts.id.initialize({
      client_id: 'YOUR_GOOGLE_CLIENT_ID.apps.googleusercontent.com', // Replace with your actual Google Client ID
      callback: handleGoogleCredentialResponse,
      auto_select: false,
      cancel_on_tap_outside: true,
    });

    // Render the Google Sign-In button
    window.google.accounts.id.renderButton(
      document.getElementById('googleSignInButton'),
      {
        theme: 'outline',
        size: 'large',
        text: 'continue_with',
        shape: 'rectangular',
        width: '100%',
      }
    );
  };

  const handleGoogleCredentialResponse = async (response: any) => {
    setIsGoogleLoading(true);
    
    try {
      // Decode the JWT token to get user info
      const decodedToken = parseJwt(response.credential);
      
      // Verify the token with your backend (optional but recommended)
      const verificationResult = await verifyGoogleToken(response.credential);
      
      if (verificationResult.verified) {
        // Create user object from Google data
        const googleUserData = {
          id: decodedToken.sub,
          name: decodedToken.name,
          email: decodedToken.email,
          picture: decodedToken.picture,
          email_verified: decodedToken.email_verified,
          role: role,
          skills: ['JavaScript', 'React', 'UI Design'],
          interests: ['Web Development', 'Design'],
          location: 'Karachi',
          trustScore: 86,
          helpGiven: 8,
          helpReceived: 12,
          badges: ['Quick Responder', 'Trusted Helper'],
          authProvider: 'google',
        };
        
        setGoogleUser(googleUserData);
        storage.setCurrentUser(googleUserData);
        storage.initializeDemoData();
        
        // Redirect based on mode
        if (mode === 'signup') {
          navigate('/onboarding');
        } else {
          navigate('/app');
        }
      } else {
        console.error('Google token verification failed');
        alert('Google login verification failed. Please try again.');
      }
    } catch (error) {
      console.error('Google login error:', error);
      alert('Failed to login with Google. Please try again.');
    } finally {
      setIsGoogleLoading(false);
    }
  };

  // Helper function to parse JWT token
  const parseJwt = (token: string) => {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split('')
          .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
          .join('')
      );
      return JSON.parse(jsonPayload);
    } catch (error) {
      console.error('Error parsing JWT:', error);
      return null;
    }
  };

  // Verify Google token with backend (mock implementation)
  const verifyGoogleToken = async (token: string) => {
    // Option 1: Send token to your backend for verification
    // const response = await fetch('/api/auth/google/verify', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ token }),
    // });
    // return await response.json();
    
    // Option 2: Client-side verification (for demo purposes)
    // In production, always verify on the backend!
    return new Promise<{ verified: boolean }>((resolve) => {
      setTimeout(() => {
        resolve({ verified: true });
      }, 500);
    });
  };

  const handleContinue = () => {
    const user = demoUsers.find(u => u.id === selectedUser);
    if (user) {
      const fullUser = {
        ...user,
        role,
        skills: ['JavaScript', 'React', 'UI Design'],
        interests: ['Web Development', 'Design'],
        location: 'Karachi',
        trustScore: 86,
        helpGiven: 8,
        helpReceived: 12,
        badges: ['Quick Responder', 'Trusted Helper'],
      };
      storage.setCurrentUser(fullUser);
      storage.initializeDemoData();

      if (mode === 'signup') {
        navigate('/onboarding');
      } else {
        navigate('/app');
      }
    }
  };

  return (
    <div className="flex min-h-screen bg-[#f9fafb]">
      {/* Left Side */}
      <div className="flex w-1/2 items-center justify-center p-12">
        <div className="w-full max-w-md rounded-lg border border-[#e5e7eb] bg-[#1f2937] p-8 text-white">
          <div className="mb-6 text-sm uppercase tracking-wide text-[#9ca3af]">
            COMMUNITY ACCESS
          </div>
          <h1 className="mb-4 text-4xl font-bold">
            Enter the support<br />network.
          </h1>
          <p className="mb-6 text-[#d1d5db]">
            Choose a demo identity, set your role, and jump into a multi-page
            product flow designed for asking, offering, and tracking help with
            a premium interface.
          </p>
          <ul className="space-y-3 text-sm text-[#d1d5db]">
            <li className="flex items-start gap-2">
              <span className="mt-0.5">•</span>
              <span>Role-based entry for Need Help, Can Help, or Both</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-0.5">•</span>
              <span>Direct path into dashboard, requests, AI Center, and community feed</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-0.5">•</span>
              <span>Persistent demo session powered by LocalStorage</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Right Side */}
      <div className="flex w-1/2 items-center justify-center p-12">
        <div className="w-full max-w-md rounded-lg border border-[#e5e7eb] bg-white p-8">
          {/* Header */}
          <div className="mb-8 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#0d9488] text-white">
              <span className="font-semibold">H</span>
            </div>
            <div>
              <h2 className="text-lg font-semibold text-[#111827]">HelpHub AI</h2>
            </div>
          </div>

          <div className="mb-6">
            <div className="text-sm uppercase tracking-wide text-[#6b7280]">LOGIN / SIGNUP</div>
            <h2 className="mt-2 text-2xl font-bold text-[#111827]">
              Authenticate your<br />community profile
            </h2>
          </div>

          {/* Mode Toggle */}
          <div className="mb-6 flex gap-2 rounded-md border border-[#e5e7eb] p-1">
            <button
              onClick={() => setMode('login')}
              className={`flex-1 rounded px-4 py-2 text-sm font-medium transition-colors ${
                mode === 'login'
                  ? 'bg-[#0d9488] text-white'
                  : 'text-[#6b7280] hover:text-[#111827]'
              }`}
            >
              Login
            </button>
            <button
              onClick={() => setMode('signup')}
              className={`flex-1 rounded px-4 py-2 text-sm font-medium transition-colors ${
                mode === 'signup'
                  ? 'bg-[#0d9488] text-white'
                  : 'text-[#6b7280] hover:text-[#111827]'
              }`}
            >
              Signup
            </button>
          </div>

          {/* Form */}
          <div className="space-y-4">
            <div>
              <label className="mb-2 block text-sm font-medium text-[#111827]">
                Select demo user
              </label>
              <select
                value={selectedUser}
                onChange={(e) => setSelectedUser(e.target.value)}
                className="w-full rounded-md border border-[#e5e7eb] bg-white px-3 py-2 text-sm text-[#111827] focus:border-[#0d9488] focus:outline-none focus:ring-1 focus:ring-[#0d9488]"
              >
                {demoUsers.map((user) => (
                  <option key={user.id} value={user.id}>
                    {user.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-[#111827]">
                Role selection
              </label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value as any)}
                className="w-full rounded-md border border-[#e5e7eb] bg-white px-3 py-2 text-sm text-[#111827] focus:border-[#0d9488] focus:outline-none focus:ring-1 focus:ring-[#0d9488]"
              >
                <option value="need-help">Need Help</option>
                <option value="can-help">Can Help</option>
                <option value="both">Both</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="mb-2 block text-sm font-medium text-[#111827]">Email</label>
                <input
                  type="email"
                  value={demoUsers.find(u => u.id === selectedUser)?.email || ''}
                  readOnly
                  className="w-full rounded-md border border-[#e5e7eb] bg-[#f9fafb] px-3 py-2 text-sm text-[#6b7280]"
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-[#111827]">Password</label>
                <input
                  type="password"
                  value="••••••••"
                  readOnly
                  className="w-full rounded-md border border-[#e5e7eb] bg-[#f9fafb] px-3 py-2 text-sm text-[#6b7280]"
                />
              </div>
            </div>

            {/* Divider */}
            <div className="relative my-4">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-[#e5e7eb]"></div>
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-2 text-[#6b7280]">Or continue with</span>
              </div>
            </div>

            {/* Google Sign-In Button */}
            <div id="googleSignInButton" className="flex justify-center"></div>

            {/* Demo Continue Button */}
            <button
              onClick={handleContinue}
              disabled={isGoogleLoading}
              className="w-full rounded-md bg-[#0d9488] px-4 py-2.5 text-sm font-medium text-white hover:bg-[#0f766e] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isGoogleLoading ? 'Verifying...' : 'Continue with demo account'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}