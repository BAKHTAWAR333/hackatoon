import { useState } from "react";
import { useNavigate } from "react-router";
import { storage } from "../utils/storage";
import { Search, Filter } from "lucide-react";

export function Explore() {
  const navigate = useNavigate();
  const [requests, setRequests] = useState(storage.getRequests());
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [urgencyFilter, setUrgencyFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  const filteredRequests = requests.filter((request) => {
    const matchesSearch = request.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || request.category === categoryFilter;
    const matchesUrgency = urgencyFilter === 'all' || request.urgency === urgencyFilter;
    const matchesStatus = statusFilter === 'all' || request.status === statusFilter;

    return matchesSearch && matchesCategory && matchesUrgency && matchesStatus;
  });

  return (
    <div className="min-h-screen p-8">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#111827]">Explore Requests</h1>
          <p className="mt-1 text-[#6b7280]">
            Browse and help with community requests
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-4">
          {/* Filters Sidebar */}
          <div className="space-y-4">
            <div className="rounded-md border border-[#e5e7eb] bg-white p-4">
              <div className="mb-4 flex items-center gap-2">
                <Filter className="h-5 w-5 text-[#6b7280]" />
                <h3 className="font-semibold text-[#111827]">Filters</h3>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="mb-2 block text-sm font-medium text-[#111827]">
                    Category
                  </label>
                  <select
                    value={categoryFilter}
                    onChange={(e) => setCategoryFilter(e.target.value)}
                    className="w-full rounded-md border border-[#e5e7eb] px-3 py-2 text-sm text-[#111827] focus:border-[#0d9488] focus:outline-none focus:ring-1 focus:ring-[#0d9488]"
                  >
                    <option value="all">All Categories</option>
                    <option value="Web Development">Web Development</option>
                    <option value="Programming">Programming</option>
                    <option value="Design">Design</option>
                    <option value="Data & AI">Data & AI</option>
                    <option value="Career">Career</option>
                    <option value="General">General</option>
                  </select>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-[#111827]">
                    Urgency
                  </label>
                  <select
                    value={urgencyFilter}
                    onChange={(e) => setUrgencyFilter(e.target.value)}
                    className="w-full rounded-md border border-[#e5e7eb] px-3 py-2 text-sm text-[#111827] focus:border-[#0d9488] focus:outline-none focus:ring-1 focus:ring-[#0d9488]"
                  >
                    <option value="all">All Urgency Levels</option>
                    <option value="high">High</option>
                    <option value="medium">Medium</option>
                    <option value="low">Low</option>
                  </select>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-[#111827]">
                    Status
                  </label>
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="w-full rounded-md border border-[#e5e7eb] px-3 py-2 text-sm text-[#111827] focus:border-[#0d9488] focus:outline-none focus:ring-1 focus:ring-[#0d9488]"
                  >
                    <option value="all">All Status</option>
                    <option value="open">Open</option>
                    <option value="in-progress">In Progress</option>
                    <option value="solved">Solved</option>
                  </select>
                </div>

                <button
                  onClick={() => {
                    setCategoryFilter('all');
                    setUrgencyFilter('all');
                    setStatusFilter('all');
                    setSearchTerm('');
                  }}
                  className="w-full rounded-md border border-[#e5e7eb] px-4 py-2 text-sm font-medium text-[#6b7280] hover:bg-[#f9fafb]"
                >
                  Clear Filters
                </button>
              </div>
            </div>
          </div>

          {/* Request List */}
          <div className="lg:col-span-3">
            {/* Search Bar */}
            <div className="mb-6 flex items-center gap-2 rounded-md border border-[#e5e7eb] bg-white px-4 py-3">
              <Search className="h-5 w-5 text-[#6b7280]" />
              <input
                type="text"
                placeholder="Search requests..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="flex-1 text-sm text-[#111827] placeholder-[#6b7280] focus:outline-none"
              />
            </div>

            {/* Results */}
            <div className="mb-4 text-sm text-[#6b7280]">
              {filteredRequests.length} request{filteredRequests.length !== 1 ? 's' : ''} found
            </div>

            {filteredRequests.length === 0 ? (
              <div className="rounded-md border border-[#e5e7eb] bg-white p-12 text-center">
                <p className="text-[#6b7280]">No requests match your filters</p>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredRequests.map((request) => (
                  <div
                    key={request.id}
                    className="cursor-pointer rounded-md border border-[#e5e7eb] bg-white p-6 transition-all hover:border-[#0d9488] hover:shadow-sm"
                    onClick={() => navigate(`/app/request/${request.id}`)}
                  >
                    <div className="mb-3 flex items-start justify-between gap-4">
                      <h3 className="flex-1 font-semibold text-[#111827]">{request.title}</h3>
                      <div className="flex gap-2">
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
                        <span
                          className={`rounded px-2 py-1 text-xs font-medium ${
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

                    <p className="mb-4 text-sm text-[#6b7280] line-clamp-2">
                      {request.description}
                    </p>

                    <div className="mb-4 flex flex-wrap gap-2">
                      <span className="rounded bg-[#dcfce7] px-2 py-1 text-xs font-medium text-[#166534]">
                        {request.category}
                      </span>
                      {request.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="rounded bg-[#f0fdfa] px-2 py-1 text-xs text-[#0d9488]"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center justify-between text-xs text-[#6b7280]">
                      <span>{request.authorName}</span>
                      <span>{new Date(request.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
