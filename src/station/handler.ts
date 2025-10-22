import { CreateStation } from "./../schemas/station.schema";
import { PrismaClient } from "../generated/prisma";
import { Station, StationUpdate } from "../schemas/station.schema";

const prisma = new PrismaClient();

const addHandler = async (data: CreateStation): Promise<Station | null> => {
  try {
    const response = await prisma.station.create({ data: data });
    return response;
  } catch (error) {
    throw error;
  }
};

const getAllhandler = async (): Promise<Array<Station>> => {
  try {
    const response = await prisma.station.findMany();
    return response;
  } catch (error) {
    throw error;
  }
};

const updateHandler = async (
  id: string,
  data: StationUpdate
): Promise<Station | null> => {
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
