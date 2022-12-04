import { Hobby } from '@prisma/client';

export function mappingUserHobbyResult(
  rawData: Hobby & {
    UserHobby: { user: { username: string; id: number } }[];
  },
): {
  hobbyName: string;
  hobbyId: number;
  users: {
    username: string;
    id: number;
  }[];
} {
  const result: {
    hobbyName: string;
    hobbyId: number;
    users: { username: string; id: number }[];
  } = {
    hobbyName: rawData.name,
    hobbyId: rawData.id,
    users: rawData.UserHobby.map((user) => ({
      username: user.user.username,
      id: user.user.id,
    })),
  };

  return result;
}

export function mapUserHoobiesInput({
  userId,
  hobbyIds,
}: {
  userId: number;
  hobbyIds: number[];
}): { userId: number; hobbyId: number }[] {
  const uniqueHobbyId = [...new Set(hobbyIds)];
  return uniqueHobbyId.map((hobbyId) => ({ userId, hobbyId }));
}
