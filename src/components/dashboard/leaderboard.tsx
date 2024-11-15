import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/functions/cn";
import { Medal } from "lucide-react";

const LEADERBOARD_DATA = [
    {
        id: 1,
        name: "Sarah Connor",
        xp: 2584,
        avatar: "/avatars/01.png",
        rank: 1,
        level: 5,
        title: "Expert"
    },
    {
        id: 2,
        name: "John Doe",
        xp: 2321,
        avatar: "/avatars/02.png",
        rank: 2,
        level: 4,
        title: "Advanced"
    },
    {
        id: 3,
        name: "Alice Smith",
        xp: 2154,
        avatar: "/avatars/03.png",
        rank: 3,
        level: 4,
        title: "Advanced"
    },
];

const Leaderboard = () => {
    return (
        <Card className="overflow-hidden">
            <CardHeader className="border-b border-border/5 bg-background/50">
                <div className="flex items-center justify-between">
                    <div className="space-y-1">
                        <CardTitle className="text-xl font-semibold">Top Students</CardTitle>
                        <p className="text-sm text-muted-foreground">Stanford University</p>
                    </div>
                    <div className="flex items-center gap-1.5">
                        <div className="relative">
                            <div className="absolute -inset-1 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 blur-sm rounded-full"></div>
                            <div className="relative bg-gradient-to-r from-yellow-500 to-orange-500 text-white p-2 rounded-full">
                                <Medal className="w-4 h-4" />
                            </div>
                        </div>
                    </div>
                </div>
            </CardHeader>
            <CardContent className="p-0">
                {LEADERBOARD_DATA.map((user, index) => (
                    <div 
                        key={user.id} 
                        className={cn(
                            "flex items-center justify-between p-4 hover:bg-muted/50 transition-colors",
                            index !== LEADERBOARD_DATA.length - 1 && "border-b border-border/5"
                        )}
                    >
                        <div className="flex items-center gap-4">
                            <div className={cn(
                                "flex items-center justify-center w-8 h-8 rounded-lg text-sm font-medium",
                                index === 0 && "bg-yellow-500/10 text-yellow-500",
                                index === 1 && "bg-zinc-500/10 text-zinc-500",
                                index === 2 && "bg-orange-500/10 text-orange-500",
                            )}>
                                #{user.rank}
                            </div>
                            <Avatar className="h-10 w-10">
                                <AvatarImage src={user.avatar} />
                                <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div>
                                <p className="text-sm font-medium leading-none mb-1">{user.name}</p>
                                <div className="flex items-center gap-2">
                                    <div className="flex items-center gap-1.5">
                                        <div className={cn(
                                            "w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-bold",
                                            index === 0 && "bg-yellow-500 text-yellow-50",
                                            index === 1 && "bg-zinc-500 text-zinc-50",
                                            index === 2 && "bg-orange-500 text-orange-50",
                                        )}>
                                            {user.level}
                                        </div>
                                        <span className="text-xs text-muted-foreground font-medium">
                                            {user.title}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center">
                            <div className={cn(
                                "px-3 py-1 rounded-full text-xs font-semibold",
                                index === 0 && "bg-yellow-500/10 text-yellow-500",
                                index === 1 && "bg-zinc-500/10 text-zinc-500",
                                index === 2 && "bg-orange-500/10 text-orange-500",
                            )}>
                                {user.xp.toLocaleString()} XP
                            </div>
                        </div>
                    </div>
                ))}
            </CardContent>
        </Card>
    );
};

export default Leaderboard; 