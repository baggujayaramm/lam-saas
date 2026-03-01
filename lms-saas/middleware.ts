import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { verifyAccessToken } from '@/lib/auth'

export async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl

    // Define protected paths (anything starting with /dashboard)
    const isProtectedPath = pathname.startsWith('/dashboard')

    // Public marketing/auth paths
    const isAuthPath = pathname.startsWith('/login') || pathname.startsWith('/signup')

    const token = request.cookies.get('access_token')?.value

    if (isProtectedPath) {
        if (!token) {
            return NextResponse.redirect(new URL('/login', request.url))
        }

        const payload = await verifyAccessToken(token)

        if (!payload) {
            // Token exists but invalid/expired. We should ideally trigger a refresh, 
            // but in Next.js middleware it's common to clear the cookie and redirect to login, 
            // or let the client handle refresh via a wrapper.
            // For this phase, we redirect to login to force a new session if expired.
            const response = NextResponse.redirect(new URL('/login', request.url))
            response.cookies.delete('access_token')
            return response
        }

        // Attach user role and org info for downstream API routes / RSCs via headers
        const requestHeaders = new Headers(request.headers)
        requestHeaders.set('x-user-id', payload.userId)
        requestHeaders.set('x-organization-id', payload.organizationId)
        requestHeaders.set('x-user-role', payload.role)

        // Basic Role-based scoping
        if (pathname.startsWith('/dashboard/system-admin') && payload.role !== 'SYSTEM_ADMIN') {
            return NextResponse.redirect(new URL('/dashboard/org-admin', request.url))
        }
        if (pathname.startsWith('/dashboard/org-admin') && payload.role !== 'ORG_ADMIN' && payload.role !== 'SYSTEM_ADMIN') {
            return NextResponse.redirect(new URL('/login', request.url))
        }

        return NextResponse.next({
            request: {
                headers: requestHeaders,
            },
        })
    }

    // If user is already logged in, don't let them sit on login/signup pages
    if (isAuthPath && token) {
        const payload = await verifyAccessToken(token)
        if (payload) {
            return NextResponse.redirect(new URL(`/dashboard/${payload.role.toLowerCase().replace('_', '-')}`, request.url))
        }
    }

    return NextResponse.next()
}

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}
