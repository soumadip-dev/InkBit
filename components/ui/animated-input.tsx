import { motion } from 'motion/react';
import { useRef, useState, useId } from 'react';

const EASE_IN_OUT_CUBIC_X1 = 0.4;
const EASE_IN_OUT_CUBIC_Y1 = 0;
const EASE_IN_OUT_CUBIC_X2 = 0.2;
const EASE_IN_OUT_CUBIC_Y2 = 1;

const LABEL_TRANSITION = {
  duration: 0.28,
  ease: [EASE_IN_OUT_CUBIC_X1, EASE_IN_OUT_CUBIC_Y1, EASE_IN_OUT_CUBIC_X2, EASE_IN_OUT_CUBIC_Y2], // standard material easing
};

export type AnimatedInputProps = {
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  onBlur?: () => void;
  label: string;
  placeholder?: string;
  disabled?: boolean;
  type?: string;
  className?: string;
  inputClassName?: string;
  labelClassName?: string;
  icon?: React.ReactNode;
};

export default function AnimatedInput({
  value,
  defaultValue = '',
  onChange,
  onBlur,
  label,
  placeholder = '',
  disabled = false,
  type = 'text',
  className = '',
  inputClassName = '',
  labelClassName = '',
  icon,
}: AnimatedInputProps) {
  const [internalValue, setInternalValue] = useState(defaultValue);
  const isControlled = value !== undefined;
  const val = isControlled ? value : internalValue;
  const inputRef = useRef<HTMLInputElement>(null);
  const [isFocused, setIsFocused] = useState(false);
  const isFloating = !!val || isFocused;

  // Use useId for stable ID generation during SSR and client hydration
  const id = useId();
  const inputId = `animated-input-${id.replace(/:/g, '')}`;

  const handleBlur = () => {
    setIsFocused(false);
    onBlur?.();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!isControlled) {
      setInternalValue(e.target.value);
    }
    onChange?.(e.target.value);
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  return (
    <div className={`relative flex items-center ${className}`}>
      {icon && <span className="-translate-y-1/2 absolute top-1/2 left-3">{icon}</span>}
      <input
        className={`peer w-full rounded-sm border bg-background px-3 py-2 text-sm outline-none transition focus:ring-1 focus:ring-primary ${icon ? 'pl-10' : ''} ${inputClassName}`}
        disabled={disabled}
        id={inputId}
        onBlur={handleBlur}
        onChange={handleChange}
        onFocus={handleFocus}
        placeholder={isFloating ? placeholder : ''}
        ref={inputRef}
        type={type}
        value={val}
      />
      <motion.label
        animate={
          isFloating
            ? {
                y: -24,
                scale: 0.85,
                color: 'var(--color-brand)',
                borderColor: 'var(--color-brand)',
              }
            : { y: 0, scale: 1, color: '#6b7280' }
        }
        className={`-translate-y-1/2 pointer-events-none absolute top-1/2 left-3 origin-left rounded-sm border border-transparent bg-background px-1 text-foreground transition-all ${labelClassName}`}
        htmlFor={inputId}
        style={{
          zIndex: 2,
        }}
        transition={LABEL_TRANSITION}
      >
        {label}
      </motion.label>
    </div>
  );
}
