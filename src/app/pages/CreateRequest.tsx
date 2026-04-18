import { useState } from "react";
import { useNavigate } from "react-router";
import { storage, detectCategory, detectUrgency, suggestTags } from "../utils/storage";
import { Sparkles } from "lucide-react";

export function CreateRequest() {
  const navigate = useNavigate();
  const currentUser = storage.getCurrentUser();

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    urgency: 'medium' as 'low' | 'medium' | 'high',
    tags: '',
  });

  const [aiSuggestions, setAiSuggestions] = useState({
    category: '',
    tags: [] as string[],
    urgency: 'medium' as 'low' | 'medium' | 'high',
  });

  const handleTitleChange = (title: string) => {
    setFormData({ ...formData, title });
    if (title.length > 5) {
      const category = detectCategory(title, formData.description);
      const urgency = detectUrgency(title, formData.description);
      const tags = suggestTags(title, formData.description);
      setAiSuggestions({ category, urgency, tags });
    }
  };

  const handleDescriptionChange = (description: string) => {
    setFormData({ ...formData, description });
    if (formData.title.length > 5 && description.length > 10) {
      const category = detectCategory(formData.title, description);
      const urgency = detectUrgency(formData.title, description);
      const tags = suggestTags(formData.title, description);
      setAiSuggestions({ category, urgency, tags });
    }
  };

  const applySuggestion = (field: string, value: any) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) {
      navigate('/auth');
      return;
    }

    const newRequest = {
      id: Date.now().toString(),
      title: formData.title,
      description: formData.description,
      category: formData.category || aiSuggestions.category || 'General',
      urgency: formData.urgency,
      tags: formData.tags.split(',').map(t => t.trim()).filter(Boolean),
      authorId: currentUser.id,
      authorName: currentUser.name,
      status: 'open' as const,
      helpers: [],
      createdAt: new Date().toISOString(),
      aiSummary: `${formData.category || aiSuggestions.category} request with ${formData.urgency} urgency. Best suited for members with relevant expertise.`,
    };

    storage.addRequest(newRequest);

    storage.addNotification({
      id: Date.now().toString(),
      userId: currentUser.id,
      type: 'request_created',
      message: 'Your request has been created successfully',
      read: false,
      timestamp: new Date().toISOString(),
      link: `/app/request/${newRequest.id}`,
    });

    navigate(`/app/request/${newRequest.id}`);
  };

  return (
    <div className="min-h-screen p-8">
      <div className="mx-auto max-w-5xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#111827]">Create Request</h1>
          <p className="mt-1 text-[#6b7280]">
            Ask the community for help
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Main Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="rounded-md border border-[#e5e7eb] bg-white p-6">
              <div className="space-y-6">
                <div>
                  <label className="mb-2 block text-sm font-medium text-[#111827]">
                    Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => handleTitleChange(e.target.value)}
                    className="w-full rounded-md border border-[#e5e7eb] px-3 py-2 text-sm text-[#111827] focus:border-[#0d9488] focus:outline-none focus:ring-1 focus:ring-[#0d9488]"
                    placeholder="e.g., Need help making my portfolio responsive"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-[#111827]">
                    Description *
                  </label>
                  <textarea
                    required
                    rows={6}
                    value={formData.description}
                    onChange={(e) => handleDescriptionChange(e.target.value)}
                    className="w-full rounded-md border border-[#e5e7eb] px-3 py-2 text-sm text-[#111827] focus:border-[#0d9488] focus:outline-none focus:ring-1 focus:ring-[#0d9488]"
                    placeholder="Provide details about what you need help with..."
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-[#111827]">
                    Category
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full rounded-md border border-[#e5e7eb] px-3 py-2 text-sm text-[#111827] focus:border-[#0d9488] focus:outline-none focus:ring-1 focus:ring-[#0d9488]"
                  >
                    <option value="">Select category</option>
                    <option value="Web Development">Web Development</option>
                    <option value="Programming">Programming</option>
                    <option value="Design">Design</option>
                    <option value="Data & AI">Data & AI</option>
                    <option value="Career">Career</option>
                    <option value="General">General</option>
                  </select>
                  {aiSuggestions.category && !formData.category && (
                    <p className="mt-1 text-xs text-[#6b7280]">
                      AI suggests: {aiSuggestions.category}
                    </p>
                  )}
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-[#111827]">
                    Urgency *
                  </label>
                  <div className="flex gap-4">
                    {(['low', 'medium', 'high'] as const).map((level) => (
                      <label key={level} className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="urgency"
                          value={level}
                          checked={formData.urgency === level}
                          onChange={(e) => setFormData({ ...formData, urgency: e.target.value as any })}
                          className="h-4 w-4 border-[#e5e7eb] text-[#0d9488] focus:ring-[#0d9488]"
                        />
                        <span className="text-sm capitalize text-[#111827]">{level}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-[#111827]">
                    Tags (comma-separated)
                  </label>
                  <input
                    type="text"
                    value={formData.tags}
                    onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                    className="w-full rounded-md border border-[#e5e7eb] px-3 py-2 text-sm text-[#111827] focus:border-[#0d9488] focus:outline-none focus:ring-1 focus:ring-[#0d9488]"
                    placeholder="e.g., React, CSS, Responsive Design"
                  />
                </div>

                <div className="flex gap-4">
                  <button
                    type="submit"
                    className="flex-1 rounded-md bg-[#0d9488] px-4 py-2.5 text-sm font-medium text-white hover:bg-[#0f766e]"
                  >
                    Create Request
                  </button>
                  <button
                    type="button"
                    onClick={() => navigate('/app')}
                    className="rounded-md border border-[#e5e7eb] px-4 py-2.5 text-sm font-medium text-[#6b7280] hover:bg-[#f9fafb]"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </form>
          </div>

          {/* AI Panel */}
          <div className="space-y-4">
            <div className="rounded-md border border-[#e5e7eb] bg-white p-6">
              <div className="mb-4 flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-[#0d9488]" />
                <h3 className="font-semibold text-[#111827]">AI Suggestions</h3>
              </div>

              <div className="space-y-4">
                {aiSuggestions.category && (
                  <div>
                    <p className="mb-2 text-sm text-[#6b7280]">Suggested category:</p>
                    <button
                      type="button"
                      onClick={() => applySuggestion('category', aiSuggestions.category)}
                      className="w-full rounded bg-[#f0fdfa] px-3 py-2 text-left text-sm text-[#0d9488] hover:bg-[#ccfbf1]"
                    >
                      {aiSuggestions.category}
                    </button>
                  </div>
                )}

                {aiSuggestions.tags.length > 0 && (
                  <div>
                    <p className="mb-2 text-sm text-[#6b7280]">Suggested tags:</p>
                    <button
                      type="button"
                      onClick={() => applySuggestion('tags', aiSuggestions.tags.join(', '))}
                      className="w-full rounded bg-[#f0fdfa] px-3 py-2 text-left text-sm text-[#0d9488] hover:bg-[#ccfbf1]"
                    >
                      {aiSuggestions.tags.join(', ')}
                    </button>
                  </div>
                )}

                {formData.title && formData.description && (
                  <div className="rounded bg-[#f0fdfa] p-3 text-xs text-[#115e59]">
                    <p className="font-medium">Pro tip:</p>
                    <p className="mt-1">
                      Detected urgency: {aiSuggestions.urgency}. Add specific deadlines in your description for faster matches.
                    </p>
                  </div>
                )}
              </div>
            </div>

            <div className="rounded-md border border-[#e5e7eb] bg-[#fef3c7] p-4 text-sm">
              <p className="font-medium text-[#92400e]">Writing tips:</p>
              <ul className="mt-2 space-y-1 text-xs text-[#92400e]">
                <li>• Be specific about what you need</li>
                <li>• Include relevant technologies</li>
                <li>• Mention your deadline if urgent</li>
                <li>• Add context about your skill level</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
