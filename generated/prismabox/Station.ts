import { t } from "elysia";

import { __transformDate__ } from "./__transformDate__";

import { __nullable__ } from "./__nullable__";

export const StationPlain = t.Object(
  { id: t.String(), name: t.String(), location: t.String() },
  { additionalProperties: false },
);

export const StationRelations = t.Object(
  {
    chargers: t.Array(
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
      { additionalProperties: false },
    ),
  },
  { additionalProperties: false },
);

export const StationPlainInputCreate = t.Object(
  { name: t.String(), location: t.String() },
  { additionalProperties: false },
);

export const StationPlainInputUpdate = t.Object(
  { name: t.Optional(t.String()), location: t.Optional(t.String()) },
  { additionalProperties: false },
);

export const StationRelationsInputCreate = t.Object(
  {
    chargers: t.Optional(
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

export const StationRelationsInputUpdate = t.Partial(
  t.Object(
    {
      chargers: t.Partial(
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

export const StationWhere = t.Partial(
  t.Recursive(
    (Self) =>
      t.Object(
        {
          AND: t.Union([Self, t.Array(Self, { additionalProperties: false })]),
          NOT: t.Union([Self, t.Array(Self, { additionalProperties: false })]),
          OR: t.Array(Self, { additionalProperties: false }),
          id: t.String(),
          name: t.String(),
          location: t.String(),
        },
        { additionalProperties: false },
      ),
    { $id: "Station" },
  ),
);

export const StationWhereUnique = t.Recursive(
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
            { id: t.String(), name: t.String(), location: t.String() },
            { additionalProperties: false },
          ),
        ),
      ],
      { additionalProperties: false },
    ),
  { $id: "Station" },
);

export const StationSelect = t.Partial(
  t.Object(
    {
      id: t.Boolean(),
      name: t.Boolean(),
      location: t.Boolean(),
      chargers: t.Boolean(),
      _count: t.Boolean(),
    },
    { additionalProperties: false },
  ),
);

export const StationInclude = t.Partial(
  t.Object(
    { chargers: t.Boolean(), _count: t.Boolean() },
    { additionalProperties: false },
  ),
);

export const StationOrderBy = t.Partial(
  t.Object(
    {
      id: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      name: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      location: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
    },
    { additionalProperties: false },
  ),
);

export const Station = t.Composite([StationPlain, StationRelations], {
  additionalProperties: false,
});

export const StationInputCreate = t.Composite(
  [StationPlainInputCreate, StationRelationsInputCreate],
  { additionalProperties: false },
);

export const StationInputUpdate = t.Composite(
  [StationPlainInputUpdate, StationRelationsInputUpdate],
  { additionalProperties: false },
);
