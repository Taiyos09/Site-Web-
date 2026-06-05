import { cookies } from 'next/headers'
import { randomBytes } from 'crypto'

export function generateCSRFToken(): string {
  return randomBytes(32).toString('hex')
}

export async function setCSRFCookie(token: string): Promise<void> {
  const cookieStore = await cookies()
  cookieStore.set('csrf_token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    path: '/',
    maxAge: 60 * 60 * 24,
  })
}

export async function getCSRFCookie(): Promise<string | undefined> {
  const cookieStore = await cookies()
  return cookieStore.get('csrf_token')?.value
}

export async function validateCSRFToken(token: string | undefined): Promise<boolean> {
  const cookieToken = await getCSRFCookie()
  if (!cookieToken || !token) {
    return false
  }
  return token === cookieToken
}
