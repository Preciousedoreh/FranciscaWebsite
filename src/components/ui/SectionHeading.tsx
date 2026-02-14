interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  alignment?: 'left' | 'center';
  showAccent?: boolean;
}

export function SectionHeading({
  title,
  subtitle,
  alignment = 'center',
  showAccent = true,
}: SectionHeadingProps) {
  const alignmentClasses = {
    left: 'text-left',
    center: 'text-center',
  };

  return (
    <div className={`mb-12 ${alignmentClasses[alignment]}`}>
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-navy-600 mb-4">
        {title}
      </h2>
      {showAccent && (
        <div
          className={`w-20 h-1 bg-gold-400 mb-6 ${
            alignment === 'center' ? 'mx-auto' : ''
          }`}
        />
      )}
      {subtitle && (
        <p className="text-lg md:text-xl text-charcoal max-w-2xl ${alignment === 'center' ? 'mx-auto' : ''}">
          {subtitle}
        </p>
      )}
    </div>
  );
}
