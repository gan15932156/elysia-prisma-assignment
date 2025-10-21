import { PrismaClient } from "../generated/prisma";
import { Session } from "../schemas/session.schema";

const prisma = new PrismaClient();

const addHandler = async (data: Session) => {
  try {
    const charger = await prisma.charger.findUnique({
      where: { id: data.chargerId },
    });
    if (!charger) {
      // return { error: false, message: "Not found charger.", data: {} };
      throw new Error("Not found charger data.");
    }
    if (charger.status === "CHARGING") {
      throw new Error("Charger not available.");
    }
    const [_, session] = await prisma.$transaction([
      prisma.charger.update({
        where: {
          id: charger.id,
        },
        data: {
          status: "CHARGING",
        },
      }),
      prisma.session.create({ data: data }),
    ]);
    return session;
  } catch (error) {
    throw error;
  }
};

const getAllhandler = async (): Promise<Array<Session>> => {
  try {
    const response = await prisma.session.findMany();
    console.log(response);
    return [];
  } catch (error) {
    throw error;
  }
};

export { addHandler, getAllhandler };
