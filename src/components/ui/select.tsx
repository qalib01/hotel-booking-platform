interface Prop {
    icon?: React.ElementType;
    title?: string;
    value?: number;
    onChange: React.ChangeEventHandler<HTMLSelectElement>;
    options: any[];
    selectOption?: string;
    isConditional?: boolean;
    isRequired?: boolean;
    isDisabled?: boolean;
}

const Select = ({ icon: Icon, title, value, onChange, options, selectOption, isConditional, isRequired = true, isDisabled = false }: Prop) => {
    const selectElement = (
        <div className="relative group">
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                {Icon && <Icon className="w-4 h-4 text-blue-600" />}
                {title}
            </label>
            <select
                value={value}
                onChange={onChange}
                className="w-full px-4 w-full outline-none py-3.5 bg-gray-50 border-2 border-gray-200 rounded-xl disabled:bg-gray-400/20 disabled:cursor-not-allowed disabled:text-gray-500 focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 text-gray-800 font-medium appearance-none cursor-pointer hover:border-blue-300"
                required={isRequired}
                disabled={isDisabled}
            >
                <option value="">Select {title?.toLocaleLowerCase() || selectOption?.toLocaleLowerCase()}</option>
                {options.map(op => (
                    <option
                        key={op.id}
                        value={op.id}
                    > {op.name} </option>
                ))}
            </select>
        </div>
    )


    if (isConditional) {
        return null;
    }

    return selectElement;
}

export default Select;