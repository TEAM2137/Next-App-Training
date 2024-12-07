import Image from "next/image"
import Link from "next/link"

const Items = [
    {
        title: "MEMBERS MENU",
        items: [
            {
                icon: "/icons/home.svg",
                label: "Home",
                href: "/",
                visible: ["appadmin", "teamadmin", "teamscout", "public"],
            },
            {
                icon: "/icons/monitoring.svg",
                label: "Competitons",
                href: "/competition",
                visible: ["appadmin", "teamadmin", "teamscout", "public"],
            },
        ],
    },
    {
        title: "ADMIN MENU",
        items: [
            {
                icon: "/icons/admin.svg",
                label: "Admin Panel",
                href: "/admin",
                visible: ["appadmin"],
            },
            {
                icon: "/icons/team-settings.svg",
                label: "Team Admin",
                href: "/admin/team/1234",
                visible: ["appadmin","teamadmin"],
            },
        ],
    },
    {
        title: "TBA API",
        items: [
            {
                icon: "/icons/admin.svg",
                label: "TBA Data Setup",
                href: "/tba",
                visible: ["appadmin"],
            },
        ],
    },
]

const MenuItems = () => {
    return (
        <div className='flex lg:flex-row sm: flex-wrap mt-4 text-sm gap-4'>
          {Items.map((i) =>(
            <div className="flex flex-col gap-4 items-start px-2" key={i.title}>
              <span className="block text-slate-500 font-light py-1">{i.title} </span>
              {i.items.map((item) => (
                <Link href={item.href} key={item.label} 
                className="flex items-center justify-start gap-2 text-gray-500">
                <Image 
                src={item.icon} 
                key={item.label} 
                width={24} 
                height={24} 
                className="fill-red-600" 
                alt=""/>
                <span>{item.label}</span>
                </Link>
              ))}
            </div>
          ))}
        </div>
      )
  }

export default MenuItems