import { NextResponse } from 'next/server';

export const runtime = 'nodejs';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
const MAX_PHOTO_SIZE_BYTES = 10 * 1024 * 1024;

async function parseErrorMessage(response: Response) {
  const data = await response.json().catch(() => null);
  return data?.message || `Request failed with status ${response.status}`;
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const name = String(formData.get('name') || '').trim();
    const title = String(formData.get('title') || '').trim();
    const company = String(formData.get('company') || '').trim();
    const quote = String(formData.get('quote') || '').trim();
    const photo = formData.get('photo');

    if (!name || !quote) {
      return NextResponse.json(
        { message: 'Name and testimonial are required.' },
        { status: 400 }
      );
    }

    if (photo && !(photo instanceof File)) {
      return NextResponse.json(
        { message: 'Invalid photo upload.' },
        { status: 400 }
      );
    }

    if (photo instanceof File && photo.size > MAX_PHOTO_SIZE_BYTES) {
      return NextResponse.json(
        { message: 'Photo must be 10 MB or smaller.' },
        { status: 400 }
      );
    }

    if (photo instanceof File && photo.size > 0 && !photo.type.startsWith('image/')) {
      return NextResponse.json(
        { message: 'Photo must be an image file.' },
        { status: 400 }
      );
    }

    const payload = new FormData();
    payload.append('clientName', name);
    payload.append('clientTitle', title);
    payload.append('clientCompany', company);
    payload.append('quote', quote);

    if (photo instanceof File && photo.size > 0) {
      payload.append('clientImage', photo);
    }

    const response = await fetch(`${API_URL}/testimonials/submissions`, {
      method: 'POST',
      body: payload,
    });

    if (!response.ok) {
      return NextResponse.json(
        { message: await parseErrorMessage(response) },
        { status: response.status }
      );
    }

    return NextResponse.json({
      message: 'Testimonial submitted successfully.',
    });
  } catch {
    return NextResponse.json(
      { message: 'Unable to process testimonial submission.' },
      { status: 500 }
    );
  }
}
