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
