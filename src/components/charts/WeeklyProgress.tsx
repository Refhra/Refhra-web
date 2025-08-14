// import { ComposedChart, Line, Area, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { Progress } from "@/components/ui/progress"

type progressData = {
    id: number;
    title: string;
    percentage: number;
    // length: number;
}

type Progress = progressData[];

const progress: Progress = [
    { id: 1, title: "Reading", percentage: 70 },
    { id: 2, title: "Math", percentage: 25 },
    { id: 3, title: "Science", percentage: 90 },
    { id: 4, title: "History", percentage: 49 },
] 

console.log(progress.length);
let sum = 0;
progress.forEach(data => sum += data.percentage)
const average = sum / progress.length;

export const WeeklyProgress = () => {
    return (
        <div className="flex flex-col justify-center py-6 w-full md:w-[768px] lg:w-[1024px]">
            <div className="goal-title">
                <h3 className="font-bold py-2 text-3xl"> Goal Achievements </h3>
            </div>
            <div className=" border rounded-md p-6">
                <h3 className="font-bold">Goals Completed</h3>
                <h2 className="font-bold py-2 text-5xl">{average}%</h2>
                <p className="pb-4">This Week</p>
                {progress.map((item, i) => (

                    <div key={i} className="flex items-center justify-center gap-6">
                        <h4>{item.title}</h4>
                        <Progress value={item.percentage} className="bg-transparent h-6 [&>div]:bg-gray-300 [&>div]:border-r-4 [&>div]:border-blue-900 rounded-none my-2" />
                        <p>{ item.percentage}%</p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default WeeklyProgress;