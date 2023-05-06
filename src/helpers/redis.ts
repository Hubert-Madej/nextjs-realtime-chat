const upstashRedisRestUrl = process.env.UPSTASH_REDIS_REST_URL;
const upstashRedisToken = process.env.UPSTASH_REDIS_REST_TOKEN;

type Command = "zrange" | "sismember" | "get" | "smembers";

/**
 * This function fetches data from a Redis server using REST API and returns the result.
 * @param {Command} command - The Redis command to be executed, such as "zrange", "sismember", "get", "smembers".
 * @param {(string | number)[]} args - The `args` parameter is a rest parameter that allows the
 * function to accept a variable number of arguments as an array. In this case, it accepts a list of
 * strings or numbers that represent the arguments to be passed to the Redis command. The `join()`
 * method is used to concatenate the arguments into
 * @returns the result of the Redis command executed using the Upstash Redis REST API. The result is
 * obtained by parsing the JSON response from the API and returning the "result" property of the parsed
 * object.
 */
export async function fetchRedis(
  command: Command,
  ...args: (string | number)[]
) {
  const commandUrl = `${upstashRedisRestUrl}/${command}/${args.join("/")}`;
  const response = await fetch(commandUrl, {
    headers: {
      Authorization: `Bearer ${process.env.UPSTASH_REDIS_REST_TOKEN}`,
    },
    cache: "no-store",
  });

  if (!response.ok)
    throw new Error(`Error executing Redis command: ${response.statusText}`);

  const data = await response.json();

  return data.result;
}
