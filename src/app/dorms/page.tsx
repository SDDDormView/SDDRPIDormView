import Link from "next/link";

export default function Home() {

  //set up building class to use in css

  return (
    <main className="flex-col h-screen">
      {/* this goes behind the header so it doesn't look like whitespace */}
      <div className="h-18 bg-black flex">

      </div>

      <div className="min-h-screen flex justify-center">
        {/* sidebar, where the filter is located */}
        <div className="w-1/6 bg-gray-800 text-white p-4 py-8">
          <h2 className="text-center text-xl font-bold mb-4">
            Filter Options
          </h2>

          {/* list of filter options */}
          <p className="text-center text-lg my-4">Year</p>
          <ul className="space-y-4">
            <li className="flex items-center gap-2">
              <input type="checkbox" className="w-4 h-4" />
              <p>Freshmen</p>
            </li>

            <li className="flex items-center gap-2">
              <input type="checkbox" className="w-4 h-4" />
              <p>Sophomore</p>
            </li>

            <li className="flex items-center gap-2">
              <input type="checkbox" className="w-4 h-4" />
              <p>Junior</p>
            </li>

            <li className="flex items-center gap-2">
              <input type="checkbox" className="w-4 h-4" />
              <p>Senior</p>
            </li>
          </ul>

          <div className="h-px bg-white my-4"></div>

          <p className="text-center text-lg my-4">Room Type</p>
          <ul className="space-y-4">
            <li className="flex items-center gap-2">
              <input type="checkbox" className="w-4 h-4" />
              <p>Single</p>
            </li>

            <li className="flex items-center gap-2">
              <input type="checkbox" className="w-4 h-4" />
              <p>Double</p>
            </li>

            <li className="flex items-center gap-2">
              <input type="checkbox" className="w-4 h-4" />
              <p>Triple</p>
            </li>

            <li className="flex items-center gap-2">
              <input type="checkbox" className="w-4 h-4" />
              <p>Suite</p>
            </li>
          </ul>
        </div>

        {/* dorm list main body */}
        <div className="w-5/6 bg-gray-100 p-6 space-y-4">
          <h1 className="text-center text-4xl font-bold">
            Dorms
          </h1>

          {/* dorm list */}
          <ul className="space-y-4">
            <li>
              <Link href="#">
              <div className="flex p-4 bg-gray-400 rounded space-x-4 hover:bg-gray-500">
                {/* image element */}
                <img src="/fieldrpi.jpg" alt="86 field" className="w-48 h-48 object-cover rounded" />

                {/* text elements */}
                <div className="flex flex-col w-full space-y-4">
                  <div className="text-lg font-bold">Dorm: Crockett Hall</div>

                  {/* attributes and tags */}
                  <div className="grid grid-cols-3 gap-4">
                    <p>Nearest dining hall: Commons</p>
                    <p>A/C: No</p>
                    <p>Elevator: No</p>
                  </div>

                  <p className="font-bold">Tags: ethernet, bike rack, elevator</p>
                </div>
              </div>
              </Link>
            </li>

            <li>
              <Link href="#">
              <div className="flex p-4 bg-gray-400 rounded space-x-4 hover:bg-gray-500">
                {/* image element */}
                <img src="/fieldrpi.jpg" alt="86 field" className="w-48 h-48 object-cover rounded" />

                {/* text elements */}
                <div className="flex flex-col w-full space-y-4">
                  <div className="text-lg font-bold">Dorm: Quad</div>

                  {/* attributes and tags */}
                  <div className="grid grid-cols-3 gap-4">
                    <p>Nearest dining hall: Sage</p>
                    <p>A/C: No</p>
                    <p>Elevator: No</p>
                  </div>

                  <p className="font-bold">Tags: ethernet, bike rack, elevator</p>
                </div>
              </div>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </main>
  )
}