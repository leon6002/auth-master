import { auth } from "@/auth";
import { TRPCError, initTRPC } from "@trpc/server";
import superjson from "superjson";
import { User } from "next-auth";
import { ZodError } from "zod";
import { db } from "@/lib/db";

export const createTRPCContext = async (opts: { headers: Headers }) => {
  const session = await auth();

  return {
    db,
    session,
    user: session?.user,
    userId: session?.user.id,
    ...opts,
  };
};

const t = initTRPC.context<typeof createTRPCContext>().create({
  // transformer: superjson,
  errorFormatter({ shape, error }) {
    return {
      ...shape,
      data: {
        ...shape.data,
        zodError:
          error.cause instanceof ZodError ? error.cause.flatten() : null,
      },
    };
  },
});

export const createCallerFactory = t.createCallerFactory;

export const createTRPCRouter = t.router;

/**
 * Middleware for timing procedure execution and adding an articifial delay in development.
 *
 * You can remove this if you don't like it, but it can help catch unwanted waterfalls by simulating
 * network latency that would occur in production but not in local development.
 */
const timingMiddleware = t.middleware(async ({ next, path }) => {
  const start = Date.now();

  if (t._config.isDev) {
    // artificial delay in dev
    const waitMs = Math.floor(Math.random() * 400) + 100;
    await new Promise((resolve) => setTimeout(resolve, waitMs));
  }

  const result = await next();

  const end = Date.now();
  console.log(`[TRPC] ${path} took ${end - start}ms to execute`);

  return result;
});

/**
 * Public (unauthenticated) procedure
 *
 * This is the base piece you use to build new queries and mutations on your tRPC API. It does not
 * guarantee that a user querying is authorized, but you can still access user session data if they
 * are logged in.
 */
export const publicProcedure = t.procedure.use(timingMiddleware);

/**
 * Protected (authenticated) procedure
 *
 * If you want a query or mutation to ONLY be accessible to logged in users, use this. It verifies
 * the session is valid and guarantees `ctx.session.user` is not null.
 *
 * @see https://trpc.io/docs/procedures
 */
export const privateProcedure = t.procedure
  .use(timingMiddleware)
  .use(({ ctx, next }) => {
    if (!ctx.session || !ctx.session.user) {
      throw new TRPCError({ code: "UNAUTHORIZED" });
    }
    return next({
      ctx: {
        // infers the `session` as non-nullable
        session: { ...ctx.session, user: ctx.session.user },
        userId: ctx.session.user.id,
        user: ctx.session.user,
      },
    });
  });

// export const privateProcedure = t.procedure
// export const privateProcedure = publicProcedure.use(async (opts) => {
//   // const { getUser } = getKindeServerSession()
//   // const user = getUser()
//   const { ctx } = opts;
// const session = await auth();
// if (!session?.user) return null

// const user = session.user

// if (!user || !user.id) {
//   throw new TRPCError({ code: 'UNAUTHORIZED' })
// }

//   return opts.next({
//     ctx: {
//       userId: user.id,
//       user,
//     },
//   })
// })
// procedure that asserts that the user is logged in
// export const privateProcedure = t.procedure.use(
//   async function isAuthed(opts) {
//     const {ctx} = opts;
//     // const session = await auth();
//     // if (!session?.user) return null
//     // if (!user || !user.id) {
//     //   throw new TRPCError({ code: 'UNAUTHORIZED' })
//     // }
//     if (!ctx.user) {
//       throw new TRPCError({ code: 'UNAUTHORIZED' })
//     }

//     return opts.next({
//       ctx: {
//         // ✅ user value is known to be non-null now
//         user: ctx.user,
//         userId: ctx.user.id
//       },
//     });
//   });
