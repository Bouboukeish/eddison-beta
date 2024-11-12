"use client";

import { SIDEBAR_LINKS } from "@/constants/links";
import { SearchIcon, Settings, LogOut, User, CreditCard } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Container from "../global/container";
import { Button, buttonVariants } from "../ui/button";
import { cn } from "@/functions";
import { useClerk, useUser } from "@clerk/nextjs";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const DashboardSidebar = () => {
    const { signOut } = useClerk();
    const { user } = useUser();
    const pathname = usePathname();

    const handleLogout = async () => {
        await signOut();
    };

    return (
        <div className="flex-col hidden lg:flex fixed left-0 top-16 bottom-0 z-50 bg-background border-r border-border/50 w-72">
            <div className={cn("flex flex-col size-full p-3")}>
                <Container delay={0.2} className="h-max">
                    <Button variant={"outline"} className="w-full justify-between px-2">
                        <span className="flex items-center gap-x-1 text-foreground/80">
                            <SearchIcon className="size-4" />
                            <span className="text-sm">Search...</span>
                        </span>
                        <span className="px-1 py-px text-xs rounded-sm bg-muted text-muted-foreground">⌘K</span>
                    </Button>
                </Container>
                
                {/* Navigation Links */}
                <ul className="w-full space-y-2 py-5">
                    {SIDEBAR_LINKS.map((link, index) => {

                        const isActive = pathname === link.href;

                        return (
                            <li key={index} className="w-full">
                                <Container delay={0.1 + index / 10}>
                                    <Link
                                        href={link.href}
                                        className={buttonVariants({
                                            variant: "ghost",
                                            className: isActive ? "bg-muted text-primary w-full !justify-start" : "text-foreground/70 w-full !justify-start",
                                        })}
                                    >
                                        <link.icon strokeWidth={2} className="size-[18px] mr-1.5" />
                                        {link.label}
                                    </Link>
                                </Container>
                            </li>
                        )
                    })}
                </ul>

                {/* Enhanced Profile Box */}
                <div className="mt-auto border-t border-border/50 pt-3">
                    <Container delay={0.3}>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button 
                                    variant="ghost" 
                                    className="w-full h-auto flex items-center justify-start gap-3 px-3 py-2 hover:bg-muted/50"
                                >
                                    <Avatar className="h-10 w-10 border-2 border-primary/10">
                                        <AvatarImage src={user?.imageUrl} />
                                        <AvatarFallback className="bg-primary/5 text-primary">
                                            {user?.firstName?.charAt(0)}
                                        </AvatarFallback>
                                    </Avatar>
                                    <div className="flex flex-col items-start">
                                        <p className="text-sm font-semibold text-foreground">
                                            {user?.fullName}
                                        </p>
                                        <p className="text-xs text-muted-foreground truncate max-w-[160px]">
                                            {user?.primaryEmailAddress?.emailAddress}
                                        </p>
                                    </div>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent 
                                className="w-64" 
                                align="end" 
                                alignOffset={-10}
                                forceMount
                            >
                                <DropdownMenuLabel className="font-normal">
                                    <div className="flex flex-col space-y-1">
                                        <p className="text-sm font-medium">{user?.fullName}</p>
                                        <p className="text-xs text-muted-foreground truncate">
                                            {user?.primaryEmailAddress?.emailAddress}
                                        </p>
                                    </div>
                                </DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem asChild>
                                    <Link href="/app/profile" className="cursor-pointer">
                                        <User className="mr-2 h-4 w-4" />
                                        Profile
                                    </Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem asChild>
                                    <Link href="/app/billing" className="cursor-pointer">
                                        <CreditCard className="mr-2 h-4 w-4" />
                                        Billing
                                    </Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem asChild>
                                    <Link href="/app/settings" className="cursor-pointer">
                                        <Settings className="mr-2 h-4 w-4" />
                                        Settings
                                    </Link>
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem 
                                    onClick={handleLogout} 
                                    className="text-red-600 focus:text-red-600 focus:bg-red-50 dark:focus:bg-red-950"
                                >
                                    <LogOut className="mr-2 h-4 w-4" />
                                    Log out
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </Container>
                </div>
            </div>
        </div>
    );
};

export default DashboardSidebar;
