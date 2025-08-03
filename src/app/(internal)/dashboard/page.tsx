'use client'
// import Link from 'next/link'

import { Button } from '@/components/ui/button'
import { BookOpen } from 'lucide-react'
import { FileSpreadsheet, Heart } from 'lucide-react'
import { Progress } from '@/components/ui/progress'
  // <BookOpen />

const Dashboard = () => {

  const setTime = (hour: number, minute: number = 0) => {
    const time = new Date();
    time.setHours(hour, minute, 0)
    const formattedTime = time.toLocaleString('en-US', { hour: '2-digit', minute: '2-digit' })
    return formattedTime
  }
  
  //Define the individual object type
  type TodaysFocus = {
    id: number;
    title: string;
    time: string;
    percentage: number;
  }

  //define the array type to hold all the objects
  type TodaysFocusArray = TodaysFocus[];

  const todaysFocus: TodaysFocusArray = [
    {
      id: 1,
      title: "Calculus II",
      time: `${setTime(9)} - ${setTime(10)}`,
      percentage: (100 / 4) * 3,
    },

    {
      id: 2,
      title: "Linear Algebra",
      time: `${setTime(10)} - ${setTime(11)}`,
      percentage: (100 / 4) * 2,

    },

    {
      id: 3,
      title: "Probability and Statistics",
      time: `${setTime(11)} - ${setTime(12)}`,
      percentage: 100 / 4,

    }
  ]

  console.log(todaysFocus[0].time)

  const upComingDeadlines = [
    {
      id: 1,
      title: "Calculus II Assignment",
      elapseTime: "Due: Tomorrow"
    },

     {
      id: 2,
      title: "Linear Algebra Project",
      elapseTime: "Due: Next Week"
    },
     
    {
      id: 3,
      title: "Linear Algebra Project",
      elapseTime: "Due: Next Week"
    } 
  ]

  return (

    <div className="mx-8 flex flex-col ">
        <div className="py-6">
          <h1 className="font-bold text-4xl">Welcome Back, Sarah</h1>
        </div>

      {/* The days Focus section */}

      <div className="todays-focus flex flex-col justify-center py-4">
        <h3 className="font-bold">{"Today's Focus"}</h3>
        {todaysFocus.map((item, i) => (
          
          <div key={i} id={item.id.toString()} className="flex items-center gap-4 py-2"> 
            <div className="icon bg-[#EAEFEF] p-2 border border-none rounded-md">
              <BookOpen strokeWidth="1px"/>
            </div>
            <div>
              <h4>{item.title}</h4>
              <p>{item.time}</p>
            </div>
          </div>

        ))}
        
      </div>

      {/* Upcoming Deadlines Section */}
      <div className="upcoming-dealines flex flex-col justify-center py-4x">
        <div>
          <h3 className="font-bold">Upcoming Deadlines</h3>
        </div>
        <div className="">
          {upComingDeadlines.map((item, i) => (
            <div key={i} id={item.id.toString()} className="flex items-center gap-4 py-2"> 
              <div className="bg-[#EAEFEF] p-2 border border-none rounded-md"> 
                <FileSpreadsheet strokeWidth="1px"/>
              </div>

              <div> 
                <h4>{item.title}</h4>
                <p>{item.elapseTime}</p>
              </div>

           </div>
          ))}
        </div>
      </div>

      {/* Study Progress Section */}

      <div className="study-progress flex flex-col justify-center py-6">
        <div className="progress-title">
            <h3 className="font-bold py-2"> Study Progress </h3>
        </div>
        <div className="course-title space-y-4">
          {todaysFocus.map((item, i) => (
            <div key={i} id={item.id.toString()} className="space-y-2">
              <h2>{item.title}</h2>
              <Progress value={item.percentage} className="bg-gray-200 [&>div]:bg-blue-500 [&>div]:rounded-lg" />
              <p>{item.percentage}%</p>
            </div>
            ))}
        </div>
      </div>

      {/* Mental Health checking and Motivational Message */}

      <div className="mental-health-checking flex flex-col space-y-6 py-8">
        <div className="flex flex-col py-4">
            <h4 className="font-bold py-1">Mental Health Check-in </h4>
          <div className="flex justify-between space-y-2 flex-col md:flex-row lg:flex-row md:space-y-0 lg:space-y-0">
            <div className="flex space-x-4"> 
              <div className="icon bg-[#EAEFEF] p-2 border border-none rounded-md">
                <Heart strokeWidth="1px"/>
              </div>
              <p> Check-in for today </p>
            </div>
            <div>  
              <Button className="bg-gray-200 text-black"> Start </Button>
            </div>

          </div>
        </div>

        <div className="flex flex-col">
          <h4 className="font-bold">Motivational Message</h4>
            <p>Believe in yourself and all that you are. Know that there is something inside you that is greater than any obstacle.</p>
        </div>
      </div>
    </div >
  )
}

export default Dashboard
