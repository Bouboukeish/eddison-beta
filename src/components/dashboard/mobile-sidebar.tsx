"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import {
    Sheet,
    SheetContent,
    SheetTrigger,
} from "@/components/ui/sheet";
import { SIDEBAR_LINKS } from "@/constants/links";
import { useClerk, useUser } from "@clerk/nextjs";
import { CreditCard, LogOut, MenuIcon, SearchIcon, Settings, User } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const MobileSidebar = () => {
    const { signOut } = useClerk();
    const { user } = useUser();
    const pathname = usePathname();

    const handleLogout = async () => {
        await signOut();
    };

    return (
        <div className="flex lg:hidden">
            <Sheet>
                <SheetTrigger asChild>
                    <Button
                        size="icon"
                        variant="ghost"
                        className="flex lg:hidden"
                    >
                        <MenuIcon className="size-5" />
                    </Button>
                </SheetTrigger>
                <SheetContent className="w-screen max-w-full">
                    <div className="flex flex-col w-full mt-10 py-3 h-full">
                        <Button
                            variant="outline"
                            className="w-full justify-start gap-2 px-2"
                        >
                            <SearchIcon className="size-4" />
                            <span className="text-sm">
                                Search...
                            </span>
                        </Button>
                        <ul className="w-full space-y-2 py-5">
                            {SIDEBAR_LINKS.map((link, index) => {
                                const isActive = pathname === link.href;
                                return (
                                    <li key={index} className="w-full">
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
                                    </li>
                                )
                            })}
                        </ul>

                        {/* Profile Section */}
                        <div className="mt-auto border-t border-border/50 pt-3">
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
                                >
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
                        </div>
                    </div>
                </SheetContent>
            </Sheet>
        </div>
    );
};

export default MobileSidebar;
