import { Prisma, PrismaClient } from "../generated/prisma";
import { CreateSession, Session } from "../schemas/session.schema";

const prisma = new PrismaClient();

const addHandler = async (data: CreateSession): Promise<Session> => {
  try {
    const charger = await prisma.charger.findUnique({
      where: { id: data.chargerId },
    });
    if (!charger) {
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
    const dataStartTimeObj = session.startTime
      ? new Date(session.startTime)
      : null;
    const dataEndTimeObj = session.endTime ? new Date(session.endTime) : null;
    const newSession: Session = {
      id: session.id,
      chargerId: session.chargerId,
      endTime: dataEndTimeObj?.toISOString() || null,
      startTime: dataStartTimeObj?.toISOString() || undefined,
      energyUsedKWh: session.energyUsedKWh,
      pricePerKWh: session.pricePerKWh,
      totalCost: session.totalCost,
    };
    return newSession;
  } catch (error) {
    throw error;
  }
};

const getAllhandler = async (): Promise<Array<Session>> => {
  try {
    const response = await prisma.session.findMany();
    const newSession = transformSessions(response);
    // console.log(newSession);
    return newSession;
  } catch (error) {
    throw error;
  }
};

export { addHandler, getAllhandler };

const transformSessions = (
  sessions: Array<Prisma.SessionUncheckedCreateInput>
) => {
  const newSessions: Array<Session> = [];
  sessions.forEach((session) => {
    const dataStartTimeObj = session.startTime
      ? new Date(session.startTime)
      : null;
    const dataEndTimeObj = session.endTime ? new Date(session.endTime) : null;
    newSessions.push({
      id: session.id,
      chargerId: session.chargerId,
      endTime: dataEndTimeObj?.toISOString() || null,
      startTime: dataStartTimeObj?.toISOString() || undefined,
      energyUsedKWh: session.energyUsedKWh || null,
      pricePerKWh: session.pricePerKWh,
      totalCost: session.totalCost || null,
    });
  });
  return newSessions;
};
