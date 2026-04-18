import { useNavigate } from "react-router";
import { storage } from "../utils/storage";
import { TrendingUp, Clock, Award, Plus, ArrowRight } from "lucide-react";

export function Dashboard() {
  const navigate = useNavigate();
  const currentUser = storage.getCurrentUser();
  const requests = storage.getRequests();
  const myRequests = requests.filter(r => r.authorId === currentUser?.id).slice(0, 3);

  return (
    <div className="min-h-screen p-8">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#111827]">Dashboard</h1>
          <p className="mt-1 text-[#6b7280]">
            Welcome back, {currentUser?.name}
          </p>
        </div>

        {/* Stats Row */}
        <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-3">
          <div className="rounded-md border border-[#e5e7eb] bg-white p-6">
            <div className="mb-2 flex items-center justify-between">
              <span className="text-sm text-[#6b7280]">Requests Made</span>
              <Clock className="h-5 w-5 text-[#6b7280]" />
            </div>
            <div className="text-3xl font-bold text-[#111827]">{currentUser?.helpReceived || 12}</div>
            <p className="mt-1 text-xs text-[#0d9488]">+3 this month</p>
          </div>

          <div className="rounded-md border border-[#e5e7eb] bg-white p-6">
            <div className="mb-2 flex items-center justify-between">
              <span className="text-sm text-[#6b7280]">Help Given</span>
              <TrendingUp className="h-5 w-5 text-[#6b7280]" />
            </div>
            <div className="text-3xl font-bold text-[#111827]">{currentUser?.helpGiven || 8}</div>
            <p className="mt-1 text-xs text-[#0d9488]">Top 20% of helpers</p>
          </div>

          <div className="rounded-md border border-[#e5e7eb] bg-white p-6">
            <div className="mb-2 flex items-center justify-between">
              <span className="text-sm text-[#6b7280]">Trust Score</span>
              <Award className="h-5 w-5 text-[#6b7280]" />
            </div>
            <div className="text-3xl font-bold text-[#111827]">{currentUser?.trustScore || 86}</div>
            <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-[#f3f4f6]">
              <div
                className="h-full rounded-full bg-[#0d9488]"
                style={{ width: `${currentUser?.trustScore || 86}%` }}
              />
            </div>
          </div>
        </div>

        {/* AI Insight */}
        <div className="mb-8 rounded-md border border-[#e5e7eb] bg-[#f0fdfa] p-6">
          <div className="flex items-start gap-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#0d9488] text-white">
              <TrendingUp className="h-5 w-5" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-[#111827]">AI Insight</h3>
              <p className="mt-1 text-sm text-[#115e59]">
                You're in the top 20% of helpers this week. Your expertise in {currentUser?.skills?.[0] || 'JavaScript'} is highly valued.
                Consider helping with {requests.filter(r => r.status === 'open').length} open requests.
              </p>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2">
          <button
            onClick={() => navigate('/app/create')}
            className="flex items-center justify-between rounded-md border border-[#e5e7eb] bg-white p-6 text-left transition-colors hover:bg-[#f9fafb]"
          >
            <div>
              <h3 className="font-semibold text-[#111827]">Create Request</h3>
              <p className="mt-1 text-sm text-[#6b7280]">Ask the community for help</p>
            </div>
            <Plus className="h-5 w-5 text-[#6b7280]" />
          </button>

          <button
            onClick={() => navigate('/app/explore')}
            className="flex items-center justify-between rounded-md border border-[#e5e7eb] bg-white p-6 text-left transition-colors hover:bg-[#f9fafb]"
          >
            <div>
              <h3 className="font-semibold text-[#111827]">Browse Requests</h3>
              <p className="mt-1 text-sm text-[#6b7280]">Help others in the community</p>
            </div>
            <ArrowRight className="h-5 w-5 text-[#6b7280]" />
          </button>
        </div>

        {/* Recent Requests */}
        <div className="rounded-md border border-[#e5e7eb] bg-white">
          <div className="border-b border-[#e5e7eb] p-6">
            <div className="flex items-center justify-between">
              <h2 className="font-semibold text-[#111827]">Recent Requests</h2>
              <button
                onClick={() => navigate('/app/explore')}
                className="text-sm text-[#0d9488] hover:text-[#0f766e]"
              >
                View all
              </button>
            </div>
          </div>

          {requests.length === 0 ? (
            <div className="p-12 text-center">
              <p className="text-[#6b7280]">No requests yet. Be the first to ask for help!</p>
              <button
                onClick={() => navigate('/app/create')}
                className="mt-4 rounded-md bg-[#0d9488] px-4 py-2 text-sm font-medium text-white hover:bg-[#0f766e]"
              >
                Create Request
              </button>
            </div>
          ) : (
            <div className="divide-y divide-[#e5e7eb]">
              {requests.slice(0, 5).map((request) => (
                <div
                  key={request.id}
                  className="cursor-pointer p-6 transition-colors hover:bg-[#f9fafb]"
                  onClick={() => navigate(`/app/request/${request.id}`)}
                >
                  <div className="mb-2 flex items-start justify-between">
                    <h3 className="font-medium text-[#111827]">{request.title}</h3>
                    <span
                      className={`rounded px-2 py-1 text-xs font-medium ${
                        request.urgency === 'high'
                          ? 'bg-[#fee2e2] text-[#991b1b]'
                          : request.urgency === 'medium'
                          ? 'bg-[#fef3c7] text-[#92400e]'
                          : 'bg-[#f3f4f6] text-[#6b7280]'
                      }`}
                    >
                      {request.urgency}
                    </span>
                  </div>
                  <p className="mb-3 text-sm text-[#6b7280] line-clamp-2">{request.description}</p>
                  <div className="flex items-center gap-4 text-xs text-[#6b7280]">
                    <span className="rounded bg-[#f0fdfa] px-2 py-1 text-[#0d9488]">
                      {request.category}
                    </span>
                    <span>{request.authorName}</span>
                    <span>{new Date(request.createdAt).toLocaleDateString()}</span>
                    <span
                      className={`ml-auto rounded px-2 py-1 ${
                        request.status === 'solved'
                          ? 'bg-[#d1fae5] text-[#065f46]'
                          : request.status === 'in-progress'
                          ? 'bg-[#fef3c7] text-[#92400e]'
                          : 'bg-[#f0fdfa] text-[#0d9488]'
                      }`}
                    >
                      {request.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
