import { NextResponse } from 'next/server'
import { SessionService } from '@/server/services/session.service'

export async function POST(req: Request) {
    try {
        const cookies = req.headers.get('cookie')
        if (cookies) {
            const match = cookies.match(/refresh_token=([^;]+)/)
            if (match) {
                const refreshTokenCookie = match[1]
                const [sessionId] = refreshTokenCookie.split(':')
                if (sessionId) {
                    await SessionService.revokeSession(sessionId)
                }
            }
        }
    } catch (e) {
        // ignore error on logout
    }

    const response = NextResponse.json({ success: true })

    // Clear cookies
    response.cookies.delete('access_token')
    response.cookies.delete('refresh_token')

    return response
}
