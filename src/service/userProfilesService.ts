import { prisma } from '../lib/prisma';

export async function createProfileService(data: {
  user_id: number;
  name: string;
  last_name: string;
  phone: string;
  birth_date?: string | null;
  document?: string | null;
  contact_preference?: string | null;
  gender?: string | null;
}) {
  return await prisma.userProfile.create({
    data,
  });
}

export async function updateProfileService(data: {
  user_id: number;
  name: string;
  last_name: string;
  phone: string;
  birth_date: string;
  document: string;
  contact_preference: string;
  gender: string;
}) {
  return await prisma.userProfile.update({
    where: { user_id: data.user_id },
    data,
  });
}

export async function deleteProfileService(
  user_profile_id: number,
  user_id: number
) {
  return await prisma.userProfile.delete({
    where: {
      user_profile_id,
      user_id,
    },
  });
}

export async function getProfileByUserService(user_id: number) {
  return await prisma.userProfile.findUnique({
    where: { user_id },
  });
}
