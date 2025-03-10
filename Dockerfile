# Build stage
FROM node:23.9-alpine AS build
WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

# Remove dev dependencies
RUN rm -rf node_modules && npm ci --only=production

# Production stage
FROM --platform=$BUILDPLATFORM node:23.9-alpine AS production
WORKDIR /app

ENV NODE_ENV=production

COPY --from=build /app/package*.json ./
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist

# Run as root user (temporarily)
CMD ["node", "dist/index.js"]

