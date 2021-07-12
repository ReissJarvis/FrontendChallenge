#############
### BUIlD ###
#############
FROM node:14.17.3 as build
WORKDIR /app

COPY package.json ./
COPY package-lock.json ./

RUN npm ci
RUN npm install react-scripts@3.4.1 -g
COPY . ./

RUN npm run build

#############
#### Run ####
#############
FROM nginx:stable-alpine
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
