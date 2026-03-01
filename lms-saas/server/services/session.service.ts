import prisma from '@/lib/prisma'
import { randomBytes } from 'crypto'
import bcrypt from 'bcrypt'

export class SessionService {
    static async createSession(
        userId: string,
        organizationId: string,
        ipAddress?: string,
        deviceInfo?: string
    ) {
        // Generate a fresh refresh token
        const refreshToken = randomBytes(40).toString('hex')
        const refreshTokenHash = await bcrypt.hash(refreshToken, 10)

        const session = await prisma.session.create({
            data: {
                userId,
                organizationId,
                ipAddress,
                deviceInfo,
                refreshTokenHash,
            },
        })

        return { session, refreshToken }
    }

    static async revokeSession(sessionId: string) {
        await prisma.session.update({
            where: { id: sessionId },
            data: { revoked: true },
        })
    }

    static async rotateRefreshToken(oldRefreshToken: string, sessionId: string) {
        const session = await prisma.session.findUnique({
            where: { id: sessionId },
            include: { user: true }
        })

        if (!session || session.revoked) {
            throw new Error('Invalid or revoked session')
        }

        const isValid = await bcrypt.compare(oldRefreshToken, session.refreshTokenHash)
        if (!isValid) {
            // Possible replay attack, revoke session for safety
            await this.revokeSession(session.id)
            throw new Error('Invalid refresh token')
        }

        // Generate new refresh token
        const newRefreshToken = randomBytes(40).toString('hex')
        const newRefreshTokenHash = await bcrypt.hash(newRefreshToken, 10)

        await prisma.session.update({
            where: { id: sessionId },
            data: {
                refreshTokenHash: newRefreshTokenHash,
                lastActiveAt: new Date()
            }
        })

        return { newRefreshToken, session }
    }
}
