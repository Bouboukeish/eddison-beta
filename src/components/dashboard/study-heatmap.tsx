"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

export function StudyHeatmap() {
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth())
  
  return (
    <Card className="bg-card/95">
      <CardContent className="p-6">
        {/* Calendar header */}
        <div className="grid grid-cols-7 mb-4">
          {DAYS.map(day => (
            <div key={day} className="text-sm text-muted-foreground text-center">
              {day}
            </div>
          ))}
        </div>

        {/* Calendar grid */}
        <div className="grid grid-cols-7 gap-2">
          {Array.from({ length: 35 }).map((_, index) => (
            <TooltipProvider key={index}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div
                    className={cn(
                      "aspect-square rounded-md transition-all duration-200",
                      "bg-muted/30 hover:bg-muted/50",
                      "hover:scale-105 hover:shadow-lg hover:shadow-primary/5",
                      index === 15 && "bg-primary/60 hover:bg-primary/70",
                      index === 22 && "border-2 border-primary hover:border-primary/80",
                      "relative overflow-hidden group"
                    )}
                  >
                    {/* Shine effect */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-all duration-500" />
                  </div>
                </TooltipTrigger>
                <TooltipContent 
                  side="top" 
                  className="text-xs bg-card/95 backdrop-blur-sm border-border/50"
                >
                  <p className="font-medium">4.5 hours studied</p>
                  <p className="text-muted-foreground">{MONTHS[currentMonth]} {index + 1}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ))}
        </div>

        {/* Month navigation */}
        <div className="flex items-center justify-center gap-4 mt-6">
          <button 
            onClick={() => setCurrentMonth(prev => prev === 0 ? 11 : prev - 1)}
            className="p-1.5 rounded-md hover:bg-muted/50 transition-colors"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <span className="text-sm font-medium min-w-14 text-center">
            {MONTHS[currentMonth]}
          </span>
          <button 
            onClick={() => setCurrentMonth(prev => prev === 11 ? 0 : prev + 1)}
            className="p-1.5 rounded-md hover:bg-muted/50 transition-colors"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </CardContent>
    </Card>
  )
} 