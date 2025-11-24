interface Prop {
    icon: React.ElementType;
    label: string;
    type?: string;
    value?: string;
    isDisabled?: boolean;
    onChange: React.ChangeEventHandler<HTMLInputElement>;
    min?: string | number;
    max?: string | number;
    isConditional?: boolean;
    isRequired?: boolean;
}

const Input = ({ icon: Icon, label, type = 'text', value, isConditional, isDisabled = false, onChange, min, max, isRequired = true }: Prop) => {
    const inputElement = (
        <div className="relative group">
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                <Icon className="w-4 h-4 text-blue-600" />
                {label}
            </label>
            <input
                type={type}
                value={value}
                disabled={isDisabled}
                onChange={onChange}
                min={min}
                max={max}
                className="w-full px-4 py-3.5 outline-none bg-gray-50 cursor-pointer border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 text-gray-800 font-medium hover:border-blue-300"
                required={isRequired}
            />
        </div>
    )

    if (isConditional) {
        return null;
    }

    return inputElement;
}

export default Input;