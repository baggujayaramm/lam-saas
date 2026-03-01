import bcrypt from 'bcrypt'
import prisma from '@/lib/prisma'

export class AuthService {
    static async hashPassword(password: string): Promise<string> {
        return bcrypt.hash(password, 12)
    }

    static async verifyPassword(password: string, hash: string): Promise<boolean> {
        return bcrypt.compare(password, hash)
    }

    static async getUserContext(userId: string) {
        const user = await prisma.user.findUnique({
            where: { id: userId },
            include: { memberships: true }
        })

        if (!user) return null

        // By default, assuming one primary membership for phase 1 login simplify
        const primaryMembership = user.memberships[0]

        return {
            userId: user.id,
            organizationId: user.organizationId,
            role: primaryMembership?.role || 'STUDENT',
            tokenVersion: 1 // hardcoded for phase 1 MVP
        }
    }
}
