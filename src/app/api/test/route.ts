import { connectDB } from '@/lib/database';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const sql = await connectDB();
    const result = await sql.query('SELECT 1 as test');
    
    return NextResponse.json({ 
      success: true, 
      message: 'Database connected!',
      data: result.recordset 
    });
  } catch (error) {
    return NextResponse.json({ 
      success: false, 
      error: 'Connection failed',
      details: error 
    }, { status: 500 });
  }
}