export function mappingUserHobbyResult(hobbyInUser) {
  const result: {
    hobbyName: string;
    hobbyId: number;
    users: { username: string; id: number }[];
  } = {
    hobbyName: hobbyInUser.name,
    hobbyId: hobbyInUser.id,
    users: hobbyInUser.UserHobby.map((user) => ({
      username: user.user.username,
      id: user.user.id,
    })),
  };

  return result;
}
