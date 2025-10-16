import { t } from "elysia";

import { __transformDate__ } from "./__transformDate__";

import { __nullable__ } from "./__nullable__";

export const Status = t.Union([t.Literal("CHARGING"), t.Literal("AVAILABLE")], {
  additionalProperties: false,
});
