import { mainMenuItems } from "@/src/data/map"
import Link from "next/link"

export const Header = () => {
    return (
        <header className="shadow-md">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">
                    <Link
                        href="/"
                        className="text-2xl font-bold"
                    > HBS </Link>
                    <nav className="flex items-center gap-2">
                        {mainMenuItems.map((item, idx) => (
                            <a
                                key={idx}
                                href={item.href}
                                className="px-4 py-2 font-medium transition-colors rounded-lg"
                            >
                                {item.name}
                            </a>
                        ))}
                    </nav>
                    <div className="flex items-center gap-2">
                        <Link
                            href="/auth"
                            className="flex items-center justify-center gap-2 w-full px-4 py-2 rounded-4xl bg-gray-400 font-semibold hover:scale-105 transition-all"
                        >
                            Book now
                        </Link>
                    </div>
                </div>
            </div>
        </header>
    )
}