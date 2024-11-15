"use client"

import React from 'react'
import { useUser } from "@clerk/nextjs"
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { ANALYTICS_DATA, ACTIVITIES } from "@/constants/dashboard"
import { Container } from "@/components"
import { StudyHeatmap } from "@/components/dashboard/study-heatmap"
import Leaderboard from "@/components/dashboard/leaderboard"

const chartConfig = {
    studyTime: {
        label: "Hours Studied",
        color: "hsl(var(--primary))",
    }
} satisfies ChartConfig

const Page = () => {
    const { user } = useUser()
    const [progress, setProgress] = React.useState(13)

    React.useEffect(() => {
        const timer = setTimeout(() => setProgress(66), 500)
        return () => clearTimeout(timer)
    }, [])

    return (
        <div className="p-4 w-full">
            <div className="flex flex-col w-full">
                {/* User Profile Section */}
                <Container>
                    <Card className="p-6 bg-gradient-to-r from-background to-background/50">
                        <div className="flex items-center gap-6">
                            <div className="relative">
                                <div className="relative w-20 h-20">
                                    {/* Animated gradient border with higher opacity */}
                                    <div 
                                        className="absolute -inset-[2px] rounded-full animate-[rotate_4s_linear_infinite]"
                                        style={{
                                            background: `linear-gradient(90deg, 
                                                hsl(var(--primary)) 0%, 
                                                hsl(var(--primary-light,var(--primary))) 50%,
                                                hsl(var(--primary)) 100%
                                            )`
                                        }}
                                    />
                                    
                                    {/* Background to create border effect */}
                                    <div className="absolute inset-[1px] rounded-full bg-background" />
                                    
                                    {/* Avatar */}
                                    <Avatar className="relative h-full w-full">
                                        <AvatarImage 
                                            src={user?.imageUrl} 
                                            alt={user?.fullName || "User avatar"}
                                            className="object-cover rounded-full"
                                        />
                                        <AvatarFallback className="bg-primary/5 text-primary">
                                            {user?.firstName?.charAt(0)}
                                        </AvatarFallback>
                                    </Avatar>
                                </div>
                                
                                {/* Level badge remains the same */}
                                <div className="absolute -bottom-2 -right-2 bg-gradient-to-r from-primary/20 to-primary-light/20 backdrop-blur-sm rounded-full p-[1px] group">
                                    <div className="relative bg-background/80 rounded-full px-3 py-1">
                                        <div className="text-xs font-semibold text-foreground flex items-center gap-1">
                                            <span className="relative">
                                                <span className="absolute -inset-1 bg-primary/20 blur-sm rounded-full animate-pulse"></span>
                                                <span className="relative">Lvl 1</span>
                                            </span>
                                        </div>
                                        {/* Sparkles animation */}
                                        <div className="absolute -inset-1 opacity-40">
                                            <div className="absolute inset-0 rotate-0 animate-[spin_4s_linear_infinite] bg-[conic-gradient(from_0deg,transparent_0_340deg,var(--primary)_360deg)]"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="flex-1 space-y-4">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <h2 className="text-2xl font-bold text-foreground">Level 1: Noob</h2>
                                        <p className="text-sm text-muted-foreground">Keep studying to level up!</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-sm font-medium">
                                            <span className="text-lg font-bold text-primary">{progress}</span>
                                            <span className="text-muted-foreground">/100 XP</span>
                                        </p>
                                    </div>
                                </div>
                                <div className="relative py-2">
                                    <div className="h-4 w-full bg-black/5 dark:bg-white/5 rounded-full overflow-hidden backdrop-blur-sm">
                                        {/* Background pattern */}
                                        <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(68,68,68,.2)_50%,transparent_75%,transparent_100%)] bg-[length:6px_6px] opacity-20" />
                                        
                                        {/* Progress bar */}
                                        <div 
                                            className="h-full bg-gradient-to-r from-primary/90 to-primary transition-all duration-700 ease-in-out rounded-full relative"
                                            style={{ width: `${progress}%` }}
                                        >
                                            {/* Smooth shine effect */}
                                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] animate-[smoothShine_2s_ease-in-out_infinite]" />
                                            
                                            {/* Subtle glow */}
                                            <div className="absolute inset-0 bg-primary/20 blur-sm" />
                                            
                                            {/* Progress indicator */}
                                            <div className="absolute right-0 top-1/2 -translate-y-1/2 h-3 w-3 rounded-full bg-white shadow-lg shadow-primary/30 border-2 border-primary transition-all duration-700" />
                                        </div>
                                    </div>
                                    
                                    <div className="mt-2 flex justify-between text-xs">
                                        <span className="text-muted-foreground font-medium">Current: 
                                            <span className="text-primary/80 ml-1">Noob</span>
                                        </span>
                                        <span className="text-muted-foreground font-medium">Next: 
                                            <span className="text-primary/80 ml-1">Beginner</span>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Card>
                </Container>

                {/* Analytics Chart */}
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5 mt-4">
                    <Container delay={0.2} className="col-span-2">
                        <StudyHeatmap />
                    </Container>

                    {/* Recent Activities */}
                    <Container delay={0.3} className="col-span-3">
                        <Leaderboard />
                    </Container>
                </div>
            </div>
        </div>
    )
}

export default Page
