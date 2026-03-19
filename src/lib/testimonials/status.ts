import { Testimonial } from '@/lib/types';

type TestimonialLike = Pick<Testimonial, 'published' | 'status'>;

export function getTestimonialStatus(testimonial: TestimonialLike) {
  if (testimonial.status) {
    return testimonial.status;
  }

  return testimonial.published ? 'published' : 'pending';
}

export function isPublishedTestimonial(testimonial: TestimonialLike) {
  return getTestimonialStatus(testimonial) === 'published';
}
