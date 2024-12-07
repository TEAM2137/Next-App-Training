
import {
  getDataTBA,
  checkDataDir,
  checkDataFile,
  storeDataFile,
  dataCheckGetStore,
  getSeasonDistricts,
  getSeasonEvents,
  getSeasonTeams
} from '@/lib/storeDataTBA'


export default async function SeasonPage({
    params,
  }: {
    params: Promise<{ season: string }>
  }) {
    const season = (await params).season;

    const setupDistricts = await getSeasonDistricts(season);
    const setupEvents = await getSeasonEvents(season);
    const setupTeams = await getSeasonTeams(season);


    return (
      <div className="flex-col w-full gap-4 justify-between py-4">
        <div className="bg-white rounded-2xl p-4 my-2 flex-1 min-w-[130px] shadow-md">
          <h2>{season} DATA SETUP</h2>
          <p>The page check for the existence of local data files for top level quearies to the TBA API (districts, events, teams, etc...).</p>
        </div>
        <div className="bg-white rounded-2xl p-4 my-2 flex-1 min-w-[130px] shadow-md">
          <h2>DISTRICTS DATA</h2>
          <p>Data Setup Messages</p>
          {setupDistricts.results.map((i) => ( <p key={i} className="text-lg font-semibold">{i}</p> ))}
          <p>{season} District Data</p>
          {setupDistricts.data.map((i) => ( <p key={i.key}>{i.key} - {i.display_name}</p> ))}
        </div>
        <div className="bg-white rounded-2xl p-4 my-2 flex-1 min-w-[130px] shadow-md">
          <h2>Events DATA ({setupEvents.data.length} events)</h2>
          <p>Data Setup Messages</p>
          {setupEvents.results.map((i) => ( <p key={i} className="text-lg font-semibold">{i}</p> ))}
          <p>{season} Events Data</p>
          {setupEvents.data.map((i) => ( <p key={i.key}>{i.key} - {i.name} - {i.event_type_string} - {i.district && i.district.key}</p> ))}
        </div>
        <div className="bg-white rounded-2xl p-4 my-2 flex-1 min-w-[130px] shadow-md">
          <h2>Teams DATA ({setupTeams.data.length} teams)</h2>
          <p>Data Setup Messages</p>
          {setupTeams.results.map((i) => ( <p key={i} className="text-lg font-semibold">{i}</p> ))}
          <p>{season} Teams Data</p>
          {setupTeams.data.map((i) => ( <p key={i.key}>{i.key} - {i.nickname} - {i.city}, {i.state_prov}</p> ))}
        </div>
      </div>
    )
  }