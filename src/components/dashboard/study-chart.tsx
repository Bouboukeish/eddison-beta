"use client"

import { TrendingUp } from "lucide-react"
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

const studyData = [
  { day: "Monday", studyTime: 3.5, focusScore: 80 },
  { day: "Tuesday", studyTime: 4.2, focusScore: 85 },
  { day: "Wednesday", studyTime: 3.8, focusScore: 75 },
  { day: "Thursday", studyTime: 4.4, focusScore: 90 },
  { day: "Friday", studyTime: 3.1, focusScore: 70 },
  { day: "Saturday", studyTime: 5.3, focusScore: 95 },
  { day: "Sunday", studyTime: 4.5, focusScore: 88 },
]

const chartConfig = {
  studyTime: {
    label: "Study Time (hours)",
    color: "hsl(var(--primary))",
  },
  focusScore: {
    label: "Focus Score",
    color: "hsl(var(--secondary))",
  },
} satisfies ChartConfig

export function StudyChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Weekly Study Progress</CardTitle>
        <CardDescription>This Week&apos;s Performance</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <LineChart
            accessibilityLayer
            data={studyData}
            margin={{
              left: 12,
              right: 12,
            }}
            height={350}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="day"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value: string) => value.slice(0, 3)}
            />
            <YAxis
              yAxisId="left"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value: number) => `${value}h`}
            />
            <YAxis
              yAxisId="right"
              orientation="right"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value: number) => `${value}%`}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Line
              yAxisId="left"
              dataKey="studyTime"
              type="natural"
              stroke="var(--color-studyTime)"
              strokeWidth={2}
              dot={{
                fill: "var(--color-studyTime)",
              }}
            />
            <Line
              yAxisId="right"
              dataKey="focusScore"
              type="natural"
              stroke="var(--color-focusScore)"
              strokeWidth={2}
              dot={{
                fill: "var(--color-focusScore)",
              }}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
} 