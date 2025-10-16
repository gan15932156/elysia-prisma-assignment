import {
  SessionInputCreate,
  SessionPlain,
} from "../../generated/prismabox/Session";
import { PrismaClient } from "../generated/prisma";

const prisma = new PrismaClient();

type SessionResponse = typeof SessionPlain.static;

const addHandler = async (data: typeof SessionInputCreate.static) => {
  try {
    const charger = await prisma.charger.findUnique({
      where: { id: data.charger.connect.id },
    });
    if (!charger) {
      return { error: false, message: "Not found charger.", data: {} };
    }
    if (charger.status === "CHARGING") {
      return { error: false, message: "Charger not available.", data: {} };
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

const getAllhandler = async (): Promise<Array<SessionResponse>> => {
  try {
    const response = await prisma.session.findMany();
    return response;
  } catch (error) {
    throw error;
  }
};

export { addHandler, getAllhandler };
