"use client"

import React from 'react'
import { ArrowDownIcon, ArrowUpIcon, BookOpenIcon, BrainIcon, ClockIcon, TrendingUp } from "lucide-react"
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts"
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { ANALYTICS_DATA, ACTIVITIES } from "@/constants/dashboard"
import { Container } from "@/components"

const chartConfig = {
    studyTime: {
        label: "Hours Studied",
        color: "hsl(var(--primary))",
    }
} satisfies ChartConfig

const Page = () => {
    return (
        <div className="p-4 w-full">
            <div className="flex flex-col w-full">
                {/* Dashboard Cards */}
                <div className="mt-4 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    <Container>
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Total Study Time</CardTitle>
                                <ClockIcon className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">28.8h</div>
                                <p className="text-xs text-muted-foreground">
                                    +2.5h from last week
                                    <ArrowUpIcon className="ml-1 h-4 w-4 text-green-500 inline" />
                                </p>
                            </CardContent>
                        </Card>
                    </Container>

                    <Container delay={0.1}>
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Focus Score</CardTitle>
                                <BrainIcon className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">85%</div>
                                <p className="text-xs text-muted-foreground">
                                    +5% from last week
                                    <ArrowUpIcon className="ml-1 h-4 w-4 text-green-500 inline" />
                                </p>
                            </CardContent>
                        </Card>
                    </Container>

                    <Container delay={0.2}>
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Topics Covered</CardTitle>
                                <BookOpenIcon className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">12</div>
                                <p className="text-xs text-muted-foreground">
                                    +3 from last week
                                    <ArrowUpIcon className="ml-1 h-4 w-4 text-green-500 inline" />
                                </p>
                            </CardContent>
                        </Card>
                    </Container>

                    <Container delay={0.3}>
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Study Streak</CardTitle>
                                <TrendingUp className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">7 days</div>
                                <p className="text-xs text-muted-foreground">
                                    Keep it up!
                                    <ArrowUpIcon className="ml-1 h-4 w-4 text-green-500 inline" />
                                </p>
                            </CardContent>
                        </Card>
                    </Container>
                </div>

                {/* Analytics Chart */}
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5 mt-4">
                    <Container delay={0.2} className="col-span-2">
                        <Card>
                            <CardHeader>
                                <CardTitle>Study Time</CardTitle>
                                <CardDescription>Your daily study progress this week</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <ChartContainer className="h-[200px]" config={chartConfig}>
                                    <LineChart
                                        data={ANALYTICS_DATA}
                                        margin={{ top: 5, right: 10, left: 5, bottom: 10 }}
                                    >
                                        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--muted))" opacity={0.4} />
                                        <XAxis
                                            dataKey="name"
                                            stroke="hsl(var(--muted-foreground))"
                                            fontSize={11}
                                            tickLine={false}
                                            axisLine={false}
                                            interval={0}
                                            angle={-45}
                                            textAnchor="end"
                                            height={35}
                                            tick={{ transform: 'translate(0, 8)' }}
                                        />
                                        <YAxis
                                            stroke="hsl(var(--muted-foreground))"
                                            fontSize={12}
                                            tickLine={false}
                                            axisLine={false}
                                            tickFormatter={(value: number) => `${value}h`}
                                            width={25}
                                        />
                                        <ChartTooltip
                                            cursor={false}
                                            content={<ChartTooltipContent hideLabel />}
                                        />
                                        <Line
                                            type="monotone"
                                            dataKey="studyTime"
                                            stroke="var(--color-studyTime)"
                                            strokeWidth={2}
                                            dot={{
                                                r: 4,
                                                fill: "hsl(var(--primary))",
                                                strokeWidth: 2,
                                                stroke: "hsl(var(--background))"
                                            }}
                                        />
                                    </LineChart>
                                </ChartContainer>
                            </CardContent>
                            <CardFooter className="flex-col items-start gap-1.5 text-xs">
                                <div className="flex gap-2 font-medium">
                                    <span>Best day: Saturday (5.3h)</span>
                                    <span>•</span>
                                    <span>Weekly goal: {(4 * 7)}h</span>
                                </div>
                                <div className="text-muted-foreground">
                                    You&apos;re on track! Keep up the good work 💪
                                </div>
                            </CardFooter>
                        </Card>
                    </Container>

                    {/* Recent Activities */}
                    <Container delay={0.3} className="col-span-3">
                        <Card>
                            <CardHeader>
                                <CardTitle>Recent Activities</CardTitle>
                                <CardDescription>Your latest learning progress</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-8">
                                    {ACTIVITIES.map((activity) => (
                                        <div key={activity.id} className="flex items-center">
                                            <div className="space-y-1">
                                                <p className="text-sm font-medium leading-none">{activity.text}</p>
                                                <p className="text-sm text-muted-foreground">{activity.time}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </Container>
                </div>
            </div>
        </div>
    )
}

export default Page
