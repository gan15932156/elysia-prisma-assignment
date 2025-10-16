import { PrismaClient } from "../generated/prisma";
import {
  StationPlainInputCreate,
  StationPlain,
  StationPlainInputUpdate,
} from "./../../generated/prismabox/Station";

type StationPlainResponse = typeof StationPlain.static;

const prisma = new PrismaClient();

const addHandler = async (
  data: typeof StationPlainInputCreate.static
): Promise<StationPlainResponse | null> => {
  try {
    const response = await prisma.station.create({ data: data });
    return response;
  } catch (error) {
    throw error;
  }
};

const getAllhandler = async (): Promise<Array<StationPlainResponse>> => {
  try {
    const response = await prisma.station.findMany();
    return response;
  } catch (error) {
    throw error;
  }
};

const updateHandler = async (
  id: string,
  data: typeof StationPlainInputUpdate.static
): Promise<StationPlainResponse | null> => {
  try {
    const response = await prisma.station.update({
      where: {
        id: id,
      },
      data: data,
    });
    return response;
  } catch (e) {
    throw e;
  }
};
export { addHandler, getAllhandler, updateHandler };
