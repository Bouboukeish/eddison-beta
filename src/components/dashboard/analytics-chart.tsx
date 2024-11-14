import { XAxis } from "recharts"

const AnalyticsChart = () => {
    return (
        <XAxis 
            dataKey="name" 
            stroke="#888888"
            fontSize={12}
            tickLine={false}
            axisLine={false}
            tickFormatter={(value: string) => value.slice(0, 3)}
        />
    )
}

export default AnalyticsChart;