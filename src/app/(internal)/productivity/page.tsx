
'use client'
import React from 'react'
import LineChart from '@/components/charts/Linechart'
import StudyTime from '@/components/charts/VerticalBarchart'
import WeeklyProgress from '@/components/charts/WeeklyProgress'

const Productivity = () => {
  return (
    <div className="flex flex-col min-w-[300px] md:min-w-[640px] lg:min-w-[1024px] mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12 space-y-6 sm:space-y-8 lg:space-y-12">

        <div className="w-full">
            <h2 className="font-bold text-3xl mb-4"> Productivity Report </h2>
            <p className="text-2xl-blue"> Analyze your weekly productivity, goal, achievement, and mental health trends. </p>
        </div>

      <div className="study-chart w-full">
        <h2 className="font-bold text-2xl py-8">Weekly Productivity</h2>
        <StudyTime />
      </div>

      <div className="w-full">
        <WeeklyProgress />
          </div>
          
        <h2 className="font-bold text-2xl text-left"> Mental Health Trend </h2>


      <div className="productivity-chart w-full"> 
        <LineChart />
    </div>
          
    </div>
  )
}

export default Productivity
