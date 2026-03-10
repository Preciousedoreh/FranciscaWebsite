'use client';

import { InputHTMLAttributes, SelectHTMLAttributes, TextareaHTMLAttributes } from 'react';

interface BaseProps {
  label: string;
  error?: string;
}

type InputProps = BaseProps & { type?: 'input' } & InputHTMLAttributes<HTMLInputElement>;
type SelectProps = BaseProps & { type: 'select'; options: { value: string; label: string }[] } & SelectHTMLAttributes<HTMLSelectElement>;
type TextareaProps = BaseProps & { type: 'textarea' } & TextareaHTMLAttributes<HTMLTextAreaElement>;

type FormFieldProps = InputProps | SelectProps | TextareaProps;

const baseClass = 'w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FFD11A] focus:border-transparent outline-none transition text-sm';

export function FormField(props: FormFieldProps) {
  const { label, error, type = 'input', ...rest } = props;

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      {type === 'textarea' ? (
        <textarea className={`${baseClass} min-h-[120px]`} {...(rest as TextareaHTMLAttributes<HTMLTextAreaElement>)} />
      ) : type === 'select' ? (
        <select className={baseClass} {...(rest as SelectHTMLAttributes<HTMLSelectElement>)}>
          <option value="">Select...</option>
          {(props as SelectProps).options.map((opt) => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
      ) : (
        <input className={baseClass} {...(rest as InputHTMLAttributes<HTMLInputElement>)} />
      )}
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
}
