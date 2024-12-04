# 使用Node.js官方镜像作为基础镜像
FROM node:16

# 设置工作目录
WORKDIR /app

# 复制package.json和package-lock.json
COPY package*.json ./

# 安装项目依赖
RUN npm install

# 复制项目文件到工作目录
COPY . .

# 构建Next.js应用
RUN npm run build

# 使用多阶段构建，使用轻量级的Node.js镜像
FROM node:16-slim

# 设置工作目录
WORKDIR /app

# 复制构建后的文件
COPY --from=0 /app/.next ./.next
COPY --from=0 /app/node_modules ./node_modules
COPY --from=0 /app/package*.json ./
COPY --from=0 /app/next.config.js ./
COPY --from=0 /app/public ./public

# 暴露端口
EXPOSE 3000

# 启动Next.js应用
CMD ["npm", "start"]