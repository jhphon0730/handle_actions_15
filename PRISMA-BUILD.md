# When Library Error -> 
1. remove
pnpm remove @prisma/client prisma
2. add
pnpm add @prisma/client@5.20.0 prisma@5.20.0
3. genera
npx prisma generate
4. run
pnpm dev

# When Update Prisma (Field) ->
1. update your schema.prisma file
~~_~~

2. run migration
npx prisma migrate dev --name [your_migration_name]
npx prisma migrate dev

3. generate
npx prisma generate

4. run
pnpm dev

# When New Project ->
1. install prisma
pnpm add @prisma/client prisma

2. initialize prisma
npx prisma init

3. update your schema.prisma file
~~_~~

4. run migration
npx prisma migrate dev --name init

5. generate
npx prisma generate
