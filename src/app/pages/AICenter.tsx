import { TrendingUp, Users, Sparkles, BarChart3 } from "lucide-react";

export function AICenter() {
  const trendingTopics = [
    { topic: 'Web Development', count: 23, trend: '+12%' },
    { topic: 'Design', count: 18, trend: '+8%' },
    { topic: 'Career', count: 15, trend: '+15%' },
    { topic: 'Programming', count: 12, trend: '+5%' },
  ];

  const categories = [
    { name: 'Web Development', helps: 45 },
    { name: 'Design', helps: 32 },
    { name: 'Career', helps: 28 },
    { name: 'Programming', helps: 24 },
    { name: 'Data & AI', helps: 18 },
  ];

  const maxHelps = Math.max(...categories.map(c => c.helps));

  const suggestedSkills = ['TypeScript', 'Figma', 'Python', 'Data Analysis', 'UI/UX'];

  return (
    <div className="min-h-screen p-8">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8 rounded-lg border border-[#e5e7eb] bg-[#1f2937] p-8 text-white">
          <div className="mb-2 text-sm uppercase tracking-wide text-[#9ca3af]">
            AI CENTER
          </div>
          <h1 className="mb-4 text-4xl font-bold">
            See what the platform<br />intelligence is noticing.
          </h1>
          <p className="text-[#d1d5db]">
            AI-like insights summarize demand trends, helper readiness, urgency signals, and request recommendations.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-3">
          <div className="rounded-md border border-[#e5e7eb] bg-white p-6">
            <div className="mb-2 flex items-center gap-2 text-sm uppercase tracking-wide text-[#6b7280]">
              <TrendingUp className="h-4 w-4" />
              TREND PULSE
            </div>
            <h3 className="mb-2 text-2xl font-bold text-[#111827]">Web Development</h3>
            <p className="text-sm text-[#6b7280]">
              Most common support area based on active community requests.
            </p>
          </div>

          <div className="rounded-md border border-[#e5e7eb] bg-white p-6">
            <div className="mb-2 flex items-center gap-2 text-sm uppercase tracking-wide text-[#6b7280]">
              <BarChart3 className="h-4 w-4" />
              URGENCY WATCH
            </div>
            <h3 className="mb-2 text-2xl font-bold text-[#111827]">2</h3>
            <p className="text-sm text-[#6b7280]">
              Requests currently flagged high priority by the urgency detector.
            </p>
          </div>

          <div className="rounded-md border border-[#e5e7eb] bg-white p-6">
            <div className="mb-2 flex items-center gap-2 text-sm uppercase tracking-wide text-[#6b7280]">
              <Users className="h-4 w-4" />
              MENTOR POOL
            </div>
            <h3 className="mb-2 text-2xl font-bold text-[#111827]">2</h3>
            <p className="text-sm text-[#6b7280]">
              Trusted helpers with strong response history and contribution signals.
            </p>
          </div>
        </div>

        {/* Trending Topics */}
        <div className="mb-8 rounded-md border border-[#e5e7eb] bg-white p-6">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-xl font-semibold text-[#111827]">Trending Topics This Week</h2>
            <Sparkles className="h-5 w-5 text-[#0d9488]" />
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
            {trendingTopics.map((topic) => (
              <div key={topic.topic} className="rounded-md border border-[#e5e7eb] p-4">
                <h3 className="mb-1 font-semibold text-[#111827]">{topic.topic}</h3>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-bold text-[#111827]">{topic.count}</span>
                  <span className="text-sm text-[#0d9488]">{topic.trend}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Most Helped Categories */}
        <div className="mb-8 rounded-md border border-[#e5e7eb] bg-white p-6">
          <h2 className="mb-6 text-xl font-semibold text-[#111827]">Most Helped Categories</h2>
          <div className="space-y-4">
            {categories.map((category) => (
              <div key={category.name}>
                <div className="mb-2 flex items-center justify-between text-sm">
                  <span className="font-medium text-[#111827]">{category.name}</span>
                  <span className="text-[#6b7280]">{category.helps} helps</span>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-[#f3f4f6]">
                  <div
                    className="h-full rounded-full bg-[#0d9488]"
                    style={{ width: `${(category.helps / maxHelps) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* AI Recommendations */}
        <div className="rounded-md border border-[#e5e7eb] bg-white">
          <div className="border-b border-[#e5e7eb] p-6">
            <div className="mb-2 flex items-center gap-2 text-sm uppercase tracking-wide text-[#6b7280]">
              <Sparkles className="h-4 w-4" />
              AI RECOMMENDATIONS
            </div>
            <h2 className="text-xl font-semibold text-[#111827]">Requests needing attention</h2>
          </div>
          <div className="divide-y divide-[#e5e7eb]">
            <div className="p-6">
              <h3 className="mb-2 font-semibold text-[#111827]">Need help</h3>
              <p className="mb-4 text-sm text-[#6b7280]">
                AI summary: Web Development request with high urgency. Best suited for members with relevant expertise.
              </p>
              <div className="flex gap-2">
                <span className="rounded bg-[#dcfce7] px-2 py-1 text-xs font-medium text-[#166534]">
                  Web Development
                </span>
                <span className="rounded bg-[#fee2e2] px-2 py-1 text-xs font-medium text-[#991b1b]">
                  High
                </span>
              </div>
            </div>

            <div className="p-6">
              <h3 className="mb-2 font-semibold text-[#111827]">Need help making my portfolio responsive before demo day</h3>
              <p className="mb-4 text-sm text-[#6b7280]">
                Responsive layout issue with a short deadline. Best helpers are frontend mentors comfortable with CSS grids and media queries.
              </p>
              <div className="flex gap-2">
                <span className="rounded bg-[#dcfce7] px-2 py-1 text-xs font-medium text-[#166534]">
                  Web Development
                </span>
                <span className="rounded bg-[#fee2e2] px-2 py-1 text-xs font-medium text-[#991b1b]">
                  High
                </span>
              </div>
            </div>

            <div className="p-6">
              <h3 className="mb-2 font-semibold text-[#111827]">Looking for Figma feedback on a volunteer event poster</h3>
              <p className="mb-4 text-sm text-[#6b7280]">
                A visual design critique request where feedback on hierarchy, spacing, and messaging would create the most value.
              </p>
              <div className="flex gap-2">
                <span className="rounded bg-[#dbeafe] px-2 py-1 text-xs font-medium text-[#1e40af]">
                  Design
                </span>
                <span className="rounded bg-[#fef3c7] px-2 py-1 text-xs font-medium text-[#92400e]">
                  Medium
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Suggested Skills */}
        <div className="mt-8 rounded-md border border-[#e5e7eb] bg-[#f0fdfa] p-6">
          <h3 className="mb-4 font-semibold text-[#111827]">Your suggested next skills to learn</h3>
          <div className="flex flex-wrap gap-2">
            {suggestedSkills.map((skill) => (
              <span
                key={skill}
                className="rounded bg-white px-3 py-2 text-sm font-medium text-[#0d9488]"
              >
                {skill}
              </span>
            ))}
          </div>
          <p className="mt-4 text-sm text-[#115e59]">
            Based on trending requests and your current expertise, these skills would increase your impact.
          </p>
        </div>
      </div>
    </div>
  );
}
