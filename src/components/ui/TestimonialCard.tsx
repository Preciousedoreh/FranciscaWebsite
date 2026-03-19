import { Testimonial } from '@/lib/types';

interface TestimonialCardProps {
  testimonial: Testimonial;
  variant?: 'default' | 'featured';
}

export function TestimonialCard({ testimonial, variant = 'default' }: TestimonialCardProps) {
  const bgColor = variant === 'featured' ? 'bg-white' : 'bg-navy-50';
  const textColor = variant === 'featured' ? 'text-charcoal' : 'text-navy-800';
  const clientImage = testimonial.clientPhoto || testimonial.clientImage;
  const hasRoleLine = testimonial.clientTitle || testimonial.clientCompany;

  return (
    <div className={`${bgColor} rounded-lg p-6 border-l-4 border-gold-400 shadow-md`}>
      <div className="text-gold-400 mb-4">
        <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 24 24">
          <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
        </svg>
      </div>

      <p className={`${textColor} italic text-lg leading-relaxed mb-6`}>
        {testimonial.quote}
      </p>

      <div className="border-t border-medium-gray pt-4">
        <div className="flex items-start gap-4">
          {clientImage && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={clientImage}
              alt={testimonial.clientName}
              className="h-14 w-14 rounded-full object-cover border border-medium-gray"
            />
          )}
          <div>
            <p className="font-semibold text-navy-600">{testimonial.clientName}</p>
            {hasRoleLine && (
              <p className="text-sm text-navy-500">
                {[testimonial.clientTitle, testimonial.clientCompany].filter(Boolean).join(', ')}
              </p>
            )}
          </div>
        </div>

        {testimonial.rating && (
          <div className="flex gap-1 mt-2">
            {[...Array(testimonial.rating)].map((_, i) => (
              <svg
                key={i}
                className="w-5 h-5 text-gold-400"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
        )}

        {testimonial.projectType && (
          <p className="text-xs text-navy-400 mt-2 uppercase tracking-wide">
            {testimonial.projectType}
          </p>
        )}
      </div>
    </div>
  );
}
