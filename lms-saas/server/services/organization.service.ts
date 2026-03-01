import prisma from '@/lib/prisma'
import { AuthService } from './auth.service'

export class OrganizationService {
    static async createOrganizationWithTrial(
        organizationName: string,
        email: string,
        passwordHash: string
    ) {
        // We use an interactive transaction to ensure all or nothing
        return await prisma.$transaction(async (tx) => {
            // 1. Create Organization
            const org = await tx.organization.create({
                data: {
                    name: organizationName,
                },
            })

            // 2. Create User
            const user = await tx.user.create({
                data: {
                    email,
                    passwordHash,
                    organizationId: org.id,
                },
            })

            // 3. Create Membership (ORG_ADMIN)
            await tx.membership.create({
                data: {
                    userId: user.id,
                    organizationId: org.id,
                    role: 'ORG_ADMIN',
                },
            })

            // 4. Create Trial Subscription (now + 30 days)
            const trialEndDate = new Date()
            trialEndDate.setDate(trialEndDate.getDate() + 30)

            await tx.subscription.create({
                data: {
                    organizationId: org.id,
                    status: 'TRIAL',
                    trialStartDate: new Date(),
                    trialEndDate,
                },
            })

            return { org, user }
        })
    }
}
