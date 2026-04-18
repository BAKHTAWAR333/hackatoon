import { storage } from "../utils/storage";
import { MapPin, Award, TrendingUp, CheckCircle } from "lucide-react";

export function Profile() {
  const currentUser = storage.getCurrentUser();
  const requests = storage.getRequests();
  const myRequests = requests.filter(r => r.authorId === currentUser?.id);
  const helpedRequests = requests.filter(r => r.helpers.includes(currentUser?.id || ''));

  if (!currentUser) {
    return (
      <div className="flex min-h-screen items-center justify-center p-8">
        <p className="text-[#6b7280]">Please log in to view your profile</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-8">
      <div className="mx-auto max-w-5xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#111827]">Profile</h1>
          <p className="mt-1 text-[#6b7280]">
            Your community profile and contributions
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Profile Info */}
          <div className="space-y-6">
            <div className="rounded-md border border-[#e5e7eb] bg-white p-6">
              <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-[#f0fdfa] text-2xl font-semibold text-[#0d9488]">
                {currentUser.name[0]}
              </div>
              <h2 className="mb-1 text-xl font-semibold text-[#111827]">
                {currentUser.name}
              </h2>
              <p className="mb-4 text-sm text-[#6b7280]">{currentUser.email}</p>
              <div className="flex items-center gap-2 text-sm text-[#6b7280]">
                <MapPin className="h-4 w-4" />
                {currentUser.location}
              </div>
            </div>

            {/* Trust Score */}
            <div className="rounded-md border border-[#e5e7eb] bg-white p-6">
              <div className="mb-4 flex items-center gap-2">
                <Award className="h-5 w-5 text-[#0d9488]" />
                <h3 className="font-semibold text-[#111827]">Trust Score</h3>
              </div>
              <div className="mb-2 text-3xl font-bold text-[#111827]">
                {currentUser.trustScore}
              </div>
              <div className="mb-4 h-2 w-full overflow-hidden rounded-full bg-[#f3f4f6]">
                <div
                  className="h-full rounded-full bg-[#0d9488]"
                  style={{ width: `${currentUser.trustScore}%` }}
                />
              </div>
              <p className="text-xs text-[#6b7280]">
                You're in the top 20% of helpers
              </p>
            </div>

            {/* Stats */}
            <div className="rounded-md border border-[#e5e7eb] bg-white p-6">
              <h3 className="mb-4 font-semibold text-[#111827]">Statistics</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-[#6b7280]">Help Given</span>
                  <span className="font-semibold text-[#111827]">{currentUser.helpGiven}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-[#6b7280]">Help Received</span>
                  <span className="font-semibold text-[#111827]">{currentUser.helpReceived}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-[#6b7280]">Requests Created</span>
                  <span className="font-semibold text-[#111827]">{myRequests.length}</span>
                </div>
              </div>
            </div>

            {/* Badges */}
            <div className="rounded-md border border-[#e5e7eb] bg-white p-6">
              <div className="mb-4 flex items-center gap-2">
                <Award className="h-5 w-5 text-[#0d9488]" />
                <h3 className="font-semibold text-[#111827]">Badges Earned</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {currentUser.badges.map((badge, index) => (
                  <span
                    key={index}
                    className="rounded bg-[#f0fdfa] px-3 py-2 text-xs font-medium text-[#0d9488]"
                  >
                    {badge}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Skills */}
            <div className="rounded-md border border-[#e5e7eb] bg-white p-6">
              <h3 className="mb-4 font-semibold text-[#111827]">Skills</h3>
              <div className="flex flex-wrap gap-2">
                {currentUser.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="rounded border border-[#e5e7eb] bg-[#f9fafb] px-3 py-2 text-sm text-[#111827]"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Interests */}
            <div className="rounded-md border border-[#e5e7eb] bg-white p-6">
              <h3 className="mb-4 font-semibold text-[#111827]">Interests</h3>
              <div className="flex flex-wrap gap-2">
                {currentUser.interests.map((interest, index) => (
                  <span
                    key={index}
                    className="rounded bg-[#f0fdfa] px-3 py-2 text-sm text-[#0d9488]"
                  >
                    {interest}
                  </span>
                ))}
              </div>
            </div>

            {/* Contribution History */}
            <div className="rounded-md border border-[#e5e7eb] bg-white">
              <div className="border-b border-[#e5e7eb] p-6">
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-[#6b7280]" />
                  <h3 className="font-semibold text-[#111827]">Contribution History</h3>
                </div>
              </div>

              {helpedRequests.length === 0 ? (
                <div className="p-12 text-center">
                  <p className="text-[#6b7280]">No contributions yet</p>
                </div>
              ) : (
                <div className="divide-y divide-[#e5e7eb]">
                  {helpedRequests.map((request) => (
                    <div key={request.id} className="p-6">
                      <div className="mb-2 flex items-start justify-between">
                        <h4 className="font-medium text-[#111827]">{request.title}</h4>
                        {request.status === 'solved' && (
                          <CheckCircle className="h-5 w-5 text-[#0d9488]" />
                        )}
                      </div>
                      <p className="mb-3 text-sm text-[#6b7280] line-clamp-2">
                        {request.description}
                      </p>
                      <div className="flex items-center gap-4 text-xs text-[#6b7280]">
                        <span className="rounded bg-[#f0fdfa] px-2 py-1 text-[#0d9488]">
                          {request.category}
                        </span>
                        <span>{new Date(request.createdAt).toLocaleDateString()}</span>
                        <span
                          className={`rounded px-2 py-1 ${
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
      </div>
    </div>
  );
}
