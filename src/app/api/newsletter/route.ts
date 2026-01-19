import { NextRequest, NextResponse } from 'next/server'
import { promises as fs } from 'fs'
import path from 'path'

interface NewsletterSignup {
  email: string
  createdAt: string
}

const DATA_FILE = path.join(process.cwd(), 'data', 'newsletter-signups.json')

async function readSignups(): Promise<NewsletterSignup[]> {
  try {
    const data = await fs.readFile(DATA_FILE, 'utf-8')
    return JSON.parse(data)
  } catch {
    return []
  }
}

async function writeSignups(signups: NewsletterSignup[]): Promise<void> {
  await fs.writeFile(DATA_FILE, JSON.stringify(signups, null, 2))
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email } = body

    // Validate email
    if (!email || typeof email !== 'string') {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      )
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      )
    }

    // Read existing signups
    const signups = await readSignups()

    // Check if email already exists
    if (signups.some((signup) => signup.email.toLowerCase() === email.toLowerCase())) {
      return NextResponse.json(
        { error: 'Email already subscribed' },
        { status: 409 }
      )
    }

    // Add new signup
    const newSignup: NewsletterSignup = {
      email: email.toLowerCase(),
      createdAt: new Date().toISOString(),
    }

    signups.push(newSignup)
    await writeSignups(signups)

    return NextResponse.json(
      { message: 'Successfully subscribed' },
      { status: 201 }
    )
  } catch (error) {
    console.error('Newsletter signup error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function GET() {
  // Optional: Get all signups (for admin purposes)
  // In production, this would be protected
  try {
    const signups = await readSignups()
    return NextResponse.json({ count: signups.length })
  } catch (error) {
    console.error('Newsletter fetch error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
