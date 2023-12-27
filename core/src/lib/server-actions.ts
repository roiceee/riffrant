"use server";

import LimiterStatus from "@/types/limiter-status";

export async function checkPostRateLimit(
  key: string
): Promise<LimiterStatus | undefined> {
  try {
    const res = await fetch(
      `${process.env.RATE_LIMITER_URL}/post`,

      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          creatorId: key,
        }),
      }
    );

    const data = await res.json();
    return data;
  } catch (e) {
    return undefined;
  }
}

export async function checkVoteRateLimit(
  key: string
): Promise<LimiterStatus | undefined> {
  const res = await fetch(
    `${process.env.RATE_LIMITER_URL}/vote`,

    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        creatorId: key,
      }),
    }
  );

  const data = await res.json();
  return data;
}
