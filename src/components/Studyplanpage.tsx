import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const Studyplanpage = () => {
  return (
    <div className=" bg-gray-20 ">
      {/* Main Content */}
      <div className="p-8  w-full md:w-120 ">
        <div className="">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Create Your Study Plan</h1>

          {/* Academic Calendar Section */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Academic Calendar</h2>
            <div className="space-y-4">
              {[1, 2, 3, 4, 5].map((index) => (
                <Select key={index}>
                  <SelectTrigger className="w-full bg-gray-50 border-gray-200">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="option1">Option 11</SelectItem>
                    <SelectItem value="option2">Option 2</SelectItem>
                    <SelectItem value="option3">Option 3</SelectItem>
                  </SelectContent>
                </Select>
              ))}
            </div>
          </div>

          {/* Extracurricular Activities Section */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Extracurricular Activities</h2>
            <div className="space-y-4">
              {[1, 2, 3].map((index) => (
                <Select key={index}>
                  <SelectTrigger className="w-full bg-gray-50 border-gray-200">
                    <SelectValue placeholder="Select Activity" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sports">Sports</SelectItem>
                    <SelectItem value="music">Music</SelectItem>
                    <SelectItem value="art">Art</SelectItem>
                    <SelectItem value="volunteering">Volunteering</SelectItem>
                  </SelectContent>
                </Select>
              ))}
            </div>
          </div>

         {/* Study Preferences Section */}
              <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Study Preferences</h2>

              <div className="space-y-6">
                {/* Study Days Per Week */}
                <div className="flex flex-col sm:flex-row items-center gap-4">
                  <label className="sm:w-56 md:w-full text-gray-700 font-medium">Study Days Per Week</label>
                  <div className="w-full bg-gray-200 rounded-full h-1">
                    <div className="bg-blue-600 h-1 rounded-full" style={{ width: "71%" }}></div>
                  </div>
                  <span className="w-10 text-gray-900 font-semibold text-right">5</span>
                </div>

                {/* Study Session Duration */}
                <div className="flex flex-col sm:flex-row items-center gap-4">
                  <label className="sm:w-56 md:w-full text-gray-700 font-medium">Study Session Duration (minutes)</label>
                  <div className="w-full bg-gray-200 rounded-full h-1">
                    <div className="bg-blue-600 h-1 rounded-full" style={{ width: "50%" }}></div>
                  </div>
                  <span className="w-10 text-gray-900 font-semibold text-right">60</span>
                </div>
              </div>
            </div>


          {/* Action Buttons */}
          <div className="flex gap-4">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2">Generate Study Plan</Button>
            <Button variant="outline" className="px-6 py-2 bg-transparent">
              Reset
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Studyplanpage;