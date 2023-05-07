import clsx, { ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * This TypeScript function takes in an array of class values and returns a merged string of those
 * values using the `clsx` and `twMerge` functions.
 * @param {ClassValue[]} inputs - `inputs` is a rest parameter that allows the function to accept any
 * number of arguments. In this case, the arguments are of type `ClassValue[]`, which means an array of
 * strings or objects that represent CSS classes. The `...` syntax before `inputs` is used to spread
 * the arguments
 * @returns The `cn` function is returning the result of calling `twMerge` on the output of `clsx` with
 * the spread `inputs` array as its argument.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * The function constructs a chat href by sorting two IDs and concatenating them with a double dash
 * separator.
 * @param {string} firstId - The firstId parameter is a string representing the ID of one of the users
 * in a chat conversation.
 * @param {string} secondId - I'm sorry, but there seems to be a typo in your question. The `secondId`
 * parameter is not defined. Can you please provide more information or context so I can better assist
 * you?
 * @returns The function `chatHrefConstructor` returns a string that concatenates the two input IDs
 * sorted in alphabetical order and separated by two dashes.
 */
export function chatHrefConstructor(firstId: string, secondId: string) {
  const sortedIds = [firstId, secondId].sort();

  return `${sortedIds[0]}--${sortedIds[1]}`;
}

/**
 * The function replaces all colons in a string with double underscores.
 * @param {string} key - The `key` parameter is a string that represents a key in a data structure. The
 * function `toPusherKey` replaces all occurrences of the colon character (`:`) in the key with a
 * double underscore (`__`) and returns the modified key. This is typically done to ensure that the key
 * @returns The function `toPusherKey` takes a string parameter `key` and replaces all occurrences of
 * `:` with `__` using a regular expression. It then returns the modified string.
 */
export function toPusherKey(key: string) {
  return key.replace(/:/g, "__");
}
