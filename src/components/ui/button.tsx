"use client"

import cn from 'classnames';
import React from 'react';


interface Prop {
    label?: string;
    type?: 'button' | 'submit';
    onClick?: () => void;
    isLoading?: boolean;
    disabled?: boolean;
    baseColor?: 'gray' | 'blue';
    icon?: React.ElementType;
    isConditional?: boolean;
}

const ActionButton = ({
    label,
    type = 'button',
    onClick,
    isLoading,
    disabled,
    baseColor = 'gray',
    icon: Icon,
    isConditional,
}: Prop) => {
    const colorClasses = {
        gray: {
            from: 'from-gray-600',
            to: 'to-gray-800',
            hoverFrom: 'hover:from-gray-700',
            hoverTo: 'hover:to-gray-600',
            shadow: 'hover:shadow-gray-500/50'
        },
        blue: {
            from: 'from-blue-600',
            via: 'via-blue-500',
            to: 'to-blue-800',
            hoverFrom: 'hover:from-blue-700',
            hoverTo: 'hover:to-blue-600',
            shadow: 'hover:shadow-blue-500/50'
        }
    } as Record<string, {
        from: string;
        to: string;
        via?: string;
        hoverFrom: string;
        hoverTo: string;
        shadow: string;
    }>;
    const currentColors = colorClasses[disabled ? 'gray' : baseColor];
    const gradientClass = `bg-gradient-to-br ${currentColors.from} ${currentColors.to} ${currentColors.via ? currentColors.via : ''}`;
    const hoverClass = `${currentColors.hoverFrom} ${currentColors.hoverTo} ${currentColors.shadow}`;

    const buttonElement = (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled || isLoading}
            className={cn(
                'w-full mt-4 hover:shadow-2xl text-white py-4 rounded-xl font-bold text-lg transition-all duration-300 shadow-xl flex items-center justify-center gap-3 group relative overflow-hidden',
                { 'from-gray-400 to-gray-500 cursor-not-allowed': disabled },
                { 'cursor-not-allowed': isLoading },
                { 'cursor-pointer': !disabled },
                gradientClass, hoverClass
            )}
        >
            <span className="relative z-10 flex items-center gap-3">
                {Icon && <Icon className="w-5 h-5 group-hover:scale-110 transition-transform" />}
                {label}
            </span>
            <div className="absolute inset-0 animate-shimmer opacity-0 group-hover:opacity-100 transition-opacity"></div>
        </button>
    );

    if (isConditional) {
        return null;
    }

    return buttonElement;
};

export default ActionButton;