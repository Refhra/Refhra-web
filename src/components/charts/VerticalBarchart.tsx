import { BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

type Data = {
    name: string;
    uv: number;
    pv: number;
    amt: number;
}

type BarData = Data[]

const data: BarData = [
    {
        name: "Mon",
        uv: 4000,
        pv: 2400,
        amt: 2400,
    },

    {
        name: "Tue",
        uv: 4000,
        pv: 2400,
        amt: 2400,
    },

    {
        name: "Wed",
        uv: 4000,
        pv: 2400,
        amt: 2400,
    },

    {
        name: "Thur",
        uv: 4000,
        pv: 1200,
        amt: 2400,
    },

    {
        name: "Fri",
        uv: 2500,
        pv: 2400,
        amt: 2400,
    },

    {
        name: "Sat",
        uv: 4000,
        pv: 2300,
        amt: 2400,
    },

     {
        name: "Sun",
        uv: 3000,
        pv: 2400,
        amt: 2400,
    }
]

const StudyTime = () => {
    return (
        <div className="w-[100%]">
            <div className="hours-spent w-[100%] h-auto border rounded-md py-2 px-6 mb-4">
                <h2 className="text-xl font-bold mb-1"> Hours Spent Studying</h2>
                <h1 className="text-5xl font-bold mb-2">35</h1>

                <p className="font-bold mb-6">Last 7 Days</p>

                <div className="bar-chart h-96">
                    <ResponsiveContainer
                        width="100%"
                        height="100%">
                        <BarChart
                            width={150}
                            height={40}
                            data={data}
                            margin={{
                                top: 5,
                                right: 30,
                                left: 20,
                                bottom: 5,
                            }}
                        
                        >
                            <CartesianGrid strokeDasharray=" 3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="pv" fill="#9bb3d5ff" activeBar={<Rectangle fill="#a0acbeff" stroke="#95a3b8ff"/>} />
                            <Bar dataKey="uv" fill="#82ca9d" activeBar={<Rectangle fill="#8aa5aaff" stroke="#8dcea4ff"/> } />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    )
}

export default StudyTime;