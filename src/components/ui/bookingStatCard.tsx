interface ComponentProp {
    title: string;
    stat: string;
    icon: React.ElementType;
}

const BookingStatCard = ({ title, stat, icon: Icon }: ComponentProp) => {
    return (
        <div className="flex items-center gap-3">
            <div className="w-14 h-14 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/30">
                <Icon className="w-7 h-7 text-white" />
            </div>
            <div>
                <div className="text-3xl font-bold">{stat}</div>
                <div className="text-white text-sm">{title}</div>
            </div>
        </div>
    )
}

export default BookingStatCard;