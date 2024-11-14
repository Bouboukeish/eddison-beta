"use client";

import { SIDEBAR_LINKS, FOLDERS } from "@/constants/links";
import { SearchIcon, Settings, LogOut, User, CreditCard, FolderIcon, Plus, BookOpen, Code, Calculator, Atom, Palette } from "lucide-react";
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

const folderIcons: Record<string, any> = {
    'Mathematics': Calculator,
    'Physics': Atom,
    'Computer Science': Code,
    'default': BookOpen,
};

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

                <div className="space-y-1">
                    <div className="flex items-center justify-between px-3 py-2">
                        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                            Folders
                        </p>
                        <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-5 w-5 text-muted-foreground hover:text-primary"
                        >
                            <Plus className="h-3 w-3" />
                        </Button>
                    </div>
                    <ul className="space-y-0.5 px-2">
                        {FOLDERS.map((folder) => (
                            <li key={folder.id}>
                                <Container delay={0.1}>
                                    <Link
                                        href={`/dashboard/folders/${folder.id}`}
                                        className={buttonVariants({
                                            variant: "ghost",
                                            size: "sm",
                                            className: cn(
                                                "w-full !justify-start py-1.5 group relative",
                                                pathname === `/dashboard/folders/${folder.id}` 
                                                    ? "bg-muted font-medium" 
                                                    : "text-muted-foreground hover:text-foreground"
                                            ),
                                        })}
                                    >
                                        <div className="flex items-center gap-2">
                                            <svg 
                                                width="16" 
                                                height="16" 
                                                viewBox="0 0 24 24"
                                                className={cn(
                                                    "transition-all duration-300",
                                                    pathname === `/dashboard/folders/${folder.id}`
                                                        ? "text-foreground"
                                                        : "text-muted-foreground"
                                                )}
                                            >
                                                <path 
                                                    d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                                                    fill="currentColor"
                                                />
                                            </svg>
                                            <span className="text-sm">{folder.name}</span>
                                        </div>
                                    </Link>
                                </Container>
                            </li>
                        ))}
                    </ul>
                </div>

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
                                    <Link href="/dashboard/profile" className="cursor-pointer">
                                        <User className="mr-2 h-4 w-4" />
                                        Profile
                                    </Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem asChild>
                                    <Link href="/dashboard/billing" className="cursor-pointer">
                                        <CreditCard className="mr-2 h-4 w-4" />
                                        Billing
                                    </Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem asChild>
                                    <Link href="/dashboard/settings" className="cursor-pointer">
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
