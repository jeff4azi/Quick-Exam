const getPercent = (attempt) => {
  const total = Number(attempt?.total_questions);
  if (!total) return null;

  const percent = (Number(attempt.score) / total) * 100;
  return Number.isFinite(percent) ? percent : null;
};

const getTimeSeconds = (attempt) => {
  const time = Number(attempt?.time_taken);
  return Number.isFinite(time) && time > 0 ? time : Number.POSITIVE_INFINITY;
};

const getDateMs = (attempt) => {
  const dateMs = new Date(attempt?.date_taken).getTime();
  return Number.isFinite(dateMs) ? dateMs : Number.POSITIVE_INFINITY;
};

const isBetterAttempt = (attempt, currentBest) => {
  if (!currentBest) return true;

  const percent = getPercent(attempt);
  const bestPercent = getPercent(currentBest);
  if (percent == null) return false;
  if (bestPercent == null) return true;
  if (percent !== bestPercent) return percent > bestPercent;

  const time = getTimeSeconds(attempt);
  const bestTime = getTimeSeconds(currentBest);
  if (time !== bestTime) return time < bestTime;

  return getDateMs(attempt) < getDateMs(currentBest);
};

export const buildLeaderboardEntries = (attempts) => {
  const byUser = new Map();

  attempts.forEach((attempt) => {
    if (!attempt?.user_id || !attempt.total_questions) return;

    const percent = getPercent(attempt);
    if (percent == null) return;

    const existing = byUser.get(attempt.user_id);
    const timeTaken = Number(attempt.time_taken) || 0;

    if (!existing) {
      byUser.set(attempt.user_id, {
        userId: attempt.user_id,
        bestAttempt: attempt,
        attemptsCount: 1,
        totalTime: timeTaken,
        university: attempt.university?.trim() ?? null,
      });
      return;
    }

    if (isBetterAttempt(attempt, existing.bestAttempt)) {
      existing.bestAttempt = attempt;
      existing.university = attempt.university?.trim() ?? existing.university;
    }

    existing.attemptsCount += 1;
    existing.totalTime += timeTaken;
  });

  return Array.from(byUser.values()).map((entry) => {
    const bestPercentRaw = getPercent(entry.bestAttempt) ?? 0;
    const bestTimeSeconds = getTimeSeconds(entry.bestAttempt);
    const bestDateMs = getDateMs(entry.bestAttempt);

    return {
      ...entry,
      bestPercentRaw,
      bestPercent: Math.round(bestPercentRaw),
      bestTimeSeconds,
      bestDateMs,
      bestCourseId: entry.bestAttempt?.course_id ?? null,
    };
  });
};

export const compareLeaderboardEntries = (a, b) => {
  if (b.bestPercentRaw !== a.bestPercentRaw) {
    return b.bestPercentRaw - a.bestPercentRaw;
  }

  if (a.bestTimeSeconds !== b.bestTimeSeconds) {
    return a.bestTimeSeconds - b.bestTimeSeconds;
  }

  if (a.bestDateMs !== b.bestDateMs) {
    return a.bestDateMs - b.bestDateMs;
  }

  return String(a.userId).localeCompare(String(b.userId));
};
