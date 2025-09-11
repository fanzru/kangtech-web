# Multi-stage build untuk optimasi size
FROM oven/bun:1-alpine AS base

# Install dependencies hanya saat diperlukan
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Copy package files
COPY package.json bun.lockb ./
COPY prisma ./prisma/

# Install ALL dependencies (including devDependencies needed for build)
RUN bun install

# Build aplikasi
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Generate Prisma client with correct binary targets
RUN bun prisma generate

# Build Next.js app untuk standalone
ENV NEXT_TELEMETRY_DISABLED=1
RUN bun run build

# Production image dengan distroless
FROM gcr.io/distroless/nodejs20-debian11 AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Create non-root user
USER nonroot

# Copy built application
COPY --from=builder --chown=nonroot:nonroot /app/public ./public
COPY --from=builder --chown=nonroot:nonroot /app/.next/standalone ./
COPY --from=builder --chown=nonroot:nonroot /app/.next/static ./.next/static
COPY --from=builder --chown=nonroot:nonroot /app/prisma ./prisma
COPY --from=builder --chown=nonroot:nonroot /app/src/generated ./src/generated

# Copy node_modules untuk prisma client
COPY --from=builder --chown=nonroot:nonroot /app/node_modules/.prisma ./node_modules/.prisma
COPY --from=builder --chown=nonroot:nonroot /app/node_modules/@prisma ./node_modules/@prisma

EXPOSE 3000

ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# Start the application
CMD ["server.js"]
