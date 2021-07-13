#############
### BUIlD ###
#############
FROM node:14.17.3 as build
WORKDIR /app

COPY package.json ./
COPY package-lock.json ./

RUN npm ci
#RUN npm install react-scripts -g
COPY . ./

RUN npm run build

#############
#### Run ####
#############
FROM node:14.17.0

ENV ASSETDIR /usr/src/app

RUN mkdir -p ${ASSETDIR}
WORKDIR ${ASSETDIR}

RUN npm install --unsafe-perm -g local-web-server

COPY --from=build /app/build ${ASSETDIR}

EXPOSE 8080

CMD ["ws", "-p", "8080", "--spa", "index.html", "--spa.asset-test-fs"]
