import Example from "@/components/Example"

const Homepage = () => {
  return (
    <div className=''>
      <h2 className="text-2xl py-4">Welcome to the Homepage!</h2>
      <div className="flex gap-4 justify-between flex-wrap">
        <div className="rounded-2xl odd:bg-red-400 even:bg-blue-400 p-4 flex-1 min-w-[200px] text-slate-100">
          The most important part of building a new app is forst defining what the is, what it needs to do, and how that maps to the user interface.
        </div>
        <div className="rounded-2xl odd:bg-red-400 even:bg-blue-400 p-4 flex-1 min-w-[200px] text-slate-100">
          There are two main files for setting up the user interface: 
          <ul className="font-semi-bold px-4">
            <li>layout.tsx</li>
            <li>page.tsx</li>
          </ul>
        </div>
        <div className="rounded-2xl odd:bg-red-400 even:bg-blue-400 p-4 flex-1 min-w-[200px] text-slate-100">
          Page routing is handled by folder structure. The contents of file "src/app/admin/page.tsx" would be delivered to the url "/admin".
        </div>
        <div className="rounded-2xl odd:bg-red-400 even:bg-blue-400 p-4 flex-1 min-w-[200px] text-slate-100">
          The page uses the layout file closest up the directory chain. To us an alternate layout simply create another layotu.tsx file relative to the page.tsx file.
        </div>
      </div>
      <div className="flex gap-4 justify-between flex-wrap py-4">
        <div className="rounded-2xl bg-gray-800 p-4 flex-1 min-w-[200px] text-slate-100">
          Another tool for reusable element that can be loading into multiple pages is components. Components are .tsx files create in the src/components folder. 
          They can also be passed values for use in progromatically rendering the same type of content.
        </div>
      </div>
      <div className="flex gap-4 justify-between flex-wrap">
        <div className="rounded-2xl p-4 flex-1 min-w-[200px] text-gray-900 border-slate-800 border-2">
          <Example />
          <p className="text-xs font-mono align-bottom text-right">&lt;Example /&gt;</p>
        </div>
        <div className="rounded-2xl p-4 flex-1 min-w-[200px] text-gray-900 border-slate-800 border-2">
          <Example parameter="Value Passed"/> 
          <p className="text-xs font-mono align-bottom text-right">&lt;Example parameter="Value Passed"/&gt;</p>
        </div>
      </div>
    
    </div>
  )
}

export default Homepage