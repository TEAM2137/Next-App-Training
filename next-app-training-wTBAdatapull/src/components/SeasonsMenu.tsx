import seasonData from '@/data/seasons.json';
import Link from "next/link";


const SeasonsMenu = ({ urlprefix }) => {

  
  return (
    <div className="flex-col w-full px-4 gap-2 items-center justify-center">
        <div className="flex-col items-center justify-center gap-6">
        {seasonData.toReversed().map((season) => (
            <Link key={season.seasonID}  href={urlprefix + season.seasonID}>
            <span  
            className="block w-full py-10 my-2 
            items-center bg-sky-200 rounded-xl 
            text-center
            text-md font-semibold shadow-md 
            hover:bg-torcblue hover:text-white">
                {season.seasonID} {season.seasonName}
            </span></Link>
        ))}</div>
    </div>
  )
}

export default SeasonsMenu