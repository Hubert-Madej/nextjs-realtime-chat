import { fetchRedis } from "./redis";

/**
 * This is an asynchronous function that retrieves a user's friends by their user ID.
 * @param {string} userId - The `userId` parameter is a string that represents the unique identifier of
 * a user. This function is likely designed to retrieve a list of friends associated with a particular
 * user based on their `userId`.
 */
export const getFriendsByUserId = async (userId: string) => {
  const friendIds = (await fetchRedis(
    "smembers",
    `user:${userId}:friends`
  )) as string[];

  const friends = await Promise.all(
    friendIds.map(async (friendId) => {
      const friend = (await fetchRedis("get", `user:${friendId}`)) as string;

      const parsedFriend = JSON.parse(friend) as User;

      return parsedFriend;
    })
  );

  return friends;
};
