# --------------> The build image
FROM node:latest AS build
WORKDIR /usr/src/app
COPY package*.json /usr/src/app/
RUN npm ci --only=production

# --------------> The production image
FROM node:lts-alpine
RUN apk add dumb-init
ENV NODE_ENV production
USER node
WORKDIR /usr/src/app
COPY --chown=node:node --from=build /usr/src/app/node_modules /usr/src/app/node_modules
COPY --chown=node:node . /usr/src/app

# exposed container port
EXPOSE 4500

CMD ["dumb-init", "node", "app.js"]

### build container 
# sudo docker build . -t test-user/m2m-browser-client-demo

### run container
# sudo docker run -t -i -p 4500:4500 -a stdin -a stdout test-user/m2m-browser-client-demo

### list container id
# $ sudo docker ps

### stop a particular container
# $ sudo docker stop e50ad27074a7

### remove stopped, unused images
# $ sudo docker system prune -a

### check history
# $ sudo docker history test-user/m2m-browser-client-demo

