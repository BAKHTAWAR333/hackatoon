import { useNavigate } from "react-router";
import { ArrowRight, Users, FileText, CheckCircle } from "lucide-react";

export function Landing() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#f9fafb]">
      {/* Header */}
      <header className="border-b border-[#e5e7eb] bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#0d9488] text-white">
              <span className="font-semibold">H</span>
            </div>
            <span className="text-lg font-semibold text-[#111827]">HelpHub AI</span>
          </div>
          <nav className="flex items-center gap-8">
            <a href="#" className="text-sm text-[#6b7280] hover:text-[#111827]">Home</a>
            <a href="#explore" className="text-sm text-[#6b7280] hover:text-[#111827]">Explore</a>
            <a href="#leaderboard" className="text-sm text-[#6b7280] hover:text-[#111827]">Leaderboard</a>
            <a href="#ai-center" className="text-sm text-[#6b7280] hover:text-[#111827]">AI Center</a>
            <span className="text-sm text-[#6b7280]">Live community signals</span>
            <button
              onClick={() => navigate('/auth')}
              className="rounded-md bg-[#0d9488] px-4 py-2 text-sm font-medium text-white hover:bg-[#0f766e]"
            >
              Join the platform
            </button>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="mx-auto max-w-7xl px-6 py-24">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          <div>
            <div className="mb-4 text-sm uppercase tracking-wide text-[#6b7280]">
              SMIT GRAND CODING NIGHT 2026
            </div>
            <h1 className="mb-6 text-5xl font-bold leading-tight text-[#111827]">
              Find help faster.<br />
              Become help that<br />
              matters.
            </h1>
            <p className="mb-8 text-lg text-[#6b7280] leading-relaxed">
              HelpHub AI is a community support network for students, mentors,
              creators, and builders. Ask for help, offer help, track impact, and let AI
              make smarter matches across the platform.
            </p>
            <div className="flex gap-4">
              <button
                onClick={() => navigate('/auth')}
                className="flex items-center gap-2 rounded-md bg-[#0d9488] px-6 py-3 text-sm font-medium text-white hover:bg-[#0f766e]"
              >
                Open product demo
              </button>
              <button
                onClick={() => navigate('/app/create')}
                className="rounded-md border border-[#e5e7eb] bg-white px-6 py-3 text-sm font-medium text-[#111827] hover:bg-[#f9fafb]"
              >
                Post a request
              </button>
            </div>

            {/* Stats */}
            <div className="mt-12 grid grid-cols-3 gap-8">
              <div>
                <div className="mb-1 text-3xl font-bold text-[#111827]">384+</div>
                <div className="text-sm text-[#6b7280]">
                  Students, mentors,<br />and helpers in the<br />loop.
                </div>
              </div>
              <div>
                <div className="mb-1 text-3xl font-bold text-[#111827]">72+</div>
                <div className="text-sm text-[#6b7280]">
                  Support posts<br />shared across<br />learning journeys.
                </div>
              </div>
              <div>
                <div className="mb-1 text-3xl font-bold text-[#111827]">69+</div>
                <div className="text-sm text-[#6b7280]">
                  Problems resolved<br />through fast<br />community action.
                </div>
              </div>
            </div>
          </div>

          {/* Right Card */}
          <div className="rounded-lg border border-[#e5e7eb] bg-[#1f2937] p-8 text-white">
            <div className="mb-6 text-sm uppercase tracking-wide text-[#9ca3af]">
              LIVE PRODUCT FEEL
            </div>
            <h2 className="mb-4 text-3xl font-bold">
              More than a form.<br />
              More like an<br />
              ecosystem.
            </h2>
            <p className="mb-8 text-[#d1d5db]">
              A polished multi-page experience inspired by product platforms, with AI summaries, trust scores,
              contribution signals, notifications, and leaderboard momentum built directly in HTML, CSS, JavaScript, and LocalStorage.
            </p>

            <div className="space-y-4">
              <div className="rounded-md bg-[#374151] p-4">
                <h3 className="mb-2 font-semibold">AI request intelligence</h3>
                <p className="text-sm text-[#d1d5db]">
                  Auto-categorization, urgency detection, tags, rewrite suggestions, and trend snapshots.
                </p>
              </div>
              <div className="rounded-md bg-[#374151] p-4">
                <h3 className="mb-2 font-semibold">Community trust graph</h3>
                <p className="text-sm text-[#d1d5db]">
                  Badges, helper rankings, trust score boosts, and visible contribution history.
                </p>
              </div>
              <div className="rounded-md bg-[#374151] p-4">
                <h3 className="mb-2 font-semibold">100%</h3>
                <p className="text-sm text-[#d1d5db]">
                  Top trust score currently active across the sample mentor network.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Flow Section */}
      <section className="border-t border-[#e5e7eb] bg-white py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-12">
            <div className="mb-4 text-sm uppercase tracking-wide text-[#6b7280]">CORE FLOW</div>
            <h2 className="text-4xl font-bold text-[#111827]">From struggling alone to solving together</h2>
          </div>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <div className="rounded-md border border-[#e5e7eb] bg-white p-6">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-md bg-[#f0fdfa] text-[#0d9488]">
                <FileText className="h-6 w-6" />
              </div>
              <h3 className="mb-2 font-semibold text-[#111827]">Ask for help clearly</h3>
              <p className="text-sm text-[#6b7280]">
                Create structured requests with category, urgency. AI suggestions, and tags that
                attract the right people.
              </p>
            </div>
            <div className="rounded-md border border-[#e5e7eb] bg-white p-6">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-md bg-[#f0fdfa] text-[#0d9488]">
                <Users className="h-6 w-6" />
              </div>
              <h3 className="mb-2 font-semibold text-[#111827]">Discover the right people</h3>
              <p className="text-sm text-[#6b7280]">
                Use the explore feed, helper lists, notifications, and messaging to move
                quickly once a match happens.
              </p>
            </div>
            <div className="rounded-md border border-[#e5e7eb] bg-white p-6">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-md bg-[#f0fdfa] text-[#0d9488]">
                <CheckCircle className="h-6 w-6" />
              </div>
              <h3 className="mb-2 font-semibold text-[#111827]">Track real contribution</h3>
              <p className="text-sm text-[#6b7280]">
                Trust scores, badges, solved requests, and rankings help the community recognize
                meaningful support.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Requests */}
      <section className="border-t border-[#e5e7eb] bg-[#f9fafb] py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-8 flex items-end justify-between">
            <div>
              <div className="mb-2 text-sm uppercase tracking-wide text-[#6b7280]">FEATURED REQUESTS</div>
              <h2 className="text-4xl font-bold text-[#111827]">Community problems currently in motion</h2>
            </div>
            <button
              onClick={() => navigate('/app/explore')}
              className="text-sm font-medium text-[#0d9488] hover:text-[#0f766e]"
            >
              View full feed
            </button>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <div className="rounded-md border border-[#e5e7eb] bg-white p-6">
              <div className="mb-3 flex items-center gap-2">
                <span className="rounded bg-[#dcfce7] px-2 py-1 text-xs font-medium text-[#166534]">Web Development</span>
                <span className="rounded bg-[#fee2e2] px-2 py-1 text-xs font-medium text-[#991b1b]">High</span>
                <span className="rounded bg-[#d1fae5] px-2 py-1 text-xs font-medium text-[#065f46]">Solved</span>
              </div>
              <h3 className="mb-2 font-semibold text-[#111827]">Need help</h3>
              <p className="mb-4 text-sm text-[#6b7280]">Help needed</p>
              <div className="flex items-center justify-between text-xs text-[#6b7280]">
                <span>Ayesha Khan<br />Karachi • 1 helper<br />interested</span>
                <button className="rounded border border-[#e5e7eb] px-3 py-1.5 text-[#111827] hover:bg-[#f9fafb]">
                  Open details
                </button>
              </div>
            </div>

            <div className="rounded-md border border-[#e5e7eb] bg-white p-6">
              <div className="mb-3 flex items-center gap-2">
                <span className="rounded bg-[#dcfce7] px-2 py-1 text-xs font-medium text-[#166534]">Web Development</span>
                <span className="rounded bg-[#fee2e2] px-2 py-1 text-xs font-medium text-[#991b1b]">High</span>
                <span className="rounded bg-[#d1fae5] px-2 py-1 text-xs font-medium text-[#065f46]">Solved</span>
              </div>
              <h3 className="mb-2 font-semibold text-[#111827]">Need help making my portfolio responsive before demo day</h3>
              <p className="mb-4 text-sm text-[#6b7280]">
                My HTML/CSS portfolio breaks on tablets and I need layout guidance before tomorrow evening.
              </p>
              <div className="flex flex-wrap gap-1 mb-4">
                <span className="rounded bg-[#f0fdfa] px-2 py-1 text-xs text-[#0d9488]">HTML/CSS</span>
                <span className="rounded bg-[#f0fdfa] px-2 py-1 text-xs text-[#0d9488]">Responsive</span>
                <span className="rounded bg-[#f0fdfa] px-2 py-1 text-xs text-[#0d9488]">Portfolio</span>
              </div>
              <div className="flex items-center justify-between text-xs text-[#6b7280]">
                <span>Sara Noor<br />Karachi • 1 helper<br />interested</span>
                <button
                  onClick={() => navigate('/app/request/1')}
                  className="rounded border border-[#e5e7eb] px-3 py-1.5 text-[#111827] hover:bg-[#f9fafb]"
                >
                  Open details
                </button>
              </div>
            </div>

            <div className="rounded-md border border-[#e5e7eb] bg-white p-6">
              <div className="mb-3 flex items-center gap-2">
                <span className="rounded bg-[#dbeafe] px-2 py-1 text-xs font-medium text-[#1e40af]">Design</span>
                <span className="rounded bg-[#fef3c7] px-2 py-1 text-xs font-medium text-[#92400e]">Medium</span>
                <span className="rounded bg-[#f0fdfa] px-2 py-1 text-xs font-medium text-[#0d9488]">Open</span>
              </div>
              <h3 className="mb-2 font-semibold text-[#111827]">Looking for Figma feedback on a volunteer event poster</h3>
              <p className="mb-4 text-sm text-[#6b7280]">
                I have a draft poster for a campus community event and want sharper hierarchy, spacing, and CTA copy.
              </p>
              <div className="flex flex-wrap gap-1 mb-4">
                <span className="rounded bg-[#f0fdfa] px-2 py-1 text-xs text-[#0d9488]">Figma</span>
                <span className="rounded bg-[#f0fdfa] px-2 py-1 text-xs text-[#0d9488]">Poster</span>
                <span className="rounded bg-[#f0fdfa] px-2 py-1 text-xs text-[#0d9488]">Design Review</span>
              </div>
              <div className="flex items-center justify-between text-xs text-[#6b7280]">
                <span>Ayesha Khan<br />Lahore • 1 helper<br />interested</span>
                <button
                  onClick={() => navigate('/app/request/2')}
                  className="rounded border border-[#e5e7eb] px-3 py-1.5 text-[#111827] hover:bg-[#f9fafb]"
                >
                  Open details
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#e5e7eb] bg-white py-12">
        <div className="mx-auto max-w-7xl px-6">
          <p className="text-center text-sm text-[#6b7280]">
            HelpHub AI is built as a premium-feel, multi-page community support product using HTML, CSS, JavaScript, and LocalStorage.
          </p>
        </div>
      </footer>
    </div>
  );
}
