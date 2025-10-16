import {
  ChargerPlain,
  ChargerInputCreate,
} from "../../generated/prismabox/Charger";
import { PrismaClient } from "../generated/prisma";

type ChargerPlaintResponse = typeof ChargerPlain.static;

const prisma = new PrismaClient();

const addHandler = async (
  data: typeof ChargerInputCreate.static
): Promise<ChargerPlaintResponse | null> => {
  try {
    const response = await prisma.charger.create({ data: data });
    return response;
  } catch (error) {
    throw error;
  }
};

const getAllhandler = async (): Promise<Array<ChargerPlaintResponse>> => {
  try {
    const response = await prisma.charger.findMany();
    return response;
  } catch (error) {
    throw error;
  }
};

export { addHandler, getAllhandler };
