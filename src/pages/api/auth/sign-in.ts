import { NextApiRequest, NextApiResponse } from 'next';
import jwtDecode from 'jwt-decode';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function signUp(credential: string) {
  const {
    name,
    email,
    picture,
  }: { name: string; email: string; picture: string } = jwtDecode(credential);

  const updateUserData = {
    name,
    image: picture,
  };

  try {
    const response = await prisma.user.upsert({
      where: { email },
      update: { ...updateUserData },
      create: {
        email,
        ...updateUserData,
      },
    });
    return response.id;
  } catch (error) {
    console.error(error);
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const { credential } = req.query;
    const userInfo = await signUp(String(credential));
    res.status(200).json(userInfo);
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: 'Failed' });
  }
}
