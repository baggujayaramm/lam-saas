import { NextResponse } from 'next/server'
import { OrganizationService } from '@/server/services/organization.service'
import { AuthService } from '@/server/services/auth.service'
import { SessionService } from '@/server/services/session.service'
import { signAccessToken } from '@/lib/auth'
import z from 'zod'

const signupSchema = z.object({
    organizationName: z.string().min(2),
    email: z.string().email(),
    password: z.string().min(8)
})

export async function POST(req: Request) {
    try {
        const body = await req.json()
        const parsed = signupSchema.safeParse(body)

        if (!parsed.success) {
            return NextResponse.json({ error: 'Invalid input' }, { status: 400 })
        }

        const { organizationName, email, password } = parsed.data

        const passwordHash = await AuthService.hashPassword(password)

        // Transaction to create Org, User, Membership, Subscription
        const { user, org } = await OrganizationService.createOrganizationWithTrial(
            organizationName,
            email,
            passwordHash
        )

        // Log the user in
        const ipAddress = req.headers.get('x-forwarded-for') || 'unknown'
        const deviceInfo = req.headers.get('user-agent') || 'unknown'

        const { session, refreshToken } = await SessionService.createSession(
            user.id,
            org.id,
            ipAddress,
            deviceInfo
        )

        const accessToken = await signAccessToken({
            userId: user.id,
            organizationId: org.id,
            role: 'ORG_ADMIN',
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
            value: `${session.id}:${refreshToken}`, // store session id alongside token
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            path: '/'
        })

        return response

    } catch (error: any) {
        if (error.code === 'P2002') {
            return NextResponse.json({ error: 'Organization name or email already in use.' }, { status: 409 })
        }
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
    }
}
