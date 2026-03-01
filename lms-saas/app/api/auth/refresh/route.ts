import { NextResponse } from 'next/server'
import { SessionService } from '@/server/services/session.service'
import { signAccessToken } from '@/lib/auth'

export async function POST(req: Request) {
    try {
        const cookies = req.headers.get('cookie')
        if (!cookies) return NextResponse.json({ error: 'No cookies' }, { status: 401 })

        // Quick regex to grab refresh_token from cookie header string
        const match = cookies.match(/refresh_token=([^;]+)/)
        if (!match) return NextResponse.json({ error: 'No refresh token' }, { status: 401 })

        const refreshTokenCookie = match[1]
        const [sessionId, refreshToken] = refreshTokenCookie.split(':')

        if (!sessionId || !refreshToken) {
            return NextResponse.json({ error: 'Invalid refresh token format' }, { status: 401 })
        }

        const { newRefreshToken, session } = await SessionService.rotateRefreshToken(refreshToken, sessionId)

        // Mint new access token
        const accessToken = await signAccessToken({
            userId: session.user.id,
            organizationId: session.organizationId,
            // For a real production app we might need to fetch the roles again here or store them on the Session securely
            role: 'ORG_ADMIN', // Keeping simple for Phase 1. Real ideally pulls from memberships.
            tokenVersion: 1
        })

        const response = NextResponse.json({ success: true })

        response.cookies.set({
            name: 'access_token',
            value: accessToken,
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            path: '/'
        })

        response.cookies.set({
            name: 'refresh_token',
            value: `${session.id}:${newRefreshToken}`,
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            path: '/'
        })

        return response

    } catch (error: any) {
        return NextResponse.json({ error: error.message || 'Error refreshing token' }, { status: 401 })
    }
}
