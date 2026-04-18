import { useState } from "react";
import { useNavigate } from "react-router";
import { storage } from "../utils/storage";
import { Sparkles } from "lucide-react";

export function Onboarding() {
  const navigate = useNavigate();
  const currentUser = storage.getCurrentUser();

  const [formData, setFormData] = useState({
    name: currentUser?.name || '',
    skills: 'JavaScript, React, UI Design',
    interests: 'Web Development, Design',
    location: 'Karachi',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentUser) {
      const updatedUser = {
        ...currentUser,
        name: formData.name,
        skills: formData.skills.split(',').map(s => s.trim()),
        interests: formData.interests.split(',').map(s => s.trim()),
        location: formData.location,
      };
      storage.setCurrentUser(updatedUser);
    }
    navigate('/app');
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#f9fafb] p-6">
      <div className="w-full max-w-4xl">
        <div className="mb-8 text-center">
          <div className="mb-4 flex items-center justify-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[#0d9488] text-white">
              <span className="text-lg font-semibold">H</span>
            </div>
            <h1 className="text-2xl font-semibold text-[#111827]">HelpHub AI</h1>
          </div>
          <h2 className="text-3xl font-bold text-[#111827]">Complete your profile</h2>
          <p className="mt-2 text-[#6b7280]">Help us understand your expertise and interests</p>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Main Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="rounded-lg border border-[#e5e7eb] bg-white p-8">
              <div className="space-y-6">
                <div>
                  <label className="mb-2 block text-sm font-medium text-[#111827]">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full rounded-md border border-[#e5e7eb] px-3 py-2 text-sm text-[#111827] focus:border-[#0d9488] focus:outline-none focus:ring-1 focus:ring-[#0d9488]"
                    placeholder="Enter your full name"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-[#111827]">
                    Skills (comma-separated)
                  </label>
                  <input
                    type="text"
                    value={formData.skills}
                    onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
                    className="w-full rounded-md border border-[#e5e7eb] px-3 py-2 text-sm text-[#111827] focus:border-[#0d9488] focus:outline-none focus:ring-1 focus:ring-[#0d9488]"
                    placeholder="e.g., JavaScript, React, Python"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-[#111827]">
                    Interests (comma-separated)
                  </label>
                  <input
                    type="text"
                    value={formData.interests}
                    onChange={(e) => setFormData({ ...formData, interests: e.target.value })}
                    className="w-full rounded-md border border-[#e5e7eb] px-3 py-2 text-sm text-[#111827] focus:border-[#0d9488] focus:outline-none focus:ring-1 focus:ring-[#0d9488]"
                    placeholder="e.g., Web Development, Design, AI"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-[#111827]">
                    Location (City)
                  </label>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="w-full rounded-md border border-[#e5e7eb] px-3 py-2 text-sm text-[#111827] focus:border-[#0d9488] focus:outline-none focus:ring-1 focus:ring-[#0d9488]"
                    placeholder="e.g., Karachi"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full rounded-md bg-[#0d9488] px-4 py-2.5 text-sm font-medium text-white hover:bg-[#0f766e]"
                >
                  Continue to Dashboard
                </button>
              </div>
            </form>
          </div>

          {/* AI Suggestions */}
          <div className="space-y-4">
            <div className="rounded-lg border border-[#e5e7eb] bg-white p-6">
              <div className="mb-4 flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-[#0d9488]" />
                <h3 className="font-semibold text-[#111827]">AI Suggestions</h3>
              </div>
              <div className="space-y-4 text-sm">
                <div>
                  <p className="mb-2 text-[#6b7280]">Based on your interests, you could help with:</p>
                  <div className="flex flex-wrap gap-2">
                    <span className="rounded bg-[#f0fdfa] px-2 py-1 text-xs text-[#0d9488]">JavaScript</span>
                    <span className="rounded bg-[#f0fdfa] px-2 py-1 text-xs text-[#0d9488]">UI Design</span>
                    <span className="rounded bg-[#f0fdfa] px-2 py-1 text-xs text-[#0d9488]">React</span>
                  </div>
                </div>
                <div>
                  <p className="mb-2 text-[#6b7280]">You may need help with:</p>
                  <div className="flex flex-wrap gap-2">
                    <span className="rounded bg-[#fef3c7] px-2 py-1 text-xs text-[#92400e]">Python</span>
                    <span className="rounded bg-[#fef3c7] px-2 py-1 text-xs text-[#92400e]">Data Analysis</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-lg border border-[#e5e7eb] bg-[#f0fdfa] p-4 text-sm text-[#0d9488]">
              <p className="font-medium">Pro tip:</p>
              <p className="mt-1 text-xs text-[#115e59]">
                Adding more specific skills helps match you with the right requests and helpers.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
