import { Trophy, Award, Star } from "lucide-react";

interface LeaderboardEntry {
  rank: number;
  name: string;
  helpCount: number;
  trustScore: number;
  badge: string;
}

export function Leaderboard() {
  const leaderboard: LeaderboardEntry[] = [
    { rank: 1, name: 'Ayesha Khan', helpCount: 42, trustScore: 98, badge: 'Top Helper' },
    { rank: 2, name: 'John Doe', helpCount: 38, trustScore: 96, badge: 'Expert' },
    { rank: 3, name: 'Sara Noor', helpCount: 35, trustScore: 94, badge: 'Quick Responder' },
    { rank: 4, name: 'Rahul Sharma', helpCount: 28, trustScore: 90, badge: 'Trusted Helper' },
    { rank: 5, name: 'Ali Ahmed', helpCount: 24, trustScore: 88, badge: 'Rising Star' },
    { rank: 6, name: 'Fatima Ali', helpCount: 21, trustScore: 86, badge: 'Helpful' },
    { rank: 7, name: 'Omar Hassan', helpCount: 19, trustScore: 84, badge: 'Active' },
    { rank: 8, name: 'Zara Khan', helpCount: 17, trustScore: 82, badge: 'Contributor' },
  ];

  return (
    <div className="min-h-screen p-8">
      <div className="mx-auto max-w-5xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#111827]">Leaderboard</h1>
          <p className="mt-1 text-[#6b7280]">
            Top helpers in the community
          </p>
        </div>

        {/* Top 3 Highlight */}
        <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-3">
          {leaderboard.slice(0, 3).map((entry, index) => (
            <div
              key={entry.rank}
              className={`rounded-md border p-6 ${
                index === 0
                  ? 'border-[#fbbf24] bg-gradient-to-br from-[#fef3c7] to-white'
                  : index === 1
                  ? 'border-[#9ca3af] bg-gradient-to-br from-[#f3f4f6] to-white'
                  : 'border-[#d97706] bg-gradient-to-br from-[#fed7aa] to-white'
              }`}
            >
              <div className="mb-4 flex items-center justify-between">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-xl font-bold text-[#111827]">
                  {entry.rank}
                </div>
                <Trophy
                  className={`h-8 w-8 ${
                    index === 0
                      ? 'text-[#fbbf24]'
                      : index === 1
                      ? 'text-[#9ca3af]'
                      : 'text-[#d97706]'
                  }`}
                />
              </div>
              <h3 className="mb-2 text-lg font-semibold text-[#111827]">{entry.name}</h3>
              <div className="space-y-1 text-sm text-[#6b7280]">
                <p>{entry.helpCount} helps given</p>
                <p>Trust score: {entry.trustScore}</p>
                <span className="inline-block rounded bg-white px-2 py-1 text-xs font-medium text-[#0d9488]">
                  {entry.badge}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Full Leaderboard Table */}
        <div className="rounded-md border border-[#e5e7eb] bg-white">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#e5e7eb] bg-[#f9fafb]">
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wide text-[#6b7280]">
                    Rank
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wide text-[#6b7280]">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wide text-[#6b7280]">
                    Help Count
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wide text-[#6b7280]">
                    Trust Score
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wide text-[#6b7280]">
                    Badge
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#e5e7eb]">
                {leaderboard.map((entry) => (
                  <tr
                    key={entry.rank}
                    className={`transition-colors hover:bg-[#f9fafb] ${
                      entry.rank <= 3 ? 'bg-[#f0fdfa]' : ''
                    }`}
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-[#111827]">
                          {entry.rank}
                        </span>
                        {entry.rank <= 3 && (
                          <Trophy
                            className={`h-4 w-4 ${
                              entry.rank === 1
                                ? 'text-[#fbbf24]'
                                : entry.rank === 2
                                ? 'text-[#9ca3af]'
                                : 'text-[#d97706]'
                            }`}
                          />
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#f0fdfa] text-sm font-medium text-[#0d9488]">
                          {entry.name[0]}
                        </div>
                        <span className="text-sm font-medium text-[#111827]">
                          {entry.name}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-[#111827]">{entry.helpCount}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className="h-2 w-24 overflow-hidden rounded-full bg-[#f3f4f6]">
                          <div
                            className="h-full rounded-full bg-[#0d9488]"
                            style={{ width: `${entry.trustScore}%` }}
                          />
                        </div>
                        <span className="text-sm text-[#111827]">{entry.trustScore}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center gap-1 rounded bg-[#f0fdfa] px-2 py-1 text-xs font-medium text-[#0d9488]">
                        <Award className="h-3 w-3" />
                        {entry.badge}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
