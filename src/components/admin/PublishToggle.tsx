'use client';

interface PublishToggleProps {
  label?: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}

export function PublishToggle({ label = 'Published', checked, onChange }: PublishToggleProps) {
  return (
    <label className="flex items-center gap-3 cursor-pointer">
      <div className="relative">
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          className="sr-only"
        />
        <div className={`w-10 h-6 rounded-full transition-colors ${checked ? 'bg-green-500' : 'bg-gray-300'}`} />
        <div
          className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${
            checked ? 'translate-x-4' : ''
          }`}
        />
      </div>
      <span className="text-sm font-medium text-gray-700">{label}</span>
    </label>
  );
}
