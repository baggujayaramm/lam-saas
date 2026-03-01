import { SignJWT, jwtVerify } from 'jose'

const JWT_SECRET = process.env.JWT_SECRET || 'fallback_secret_for_development'
const encodedSecret = new TextEncoder().encode(JWT_SECRET)

export interface AccessTokenPayload {
    userId: string;
    organizationId: string;
    role: string;
    tokenVersion: number;
}

export async function signAccessToken(payload: AccessTokenPayload): Promise<string> {
    return new SignJWT({ ...payload })
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .setExpirationTime('15m')
        .sign(encodedSecret)
}

export async function verifyAccessToken(token: string): Promise<AccessTokenPayload | null> {
    try {
        const { payload } = await jwtVerify(token, encodedSecret)
        return payload as unknown as AccessTokenPayload
    } catch (error) {
        return null
    }
}
