import React, { useState } from 'react';
import cn from 'classnames';
import { CalendarDays, CircleX, Clock5, Eye, EyeClosed, Info } from 'lucide-react';


type Props = React.InputHTMLAttributes<HTMLInputElement> & {
    placeholder?: string;
    info?: string;
    icon?: React.ReactNode;
    label?: string;
    error?: string,
};

const Input = React.forwardRef<HTMLInputElement, Props>(
    ({ placeholder, type = 'text', icon, label, info, className, error, name, onChange, defaultValue, value, ...rest }, ref) => {
        const [showPassword, setShowPassword] = useState(false);
        const [showInfo, setShowInfo] = useState(false);

        const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            onChange?.(e);
        };

        const handleShowPassword = () => {
            setShowPassword(!showPassword);
        }

        return (
            <>
                {label && (
                    <label htmlFor={name} className="text-sm font-medium text-gray-700 dark:text-white flex items-center">
                        {label}
                        {info && (
                            <span
                                className="ml-2 cursor-pointer"
                                onMouseEnter={() => setShowInfo(true)}
                                onMouseLeave={() => setShowInfo(false)}
                                onClick={() => alert(info)}
                            >
                                <Info size={16} className="text-gray-500" />
                            </span>
                        )}
                        {showInfo && info && (
                            <div className="absolute bg-gray-200 dark:bg-slate-700 text-sm text-gray-700 dark:text-white rounded-md p-2 mt-1 max-w-100 z-50">
                                {info}
                            </div>
                        )}
                    </label>
                )}
                <div className="relative">
                    {icon && (
                        <div className='absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none'>
                            {icon}
                        </div>
                    )}
                    <input
                        ref={ref}
                        name={name}
                        className={cn(
                            className,
                            `w-full pr-4 py-4 bg-transparent rounded-2xl text-gray-800 dark:text-white placeholder-gray-400 transition-all border duration-300 focus:outline-none focus:ring-0 focus:shadow-lg appearance-none`,
                            type === 'password' && 'pr-12',
                            error ? 'border-red-300 focus:border-red-500' : 'border-gray-200 focus:border-rose-400',
                            icon ? 'pl-12' : 'pl-4',
                        )}
                        type={showPassword ? 'text' : type}
                        onChange={handleChange}
                        placeholder={placeholder}
                        defaultValue={defaultValue}
                        value={value || ''}
                        {...rest}
                    />
                    {type === 'password' && (
                        <button type='button' onClick={handleShowPassword} className='absolute right-3 top-1/2 -translate-y-1/2 p-1 transition-all duration-200 cursor-pointer text-slate-400 hover:border-slate-400 focus:outline-none text-sm'>
                            {showPassword ? <EyeClosed size={20} /> : <Eye size={20} />}
                        </button>
                    )}
                    {type === 'date' && (
                        <span className='absolute right-3 top-1/2 -translate-y-1/2 p-1 transition-all duration-200 text-slate-400 hover:border-slate-400 focus:outline-none text-sm cursor-pointer pointer-events-none'>
                            <CalendarDays />
                        </span>
                    )}
                    {type === 'time' && (
                        <span className='absolute right-3 top-1/2 -translate-y-1/2 p-1 transition-all duration-200 text-slate-400 hover:border-slate-400 focus:outline-none text-sm cursor-pointer pointer-events-none'>
                            <Clock5 />
                        </span>
                    )}
                </div>
                {error && (
                    <p className="mt-2 text-sm text-red-600 flex items-center">
                        <CircleX size={16} className="mr-1" />
                        {error}
                    </p>
                )}
            </>
        );
    }
);

Input.displayName = 'Input';
export default Input;