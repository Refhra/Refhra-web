import {
  BarChart3,
  Calendar,
  MessageSquare,
  Users,
  Code,
  Play,
  Database,
  SearchIcon,
  Monitor,
  TrendingUp,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"

const  SkillPage = () => {
  const skills = [
    { name: "Data Analysis", hours: 10, icon: BarChart3, active: true },
    { name: "Project Management", hours: 15, icon: Calendar, active: false },
    { name: "Communication", hours: 8, icon: MessageSquare, active: false },
    { name: "Leadership", hours: 12, icon: Users, active: false },
    { name: "Software Development", hours: 20, icon: Code, active: false },
  ]

  const roadmapItems = [
    { title: "Introduction to Data Analysis", icon: Play, completed: true },
    { title: "Data Cleaning and Preparation", icon: Database, completed: true },
    { title: "Exploratory Data Analysis", icon: SearchIcon, completed: true },
    { title: "Data Visualization", icon: Monitor, completed: false },
    { title: "Advanced Data Analysis Techniques", icon: TrendingUp, completed: false },
  ]

  const resources = [
    {
      type: "Article",
      title: "The Ultimate Guide to Data Analysis",
      description:
        "A comprehensive guide covering all aspects of data analysis, from basic concepts to advanced techniques.",
    },
    {
      type: "Course",
      title: "Data Analysis with Python",
      description: "Learn data analysis using Python, covering libraries like Pandas, NumPy, and Matplotlib.",
    },
    {
      type: "Book",
      title: "Data Science for Business",
      description: "A practical guide to data science, focusing on how to use data to solve business problems.",
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex flex-col lg:flex-row">
        {/* Sidebar */}
        <aside className="w-full lg:w-80 bg-white border-b lg:border-r border-gray-200 p-6 lg:min-h-screen">
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-4">Skills</h2>
            <div className="flex flex-wrap gap-2 mb-6">
              <Button variant="ghost" className="text-sm">
                Recommended
              </Button>
              <Button variant="ghost" className="text-sm text-blue-600">
                All Skills
              </Button>
              <Button variant="ghost" className="text-sm text-blue-600">
                My Skills
              </Button>
            </div>
          </div>

          <div className="space-y-3">
            {skills.map((skill, index) => {
              const IconComponent = skill.icon
              return (
                <div
                  key={index}
                  className={`flex items-center space-x-3 p-3 rounded-lg cursor-pointer transition-colors ${
                    skill.active ? "bg-blue-50 border border-blue-200" : "hover:bg-gray-50"
                  }`}
                >
                  <div className={`p-2 rounded-lg ${skill.active ? "bg-blue-100" : "bg-gray-100"}`}>
                    <IconComponent className={`w-5 h-5 ${skill.active ? "text-blue-600" : "text-gray-600"}`} />
                  </div>
                  <div className="flex-1">
                    <h3 className={`font-medium ${skill.active ? "text-gray-900" : "text-gray-700"}`}>{skill.name}</h3>
                    <p className="text-sm text-gray-500">{skill.hours} hours</p>
                  </div>
                </div>
              )
            })}
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8">
          <div className="max-w-4xl">
            <h1 className="text-3xl font-bold mb-8">Data Analysis</h1>

            {/* Progress Section */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-3 ">
                <h2 className="text-lg font-semibold ">Progress</h2>
                <span className="text-sm  font-medium ">60%</span>
              </div>
              <Progress value={60} className="h-2 [&>div]:bg-blue-600" />
            </div>

            {/* Roadmap Section */}
            <div className="mb-12">
              <h2 className="text-lg font-semibold mb-6">Roadmap</h2>
              <div className="space-y-4">
                {roadmapItems.map((item, index) => {
                  const IconComponent = item.icon
                  return (
                    <div key={index} className="flex items-center space-x-4">
                      {/* <div>
                        {item.completed ? (
                          <div className="w-2 h-2 bg-white rounded-full"></div>
                        ) : (
                          <div className="w-2 h-2 bg-gray-200 rounded-full"></div>
                        )}
                      </div> */}
                      <div className="flex items-center space-x-3">
                        <IconComponent className="w-5 h-5 text-gray-600" />
                        <span className="font-medium text-gray-900">{item.title}</span>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Resources Section */}
            <div>
              <h2 className="text-lg font-semibold mb-6">Resources</h2>
              <div className="space-y-8">
                {resources.map((resource, index) => (
                  <div key={index}>
                    <Badge variant="secondary" className="mb-2 text-xs text-blue-600 bg-blue-50">
                      {resource.type}
                    </Badge>
                    <h3 className="font-semibold text-gray-900 mb-2">{resource.title}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">{resource.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

export default SkillPage;