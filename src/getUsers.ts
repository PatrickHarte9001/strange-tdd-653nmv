import User from "./types/User";

export async function getUsers(): Promise<User[]> {
  return (
    await fetch("https://tech-interview-api-ultramed.vercel.app/users")
  ).json();
}
