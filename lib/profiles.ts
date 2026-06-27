import { insforge } from "./insforge";

export type Profile = {
  name?: string;
  avatar_url?: string;
};

const cache = new Map<string, Profile>();
const pending = new Map<string, Promise<void>>();

async function fetchProfile(userId: string) {
  const { data } = await insforge.auth.getProfile(userId);
  cache.set(userId, { name: data?.profile?.name, avatar_url: data?.profile?.avatar_url });
}

export async function loadProfiles(userIds: string[]): Promise<Map<string, Profile>> {
  const missing = Array.from(new Set(userIds)).filter((id) => !cache.has(id));

  await Promise.all(
    missing.map((id) => {
      if (!pending.has(id)) {
        pending.set(
          id,
          fetchProfile(id).finally(() => pending.delete(id))
        );
      }
      return pending.get(id);
    })
  );

  return cache;
}
