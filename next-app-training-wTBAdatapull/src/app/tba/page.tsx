import seasonData from '@/data/seasons.json';
import Link from "next/link";

import SeasonsMenu from "@/components/SeasonsMenu";

// Get TBA Status and Cache for 1 hour
const tbastatusurl = process.env.TBA_URL + "/status";
const tbakey = process.env.TBA_KEYNAME + "";
const tbaval = process.env.TBA_KEYVAL + "";

export const revalidate = 60 // invalidate every 60 seconds

export default async function Page() {
  // get up/down status from TBA
    const headers = new Headers();
    headers.set('Content-Type', 'application/json');
    headers.set(tbakey, tbaval);
    const requestOptions = {
        method: 'GET',
        headers: headers,
    };
    const data = await fetch(tbastatusurl, requestOptions);
    const tbaStatus = await data.json();
  
  
  
  return (
    <div className="flex-col w-full gap-4 justify-between py-4">
        <div className="bg-white rounded-2xl p-4 my-2 flex-1 min-w-[130px] shadow-md">
          <div className="py-1 text-xl font-bold">TBA API Status</div>
          {!tbaStatus.is_datafeed_down && ( 
            <div className="text-green-700 font-semibold">The TBA feed is up and responding.</div>
          )}
          {tbaStatus.is_datafeed_down && ( 
              <div className="text-red-700 font-semibold">The TBA feed is down.<br/>DO NOT PROCEED!</div>
          )}
        </div>
        <p className="py-4 mx-8"><span className="text-lg font-semibold">Select a Season:</span><br/>
          to Set, Check, or Redownload to Local Data (this only needs to be done when you are first setting up the app, are adding a season, or recoving deleted data files)</p>
        <SeasonsMenu urlprefix="/tba/"/>
    </div>
)}
