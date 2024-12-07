export default async function SeasonPage({
    params,
  }: {
    params: Promise<{ season: string }>
  }) {
    const season = (await params).season

    
    return (
        <div>
            <h2>{season} Events</h2>
            <p></p>
        </div>
    )
  }