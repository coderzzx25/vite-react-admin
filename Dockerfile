# 使用 Node.js 官方镜像作为构建阶段的基础镜像
FROM node:18 AS build

# 设置工作目录
WORKDIR /app

# 复制 package.json 和 package-lock.json (或者 yarn.lock) 文件
COPY package*.json ./

# 安装项目依赖
RUN npm install

# 复制其余的项目文件
COPY . .

# 构建项目
RUN npm run build

# 使用 nginx 官方镜像来提供构建好的应用
FROM nginx:alpine

# 复制构建好的静态文件到 nginx 的默认目录
COPY --from=build /app/build /usr/share/nginx/html

# 暴露端口 8080
EXPOSE 8080

# 修改 nginx 配置文件，监听端口 8080
COPY nginx.conf /etc/nginx/nginx.conf

# 启动 nginx
CMD ["nginx", "-g", "daemon off;"]
