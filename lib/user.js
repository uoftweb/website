import { getPrisma } from "lib/prisma";

export async function getAllUsers() {
  const prisma = getPrisma();
  const data = await prisma.user.findMany();
  return data;
}

export async function getUserById(id) {
  const prisma = getPrisma();
  const data = await prisma.user.findOne({ where: { id } });
  return data;
}
