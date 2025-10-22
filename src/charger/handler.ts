import { PrismaClient } from "../generated/prisma";
import { Charger, CreateCharger } from "../schemas/charger.schema";

const prisma = new PrismaClient();

const addHandler = async (data: CreateCharger): Promise<Charger | null> => {
  try {
    const response = await prisma.charger.create({ data: data });
    return response;
  } catch (error) {
    throw error;
  }
};

const getAllhandler = async (): Promise<Array<Charger>> => {
  try {
    const response = await prisma.charger.findMany();
    return response;
  } catch (error) {
    throw error;
  }
};

export { addHandler, getAllhandler };
