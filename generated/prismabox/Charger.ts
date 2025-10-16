import { t } from "elysia";

import { __transformDate__ } from "./__transformDate__";

import { __nullable__ } from "./__nullable__";

export const ChargerPlain = t.Object(
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
);

export const ChargerRelations = t.Object(
  {
    station: t.Object(
      { id: t.String(), name: t.String(), location: t.String() },
      { additionalProperties: false },
    ),
    sessions: t.Array(
      t.Object(
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
      ),
      { additionalProperties: false },
    ),
  },
  { additionalProperties: false },
);

export const ChargerPlainInputCreate = t.Object(
  {
    model: t.String(),
    connectorType: t.String(),
    status: t.Optional(
      t.Union([t.Literal("CHARGING"), t.Literal("AVAILABLE")], {
        additionalProperties: false,
      }),
    ),
  },
  { additionalProperties: false },
);

export const ChargerPlainInputUpdate = t.Object(
  {
    model: t.Optional(t.String()),
    connectorType: t.Optional(t.String()),
    status: t.Optional(
      t.Union([t.Literal("CHARGING"), t.Literal("AVAILABLE")], {
        additionalProperties: false,
      }),
    ),
  },
  { additionalProperties: false },
);

export const ChargerRelationsInputCreate = t.Object(
  {
    station: t.Object(
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
    sessions: t.Optional(
      t.Object(
        {
          connect: t.Array(
            t.Object(
              {
                id: t.String({ additionalProperties: false }),
              },
              { additionalProperties: false },
            ),
            { additionalProperties: false },
          ),
        },
        { additionalProperties: false },
      ),
    ),
  },
  { additionalProperties: false },
);

export const ChargerRelationsInputUpdate = t.Partial(
  t.Object(
    {
      station: t.Object(
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
      sessions: t.Partial(
        t.Object(
          {
            connect: t.Array(
              t.Object(
                {
                  id: t.String({ additionalProperties: false }),
                },
                { additionalProperties: false },
              ),
              { additionalProperties: false },
            ),
            disconnect: t.Array(
              t.Object(
                {
                  id: t.String({ additionalProperties: false }),
                },
                { additionalProperties: false },
              ),
              { additionalProperties: false },
            ),
          },
          { additionalProperties: false },
        ),
      ),
    },
    { additionalProperties: false },
  ),
);

export const ChargerWhere = t.Partial(
  t.Recursive(
    (Self) =>
      t.Object(
        {
          AND: t.Union([Self, t.Array(Self, { additionalProperties: false })]),
          NOT: t.Union([Self, t.Array(Self, { additionalProperties: false })]),
          OR: t.Array(Self, { additionalProperties: false }),
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
    { $id: "Charger" },
  ),
);

export const ChargerWhereUnique = t.Recursive(
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
              model: t.String(),
              connectorType: t.String(),
              stationId: t.String(),
              status: t.Union([t.Literal("CHARGING"), t.Literal("AVAILABLE")], {
                additionalProperties: false,
              }),
            },
            { additionalProperties: false },
          ),
        ),
      ],
      { additionalProperties: false },
    ),
  { $id: "Charger" },
);

export const ChargerSelect = t.Partial(
  t.Object(
    {
      id: t.Boolean(),
      model: t.Boolean(),
      connectorType: t.Boolean(),
      station: t.Boolean(),
      stationId: t.Boolean(),
      sessions: t.Boolean(),
      status: t.Boolean(),
      _count: t.Boolean(),
    },
    { additionalProperties: false },
  ),
);

export const ChargerInclude = t.Partial(
  t.Object(
    {
      station: t.Boolean(),
      sessions: t.Boolean(),
      status: t.Boolean(),
      _count: t.Boolean(),
    },
    { additionalProperties: false },
  ),
);

export const ChargerOrderBy = t.Partial(
  t.Object(
    {
      id: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      model: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      connectorType: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      stationId: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
    },
    { additionalProperties: false },
  ),
);

export const Charger = t.Composite([ChargerPlain, ChargerRelations], {
  additionalProperties: false,
});

export const ChargerInputCreate = t.Composite(
  [ChargerPlainInputCreate, ChargerRelationsInputCreate],
  { additionalProperties: false },
);

export const ChargerInputUpdate = t.Composite(
  [ChargerPlainInputUpdate, ChargerRelationsInputUpdate],
  { additionalProperties: false },
);
