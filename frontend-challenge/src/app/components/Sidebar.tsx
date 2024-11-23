import Link from "next/link";

const Sidebar = () => {
    const links = [
        { href: "/", label: "Home" },
        { href: "/people", label: "People" },
        { href: "/planets", label: "Planets" },
        { href: "/films", label: "Films" },
        { href: "/species", label: "Species" },
        { href: "/starships", label: "Starships" },
        { href: "/vehicles", label: "Vehicles" },
    ];

    return (
        <nav className="w-64 h-full bg-gray-800 text-white">
            <ul className="p-4 space-y-2">
                {links.map((link) => (
                    <li key={link.href}>
                        <Link href={link.href} className="block p-2 hover:bg-gray-700 rounded">
                            {link.label}
                        </Link>
                    </li>
                ))}
            </ul>
        </nav>
    );
};

export default Sidebar;
