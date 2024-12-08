# Use the official Node.js 20 Alpine image as a base
FROM node:latest

# 设置工作目录
WORKDIR /app

# 复制 package.json 和 package-lock.json 到工作目录
COPY package*.json ./

# 安装依赖项
RUN npm install

# 复制项目文件到工作目录
COPY . .

# 构建 Next.js 应用程序
RUN npm run build

# 暴露端口 3000，这是 Next.js 应用程序默认的端口
EXPOSE 3000

# 启动应用程序
CMD ["npm", "start"]
