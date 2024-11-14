import { LayoutDashboard, Plus, Library, Compass, FolderIcon, LucideIcon } from "lucide-react"

type Link = {
    href: string;
    label: string;
    icon: LucideIcon;
}

type Folder = {
    id: string;
    name: string;
    color?: string;
}

export const SIDEBAR_LINKS: Link[] = [
    {
        label: "Dashboard",
        icon: LayoutDashboard,
        href: "/dashboard",
    },
    {
        label: "New Deck",
        icon: Plus,
        href: "/dashboard/new-deck",
    },
    {
        label: "My Decks",
        icon: Library,
        href: "/dashboard/my-decks",
    },
    {
        label: "Explore",
        icon: Compass,
        href: "/dashboard/explore",
    },
]

// Mock folders (later will come from database)
export const FOLDERS: Folder[] = [
    { id: '1', name: 'Mathematics', color: '#FF5733' },
    { id: '2', name: 'Physics', color: '#33FF57' },
    { id: '3', name: 'Computer Science', color: '#3357FF' },
]

export const FOOTER_LINKS = [
    {
        title: "Product",
        links: [
            { name: "Home", href: "/" },
            { name: "Features", href: "/" },
            { name: "Pricing", href: "/" },
            { name: "Contact", href: "/" },
            { name: "Download", href: "/" },
        ],
    },
    {
        title: "Resources",
        links: [
            { name: "Blog", href: "/blog" },
            { name: "Help Center", href: "/help-center" },
            { name: "Community", href: "/community" },
            { name: "Guides", href: "/guides" },
        ],
    },
    {
        title: "Legal",
        links: [
            { name: "Privacy", href: "/privacy" },
            { name: "Terms", href: "/terms" },
            { name: "Cookies", href: "/cookies" },
        ],
    },
    {
        title: "Developers",
        links: [
            { name: "API Docs", href: "/api-docs" },
            { name: "SDKs", href: "/sdks" },
            { name: "Tools", href: "/tools" },
            { name: "Open Source", href: "/open-source" },
            { name: "Changelog", href: "/changelog" },
        ],
    },
];
