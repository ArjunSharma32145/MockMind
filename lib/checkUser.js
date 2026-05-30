import { auth, currentUser } from "@clerk/nextjs/server";
import { db } from "./prisma";

const PLAN_CREDITS = {
  Drona: 15,
  Arjuna: 5,
  free: 1,
};

const normalizePlan = (plan) => {
  if (!plan || typeof plan !== "string") return "free";
  const normalized = plan.toLowerCase();
  if (normalized === "drona" || normalized === "pro") return "Drona";
  if (normalized === "arjuna" || normalized === "starter") return "Arjuna";
  return "free";
};

const getCurrentPlan = async (user) => {
  const { has } = await auth();
  if (has({ plan: "Drona" }) || has({ plan: "drona" }) || has({ plan: "Pro" }) || has({ plan: "pro" })) return "Drona";
  if (has({ plan: "Arjuna" }) || has({ plan: "arjuna" }) || has({ plan: "Starter" }) || has({ plan: "starter" })) return "Arjuna";

  const planFromMetadata =
    user?.publicMetadata?.plan ||
    user?.privateMetadata?.plan ||
    user?.unsafeMetadata?.plan;

  return normalizePlan(planFromMetadata);
};

const shouldAllocateCredits = (dbUser, currentPlan) => {
  // Always allocate if plan changed
  if (dbUser.currentPlan !== currentPlan) return true;

  // Allocate if never allocated before
  if (!dbUser.creditsLastAllocatedAt) return true;

  // Allocate if it's a new calendar month since last allocation
  const now = new Date();
  const last = new Date(dbUser.creditsLastAllocatedAt);
  const isNewMonth =
    now.getFullYear() > last.getFullYear() || now.getMonth() > last.getMonth();

  return isNewMonth;
};

export const checkUser = async () => {
  const user = await currentUser();
  if (!user) return null;

  try {
    const currentPlan = await getCurrentPlan(user);
    const credits = PLAN_CREDITS[currentPlan];

    const loggedInUser = await db.user.findUnique({
      where: { clerkUserId: user.id },
    });

    if (loggedInUser) {
      // Interviewers don't have a credit subscription — skip allocation
      if (loggedInUser.role === "INTERVIEWER") return loggedInUser;

      if (shouldAllocateCredits(loggedInUser, currentPlan)) {
        // Roll forward any remaining credits from the previous period
        const rolledCredits = credits + (loggedInUser.credits ?? 0);

        return await db.user.update({
          where: { clerkUserId: user.id },
          data: {
            credits: rolledCredits,
            currentPlan,
            creditsLastAllocatedAt: new Date(),
          },
        });
      }

      return loggedInUser;
    }

    // New user — create with credits from their current plan
    const name = `${user.firstName} ${user.lastName}`;

    return await db.user.create({
      data: {
        clerkUserId: user.id,
        name,
        imageUrl: user.imageUrl,
        email: user.emailAddresses[0].emailAddress,
        credits,
        currentPlan,
        creditsLastAllocatedAt: new Date(),
      },
    });
  } catch (error) {
    console.error("checkUser error:", error.message);
    return null;
  }
};