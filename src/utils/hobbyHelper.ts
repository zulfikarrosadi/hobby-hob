import { Hobby } from '@prisma/client';

export function mappingUserHobbyResult(
  rawData: Hobby & {
    UserHobby: {
      user: {
        username: string;
        id: number;
        bio: string;
        fullName: string;
        sosmed: {
          instagram: string;
          tiktok: string;
          linkedin: string;
          website: string;
        };
      };
    }[];
  },
): {
  hobbyName: string;
  hobbyId: number;
  users: {
    username: string;
    id: number;
    bio: string;
    fullName: string;
    sosmed: {
      instagram: string;
      tiktok: string;
      linkedin: string;
      website: string;
    };
  }[];
} {
  const result: {
    hobbyName: string;
    hobbyId: number;
    users: {
      username: string;
      id: number;
      bio: string;
      fullName: string;
      sosmed: {
        instagram: string;
        tiktok: string;
        linkedin: string;
        website: string;
      };
    }[];
  } = {
    hobbyName: rawData.name,
    hobbyId: rawData.id,
    users: rawData.UserHobby.map((user) => ({
      username: user.user.username,
      id: user.user.id,
      bio: user.user.bio,
      fullName: user.user.fullName,
      sosmed: {
        instagram: user.user.sosmed.instagram,
        linkedin: user.user.sosmed.linkedin,
        tiktok: user.user.sosmed.tiktok,
        website: user.user.sosmed.website,
      },
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
