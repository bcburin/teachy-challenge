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
        <nav className="w-64 h-screen bg-gray-800 text-gray-100 ">
            <ul className="space-y-1">
                {links.map((link) => (
                    <li key={link.href} className="group">
                        <Link
                            href={link.href}
                            className="block px-6 py-4 hover:bg-gray-700 transition-colors font-medium uppercase tracking-wider"
                        >
                            {link.label}
                        </Link>
                    </li>
                ))}
            </ul>
        </nav>
    );
};

export default Sidebar;
