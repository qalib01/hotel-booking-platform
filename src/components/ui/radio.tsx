"use client"

import cn from "classnames";

interface Prop {
    name: string;
    isChecked: boolean;
    onChange: React.ChangeEventHandler<HTMLInputElement>;
    value: string;
    title: string;
    description?: string;
    isConditional?: boolean;
}

const Radio = ({ name, isChecked, onChange, value, title, description, isConditional }: Prop) => {
    const radioElement = (
        <label className={cn(
            "flex items-center justify-between px-4 py-3.5 bg-gray-50 border-2 rounded-xl cursor-pointer transition-all duration-300 shadow-md hover:border-blue-300",
            {
                "border-blue-500": isChecked,
                "border-gray-200": !isChecked,
            },
        )}>
            <div className="flex items-center gap-3">
                <div className={cn(
                    "w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all duration-300",
                    {
                        "border-blue-500 bg-blue-500": isChecked,
                        "border-gray-300": !isChecked
                    },
                )}>
                    {isChecked && (
                        <div className="w-2 h-2 bg-white rounded-full"></div>
                    )}
                </div>
                <input
                    type="radio"
                    name={name}
                    value={value}
                    checked={isChecked}
                    onChange={onChange}
                    className="hidden"
                />
                <div>
                    <span className="font-semibold text-gray-800">{title}</span>
                    <p className="text-xs text-gray-600">{description}</p>
                </div>
            </div>
        </label>
    )

    if (isConditional) {
        return null;
    }

    return radioElement;
}

export default Radio;