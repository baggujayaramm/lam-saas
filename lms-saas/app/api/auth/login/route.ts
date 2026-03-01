import { NextResponse } from 'next/server'
import { AuthService } from '@/server/services/auth.service'
import { SessionService } from '@/server/services/session.service'
import { signAccessToken } from '@/lib/auth'
import prisma from '@/lib/prisma'
import z from 'zod'

const loginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(1)
})

export async function POST(req: Request) {
    try {
        const body = await req.json()
        const parsed = loginSchema.safeParse(body)

        if (!parsed.success) {
            return NextResponse.json({ error: 'Invalid input' }, { status: 400 })
        }

        const { email, password } = parsed.data

        const user = await prisma.user.findUnique({
            where: { email },
            include: { memberships: true }
        })

        if (!user) {
            return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
        }

        const isPasswordValid = await AuthService.verifyPassword(password, user.passwordHash)
        if (!isPasswordValid) {
            return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
        }

        const userContext = await AuthService.getUserContext(user.id)
        if (!userContext) {
            return NextResponse.json({ error: 'User context not found' }, { status: 400 })
        }

        const ipAddress = req.headers.get('x-forwarded-for') || 'unknown'
        const deviceInfo = req.headers.get('user-agent') || 'unknown'

        const { session, refreshToken } = await SessionService.createSession(
            user.id,
            userContext.organizationId,
            ipAddress,
            deviceInfo
        )

        const accessToken = await signAccessToken({
            userId: userContext.userId,
            organizationId: userContext.organizationId,
            role: userContext.role,
            tokenVersion: userContext.tokenVersion
        })

        const response = NextResponse.json({ success: true, redirectUrl: `/dashboard/${userContext.role.toLowerCase().replace('_', '-')}` })

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
            value: `${session.id}:${refreshToken}`,
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            path: '/'
        })

        return response

    } catch (error) {
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
    }
}
