export default async function Page({
    params,
  }: {
    params: Promise<{ season: string; competition: string; team: string }>
  }) {
    const season = (await params).season
    const competition = (await params).competition
    const team = (await params).team
    return (
        <div>
            <h2>{season} {competition} Event</h2>
            <p>Scouting Team {team}</p>
        </div>
    )
  }