import { PrismaClient } from '@prisma/client'

const prismaClientSingleton = () => {
  return new PrismaClient().$extends({
    query: {
      $allModels: {
        async findMany({ model, operation, args, query }) {
          // List of models that have a deletedAt field
          const softDeleteModels = [
            'Organization',
            'User',
            'Subscription',
            'Course',
            'Subject',
            'Cohort',
            'Enrollment',
          ];

          if (softDeleteModels.includes(model)) {
            args.where = { ...args.where, deletedAt: null }
          }
          return query(args)
        },
        async findFirst({ model, operation, args, query }) {
          const softDeleteModels = [
            'Organization',
            'User',
            'Subscription',
            'Course',
            'Subject',
            'Cohort',
            'Enrollment',
          ];

          if (softDeleteModels.includes(model)) {
            args.where = { ...args.where, deletedAt: null }
          }
          return query(args)
        },
        async findUnique({ model, operation, args, query }) {
          // findUnique operations might be tricky to filter out if strictly by ID
          // We convert it to a findFirst under the hood to satisfy complex filters
          const softDeleteModels = [
            'Organization',
            'User',
            'Subscription',
            'Course',
            'Subject',
            'Cohort',
            'Enrollment',
          ];

          if (softDeleteModels.includes(model)) {
             // For findUnique, Prisma strictly requires unique fields.
             // We can intercept the result and return null if deletedAt is not null.
             const result = await query(args)
             if (result && (result as any).deletedAt !== null) {
                return null
             }
             return result
          }
          return query(args)
        },
        async delete({ model, operation, args, query }) {
           const softDeleteModels = [
            'Organization',
            'User',
            'Subscription',
            'Course',
            'Subject',
            'Cohort',
            'Enrollment',
          ];

          if (softDeleteModels.includes(model)) {
            // @ts-ignore
            return prisma[model as any].update({
              ...args,
              data: { deletedAt: new Date() },
            })
          }
          return query(args)
        },
        async deleteMany({ model, operation, args, query }) {
           const softDeleteModels = [
            'Organization',
            'User',
            'Subscription',
            'Course',
            'Subject',
            'Cohort',
            'Enrollment',
          ];

          if (softDeleteModels.includes(model)) {
             // @ts-ignore
             return prisma[model as any].updateMany({
               ...args,
               data: { deletedAt: new Date() },
             })
          }
          return query(args)
        }
      },
    },
  })
}

declare global {
  var prismaGlobal: undefined | ReturnType<typeof prismaClientSingleton>
}

// Ensure the same instance is used during hot-reloads in dev
const prisma = globalThis.prismaGlobal ?? prismaClientSingleton()

export default prisma

if (process.env.NODE_ENV !== 'production') globalThis.prismaGlobal = prisma
