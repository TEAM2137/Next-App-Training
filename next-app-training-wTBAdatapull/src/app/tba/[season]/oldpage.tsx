import { promises as fs } from 'fs';

let districtData = [];
let eventData = [];

export default async function SeasonPage({
    params,
  }: {
    params: Promise<{ season: string }>
  }) {
    const season = (await params).season;

    // Try to read data directory and create if it doesn't exist
    try {
      const seasonDir = await fs.readdir('./data/');
    } catch (error) {
      //console.log('error');
      const seasonDir = await fs.mkdir('./data/');
    }

    // Try to read Seson data directory and create if it doesn't exist
    try {
      const seasonDir = await fs.readdir('./data/' + season);
    } catch (error) {
      //console.log('error');
      const seasonDir = await fs.mkdir('./data/' + season);
    }

    let statusMessage = "";

    //check for season districts data file
    // Set the Districts Data File
    const dataFile = './data/' + season + '/districts.json';

    try {
      const districtDataFile = await fs.readFile(dataFile)
      districtData = await JSON.parse(districtDataFile.toString());
      statusMessage = 'File Read: Success!';
    } catch (error) {
      // Get Data from TBA
      // Get TBA Status and Cache for 1 hour
      const tbastatusurl = process.env.TBA_URL + "/districts/" + season;
      const tbakey = process.env.TBA_KEYNAME + "";
      const tbaval = process.env.TBA_KEYVAL + "";
      // Set headers for TBA auth
      const headers = new Headers();
      headers.set('Content-Type', 'application/json');
      headers.set(tbakey, tbaval);
      const requestOptions = {
          method: 'GET',
          headers: headers,
      };
      const districtDataPull = await fetch(tbastatusurl, requestOptions);
      districtData = await districtDataPull.json();

      const districtWriteData = JSON.stringify(districtData, null, '\t');
      const districtDataFile = await fs.writeFile(dataFile, districtWriteData);
      statusMessage = 'No FIle, Retreived from TBA and saved to file.';
      
    }

    //check for season events data file
    // Set the Event Data File
    const eventsDataFile = './data/' + season + '/events.json';
    let eventsStatusMessage = "";

    try {
      const districtDataRead = await fs.readFile(eventsDataFile)
      eventData = await JSON.parse(districtDataRead.toString());
      eventsStatusMessage = 'File Read: Success!';
    } catch (error) {
      // Get Data from TBA
      // Get TBA Status and Cache for 1 hour
      const tbastatusurl = process.env.TBA_URL + "/events/" + season;
      const tbakey = process.env.TBA_KEYNAME + "";
      const tbaval = process.env.TBA_KEYVAL + "";
      // Set headers for TBA auth
      const headers = new Headers();
      headers.set('Content-Type', 'application/json');
      headers.set(tbakey, tbaval);
      const requestOptions = {
          method: 'GET',
          headers: headers,
      };
      const eventsDataPull = await fetch(tbastatusurl, requestOptions);
      eventData = await eventsDataPull.json();
      // Write Events data file
      const eventWriteData = JSON.stringify(eventData, null, '\t');
      const eventDataFile = await fs.writeFile(eventsDataFile, eventWriteData);
      eventsStatusMessage = 'No FIle, Retreived from TBA and saved to file.';
    }

    let eventCount = eventData.length;
    const districtOutput = JSON.stringify(districtData, null, '\t');
    const eventOutput = JSON.stringify(eventData, null, '\t');

    return (
      <div className="flex-col w-full gap-4 justify-between py-4">
        <div className="bg-white rounded-2xl p-4 my-2 flex-1 min-w-[130px] shadow-md">
          <h2>{season} DATA SETUP</h2>
          <p>The page check for the existence of local data files for top level quearies to the TBA API (districts, events, teams, etc...).</p>
        </div>
        <div className="bg-white rounded-2xl p-4 my-2 flex-1 min-w-[130px] shadow-md">
          <h2>DISTRICTS DATA</h2>
          <p>{statusMessage}</p>
          {districtData.map((district: any) => (
            <p key={district.abbreviation}>{district.abbreviation} - {district.display_name}</p>
          ))}
          <p className="hidden"><code>{districtOutput}</code></p>
        </div>
        <div className="bg-white rounded-2xl p-4 my-2 flex-1 min-w-[130px] shadow-md">
          <h2>EVENT DATA</h2>
          <p>{eventsStatusMessage} ({eventCount} events)</p>
          {eventData.map((event: any) => (
            <p key={event.key}>{event.key} - {event.name} - {event.state_prov} - Week {event.week + 1} - {event.start_date}</p>
          ))}
          <p className="hidden"><code>{districtOutput}</code></p>
        </div>
      </div>
    )
  }