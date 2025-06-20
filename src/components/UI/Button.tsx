import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

type ButtonProps = {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  to?: string;
  href?: string;
  type?: 'button' | 'submit' | 'reset';
  onClick?: () => void;
  fullWidth?: boolean;
  className?: string;
  ariaLabel?: string;
  disabled?: boolean;
};

const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  to,
  href,
  type = 'button',
  onClick,
  fullWidth = false,
  className = '',
  ariaLabel,
  disabled = false,
}: ButtonProps) => {
  const baseStyles =
    'inline-flex items-center justify-center rounded-md font-medium transition-all focus:outline-none';

  const variantStyles = {
    primary:
      'bg-red-600 text-white hover:bg-red-700 active:bg-red-800 shadow-sm dark:bg-red-700 dark:hover:bg-red-600',
    secondary:
      'bg-gold text-gray-900 hover:bg-amber-500 active:bg-amber-600 shadow-sm',
    outline:
      'border border-gray-300 dark:border-gray-700 bg-transparent text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 active:bg-gray-200 dark:active:bg-gray-700',
    ghost:
      'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 active:bg-gray-200 dark:active:bg-gray-700',
  };

  const sizeStyles = {
    sm: 'text-xs px-3 py-1.5',
    md: 'text-sm px-4 py-2',
    lg: 'text-base px-6 py-3',
  };

  const disabledStyles = disabled
    ? 'opacity-50 cursor-not-allowed'
    : 'cursor-pointer';

  const widthStyles = fullWidth ? 'w-full' : '';

  const combinedClassName = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${widthStyles} ${disabledStyles} ${className}`;

  const motionProps = {
    whileHover: disabled ? {} : { scale: 1.02 },
    whileTap: disabled ? {} : { scale: 0.98 },
    transition: { duration: 0.2 },
  };

  const ButtonElement = ({
    className,
    onClick,
    disabled,
  }: React.ButtonHTMLAttributes<HTMLButtonElement>) => (
    <motion.button
      {...motionProps}
      type={type}
      aria-label={ariaLabel}
      onClick={onClick}
      className={className}
      disabled={disabled}
    >
      {children}
    </motion.button>
  );

  if (to) {
    return (
      <motion.div {...motionProps}>
        <Link to={to} className={combinedClassName} aria-label={ariaLabel}>
          {children}
        </Link>
      </motion.div>
    );
  }

  if (href) {
    return (
      <motion.a
        {...motionProps}
        href={href}
        className={combinedClassName}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={ariaLabel}
      >
        {children}
      </motion.a>
    );
  }

  return (
    <ButtonElement
      className={combinedClassName}
      onClick={onClick}
      disabled={disabled}
    />
  );
};

export default Button;
