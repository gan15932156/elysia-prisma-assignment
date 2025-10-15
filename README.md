# Elysia with Bun runtime

## Getting Started

To get started with this template, simply paste this command into your terminal:

```bash
bun create elysia ./elysia-example
```

## If you just pull to local

```bash
bun install
bunx prisma generate
```

## If you need to create new project

using elysia,prisma,sqlite
assume you installed elysia+prisma

```bash
bunx prisma init --datasource-provider sqlite
```

after coding prisma schema

```bash
bunx prisma migrate dev --name init
```

## Development

To start the development server run:

```bash
bun run dev
```

Open http://localhost:3000/ with your browser to see the result.
