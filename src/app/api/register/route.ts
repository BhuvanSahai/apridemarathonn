import { NextResponse } from 'next/server';
import { FullRegistrationSchema } from '@/lib/registration-schema';
import { EVENT_CONFIG } from '@/lib/event-config';

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // 1. Server-side validation with Zod
    const validation = FullRegistrationSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        {
          success: false,
          errors: validation.error.flatten().fieldErrors,
          message: 'Validation failed. Please review your details.',
        },
        { status: 400 }
      );
    }

    const registrationData = validation.data;
    const selectedCategory = EVENT_CONFIG.categories.find(
      (c) => c.code === registrationData.category
    );

    // 2. Generate unique booking reference
    const timestamp = Date.now().toString(36).toUpperCase();
    const randomHex = Math.random().toString(36).substring(2, 6).toUpperCase();
    const bookingId = `PRIDE-${registrationData.category.toUpperCase()}-${timestamp}-${randomHex}`;

    // 3. Log registration details (Mock persistence)
    console.log('--------------------------------------------------');
    console.log(`[MARATHON REGISTRATION LOG] Booking: ${bookingId}`);
    console.log(`Athlete: ${registrationData.fullName} (${registrationData.email})`);
    console.log(`Category: ${selectedCategory?.name} | Bib Name: "${registrationData.bibName}"`);
    console.log(`Fee: ${selectedCategory?.price}`);
    console.log('--------------------------------------------------');

    /* 
      ==========================================================================
      CONNECT SUPABASE / DATABASE HERE WHEN READY
      ==========================================================================
      Example:
      const { data, error } = await supabase.from('registrations').insert({
        booking_id: bookingId,
        full_name: registrationData.fullName,
        email: registrationData.email,
        phone: registrationData.phone,
        gender: registrationData.gender,
        dob: registrationData.dob,
        city: registrationData.city,
        category: registrationData.category,
        tshirt_size: registrationData.tShirtSize,
        bib_name: registrationData.bibName,
        emergency_contact_name: registrationData.emergencyContactName,
        emergency_contact_phone: registrationData.emergencyContactPhone,
        medical_notes: registrationData.medicalNotes,
        amount_paid: selectedCategory?.priceNum,
        status: 'confirmed',
        created_at: new Date().toISOString(),
      });
      ==========================================================================
    */

    return NextResponse.json(
      {
        success: true,
        bookingId,
        message: 'Registration confirmed successfully!',
        details: {
          bookingId,
          athlete: registrationData.fullName,
          categoryName: selectedCategory?.name ?? registrationData.category,
          bibName: registrationData.bibName,
          tShirtSize: registrationData.tShirtSize,
          reportingTime: EVENT_CONFIG.reportingTime,
          venue: EVENT_CONFIG.venue,
          date: EVENT_CONFIG.date,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Registration API Error:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'An unexpected server error occurred. Please try again.',
      },
      { status: 500 }
    );
  }
}
