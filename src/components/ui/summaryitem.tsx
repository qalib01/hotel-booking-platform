interface Prop {
    icon: React.ElementType;
    title: string;
    value?: string;
    children?: any;
}

const SummaryItem = ({ icon: Icon, title, value, children }: Prop) => {
    return (
        <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 text-lg font-semibold text-gray-700">
                <Icon className="w-5 h-5 text-blue-600" />
                {title}:
            </div>
            <p className="text-lg font-semibold text-gray-700"> {value || children} </p>
        </div>
    )
}

export default SummaryItem;