import Image from "next/image"
import Link from "next/link"
import Menu from "./Menu"

const Navbar = () => {
  return (
    <div className="h-12 flex items-center justify-between">
      <div className="block w-[70%]">
        <Link href="/" className="flex font-bold text-sm xs:text-xs text-blue-600 gap-2">
          <Image 
            src="/logos/TORC-Logo.svg"
            width={20} 
            height={17.33}
            alt="" />
          NEXT APP DEV
        </Link>
      </div>
      <div className="w-[30%] flex items-center gap-4 xl:gap-8 justify-end">
        <Menu />
      </div>
    </div>
  )
}

export default Navbar