
'use client'
import React from 'react'
import { LineChart, YAxis, Tooltip, Line, CartesianGrid, XAxis, Legend, ResponsiveContainer } from 'recharts';


type Data = {
  name: string;
  uv: number;
  pv: number;
  amt: number;

}

type LineData = Data[]

const data: LineData= [
  {
    name: "Mon",
    uv: 400,
    pv: 2400,
    amt: 2400, 
  },

  {
    name: "Tue",
    uv: 300,
    pv: 2800,
    amt: 2800,
  },

  {
    name: "Wed",
    uv: 100,
    pv: 2400,
    amt: 2400,
  },
   
  {
    name: "Thur",
    uv: 200,
    pv: 2500,
    amt: 2500,
  },
    
  {
    name: "Fri",
    uv: 500,
    pv: 2500,
    amt: 2500,
  },
     
  {
    name: "Sat",
    uv: 300,
    pv: 2400,
    amt: 2400,
  },
      
  {
    name: "Tue",
    uv: 400,
    pv: 3000,
    amt: 3000,
  },

  {
    name: "Sun",
    uv: 500,
    pv: 2800,
    amt: 2800,
  }
]

const Productivity = () => {
  return (
    <div style={{width: "100%", height: 300}}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="pv" stroke="#8884d8" activeDot={{ r: 8}} />
          <Line type="monotone" dataKey="uv" stroke="#82ca9d" />

          </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

export default Productivity
