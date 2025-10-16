import { t } from "elysia";

import { __transformDate__ } from "./__transformDate__";

import { __nullable__ } from "./__nullable__";

export const SessionPlain = t.Object(
  {
    id: t.String(),
    startTime: t.Date(),
    endTime: __nullable__(t.Date()),
    energyUsedKWh: __nullable__(t.Number()),
    pricePerKWh: t.Number(),
    totalCost: __nullable__(t.Number()),
    chargerId: t.String(),
  },
  { additionalProperties: false },
);

export const SessionRelations = t.Object(
  {
    charger: t.Object(
      {
        id: t.String(),
        model: t.String(),
        connectorType: t.String(),
        stationId: t.String(),
        status: t.Union([t.Literal("CHARGING"), t.Literal("AVAILABLE")], {
          additionalProperties: false,
        }),
      },
      { additionalProperties: false },
    ),
  },
  { additionalProperties: false },
);

export const SessionPlainInputCreate = t.Object(
  {
    startTime: t.Optional(t.Date()),
    endTime: t.Optional(__nullable__(t.Date())),
    energyUsedKWh: t.Optional(__nullable__(t.Number())),
    pricePerKWh: t.Number(),
    totalCost: t.Optional(__nullable__(t.Number())),
  },
  { additionalProperties: false },
);

export const SessionPlainInputUpdate = t.Object(
  {
    startTime: t.Optional(t.Date()),
    endTime: t.Optional(__nullable__(t.Date())),
    energyUsedKWh: t.Optional(__nullable__(t.Number())),
    pricePerKWh: t.Optional(t.Number()),
    totalCost: t.Optional(__nullable__(t.Number())),
  },
  { additionalProperties: false },
);

export const SessionRelationsInputCreate = t.Object(
  {
    charger: t.Object(
      {
        connect: t.Object(
          {
            id: t.String({ additionalProperties: false }),
          },
          { additionalProperties: false },
        ),
      },
      { additionalProperties: false },
    ),
  },
  { additionalProperties: false },
);

export const SessionRelationsInputUpdate = t.Partial(
  t.Object(
    {
      charger: t.Object(
        {
          connect: t.Object(
            {
              id: t.String({ additionalProperties: false }),
            },
            { additionalProperties: false },
          ),
        },
        { additionalProperties: false },
      ),
    },
    { additionalProperties: false },
  ),
);

export const SessionWhere = t.Partial(
  t.Recursive(
    (Self) =>
      t.Object(
        {
          AND: t.Union([Self, t.Array(Self, { additionalProperties: false })]),
          NOT: t.Union([Self, t.Array(Self, { additionalProperties: false })]),
          OR: t.Array(Self, { additionalProperties: false }),
          id: t.String(),
          startTime: t.Date(),
          endTime: t.Date(),
          energyUsedKWh: t.Number(),
          pricePerKWh: t.Number(),
          totalCost: t.Number(),
          chargerId: t.String(),
        },
        { additionalProperties: false },
      ),
    { $id: "Session" },
  ),
);

export const SessionWhereUnique = t.Recursive(
  (Self) =>
    t.Intersect(
      [
        t.Partial(
          t.Object({ id: t.String() }, { additionalProperties: false }),
          { additionalProperties: false },
        ),
        t.Union([t.Object({ id: t.String() })], {
          additionalProperties: false,
        }),
        t.Partial(
          t.Object({
            AND: t.Union([
              Self,
              t.Array(Self, { additionalProperties: false }),
            ]),
            NOT: t.Union([
              Self,
              t.Array(Self, { additionalProperties: false }),
            ]),
            OR: t.Array(Self, { additionalProperties: false }),
          }),
          { additionalProperties: false },
        ),
        t.Partial(
          t.Object(
            {
              id: t.String(),
              startTime: t.Date(),
              endTime: t.Date(),
              energyUsedKWh: t.Number(),
              pricePerKWh: t.Number(),
              totalCost: t.Number(),
              chargerId: t.String(),
            },
            { additionalProperties: false },
          ),
        ),
      ],
      { additionalProperties: false },
    ),
  { $id: "Session" },
);

export const SessionSelect = t.Partial(
  t.Object(
    {
      id: t.Boolean(),
      startTime: t.Boolean(),
      endTime: t.Boolean(),
      energyUsedKWh: t.Boolean(),
      pricePerKWh: t.Boolean(),
      totalCost: t.Boolean(),
      charger: t.Boolean(),
      chargerId: t.Boolean(),
      _count: t.Boolean(),
    },
    { additionalProperties: false },
  ),
);

export const SessionInclude = t.Partial(
  t.Object(
    { charger: t.Boolean(), _count: t.Boolean() },
    { additionalProperties: false },
  ),
);

export const SessionOrderBy = t.Partial(
  t.Object(
    {
      id: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      startTime: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      endTime: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      energyUsedKWh: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      pricePerKWh: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      totalCost: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      chargerId: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
    },
    { additionalProperties: false },
  ),
);

export const Session = t.Composite([SessionPlain, SessionRelations], {
  additionalProperties: false,
});

export const SessionInputCreate = t.Composite(
  [SessionPlainInputCreate, SessionRelationsInputCreate],
  { additionalProperties: false },
);

export const SessionInputUpdate = t.Composite(
  [SessionPlainInputUpdate, SessionRelationsInputUpdate],
  { additionalProperties: false },
);
