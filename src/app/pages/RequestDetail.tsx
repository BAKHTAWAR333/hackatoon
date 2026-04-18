import { useParams, useNavigate } from "react-router";
import { storage } from "../utils/storage";
import { ArrowLeft, CheckCircle, Users, Sparkles } from "lucide-react";
import { useState } from "react";

export function RequestDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const currentUser = storage.getCurrentUser();
  const request = storage.getRequests().find((r) => r.id === id);

  const [localRequest, setLocalRequest] = useState(request);

  if (!localRequest) {
    return (
      <div className="flex min-h-screen items-center justify-center p-8">
        <div className="text-center">
          <p className="text-[#6b7280]">Request not found</p>
          <button
            onClick={() => navigate('/app/explore')}
            className="mt-4 rounded-md bg-[#0d9488] px-4 py-2 text-sm font-medium text-white hover:bg-[#0f766e]"
          >
            Back to Explore
          </button>
        </div>
      </div>
    );
  }

  const isHelper = localRequest.helpers.includes(currentUser?.id || '');
  const isAuthor = localRequest.authorId === currentUser?.id;

  const handleHelp = () => {
    if (!currentUser) return;

    const updatedHelpers = isHelper
      ? localRequest.helpers.filter((h) => h !== currentUser.id)
      : [...localRequest.helpers, currentUser.id];

    const updatedRequest = {
      ...localRequest,
      helpers: updatedHelpers,
      status: updatedHelpers.length > 0 ? 'in-progress' as const : 'open' as const,
    };

    storage.updateRequest(localRequest.id, updatedRequest);
    setLocalRequest(updatedRequest);

    storage.addNotification({
      id: Date.now().toString(),
      userId: localRequest.authorId,
      type: 'helper_joined',
      message: `${currentUser.name} ${isHelper ? 'left' : 'offered to help with'} your request`,
      read: false,
      timestamp: new Date().toISOString(),
      link: `/app/request/${localRequest.id}`,
    });
  };

  const handleMarkSolved = () => {
    const updatedRequest = {
      ...localRequest,
      status: 'solved' as const,
    };

    storage.updateRequest(localRequest.id, updatedRequest);
    setLocalRequest(updatedRequest);

    storage.addNotification({
      id: Date.now().toString(),
      userId: currentUser?.id || '',
      type: 'request_solved',
      message: 'Your request has been marked as solved',
      read: false,
      timestamp: new Date().toISOString(),
    });
  };

  return (
    <div className="min-h-screen p-8">
      <div className="mx-auto max-w-5xl">
        {/* Back Button */}
        <button
          onClick={() => navigate('/app/explore')}
          className="mb-6 flex items-center gap-2 text-sm text-[#6b7280] hover:text-[#111827]"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Explore
        </button>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="rounded-md border border-[#e5e7eb] bg-white p-8">
              {/* Header */}
              <div className="mb-6">
                <div className="mb-3 flex flex-wrap gap-2">
                  <span className="rounded bg-[#dcfce7] px-2 py-1 text-xs font-medium text-[#166534]">
                    {localRequest.category}
                  </span>
                  <span
                    className={`rounded px-2 py-1 text-xs font-medium ${
                      localRequest.urgency === 'high'
                        ? 'bg-[#fee2e2] text-[#991b1b]'
                        : localRequest.urgency === 'medium'
                        ? 'bg-[#fef3c7] text-[#92400e]'
                        : 'bg-[#f3f4f6] text-[#6b7280]'
                    }`}
                  >
                    {localRequest.urgency}
                  </span>
                  <span
                    className={`rounded px-2 py-1 text-xs font-medium ${
                      localRequest.status === 'solved'
                        ? 'bg-[#d1fae5] text-[#065f46]'
                        : localRequest.status === 'in-progress'
                        ? 'bg-[#fef3c7] text-[#92400e]'
                        : 'bg-[#f0fdfa] text-[#0d9488]'
                    }`}
                  >
                    {localRequest.status}
                  </span>
                </div>
                <h1 className="text-2xl font-bold text-[#111827]">{localRequest.title}</h1>
              </div>

              {/* Description */}
              <div className="mb-6">
                <h2 className="mb-2 text-sm font-medium text-[#111827]">Description</h2>
                <p className="text-[#6b7280] whitespace-pre-wrap">{localRequest.description}</p>
              </div>

              {/* Tags */}
              {localRequest.tags.length > 0 && (
                <div className="mb-6">
                  <h2 className="mb-2 text-sm font-medium text-[#111827]">Tags</h2>
                  <div className="flex flex-wrap gap-2">
                    {localRequest.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="rounded bg-[#f0fdfa] px-2 py-1 text-xs text-[#0d9488]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Metadata */}
              <div className="border-t border-[#e5e7eb] pt-4 text-sm text-[#6b7280]">
                <p>Posted by <span className="font-medium text-[#111827]">{localRequest.authorName}</span></p>
                <p>Posted on {new Date(localRequest.createdAt).toLocaleDateString()}</p>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            {/* AI Summary */}
            {localRequest.aiSummary && (
              <div className="rounded-md border border-[#e5e7eb] bg-white p-6">
                <div className="mb-3 flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-[#0d9488]" />
                  <h3 className="font-semibold text-[#111827]">AI Summary</h3>
                </div>
                <p className="text-sm text-[#6b7280]">{localRequest.aiSummary}</p>
              </div>
            )}

            {/* Helpers */}
            <div className="rounded-md border border-[#e5e7eb] bg-white p-6">
              <div className="mb-3 flex items-center gap-2">
                <Users className="h-5 w-5 text-[#6b7280]" />
                <h3 className="font-semibold text-[#111827]">Helpers</h3>
              </div>
              {localRequest.helpers.length === 0 ? (
                <p className="text-sm text-[#6b7280]">No helpers yet</p>
              ) : (
                <div className="space-y-2">
                  {localRequest.helpers.map((helperId) => (
                    <div key={helperId} className="flex items-center gap-2">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#f0fdfa] text-xs font-medium text-[#0d9488]">
                        {helperId[0].toUpperCase()}
                      </div>
                      <span className="text-sm text-[#111827]">{helperId}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="space-y-2">
              {!isAuthor && localRequest.status !== 'solved' && (
                <button
                  onClick={handleHelp}
                  className={`w-full rounded-md px-4 py-2.5 text-sm font-medium transition-colors ${
                    isHelper
                      ? 'border border-[#e5e7eb] text-[#6b7280] hover:bg-[#f9fafb]'
                      : 'bg-[#0d9488] text-white hover:bg-[#0f766e]'
                  }`}
                >
                  {isHelper ? 'Remove Help Offer' : 'I can help'}
                </button>
              )}

              {isAuthor && localRequest.status !== 'solved' && (
                <button
                  onClick={handleMarkSolved}
                  className="w-full flex items-center justify-center gap-2 rounded-md border border-[#e5e7eb] px-4 py-2.5 text-sm font-medium text-[#111827] hover:bg-[#f9fafb]"
                >
                  <CheckCircle className="h-4 w-4" />
                  Mark as solved
                </button>
              )}

              {localRequest.status === 'solved' && (
                <div className="rounded-md bg-[#d1fae5] p-4 text-center text-sm font-medium text-[#065f46]">
                  This request has been solved
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
