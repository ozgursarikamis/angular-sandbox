##### Stage 1: BUILD THE ANGULAR CODE

 # get the final version of node
FROM node:latest as stage_1

# metadata
LABEL author="Dan Wahlin"

WORKDIR /app
COPY package.json package.json

# install dependencies
RUN npm install
COPY . .
RUN npm run build -- --prod

##### Stage 2: CREATE AND CONFIGURE NGINX IMAGE

# get the final version of nginx
FROM nginx:latest as stage_2

# Create a mount point with the specified name 
# and mark it as holding externally mounted volumes 
# from the native host or from other containers.
VOLUME /var/cache/nginx

# copy the build output to replace the default nginx contents.
# `stage_1` produces a folder called `dist` with the build output.
COPY --from=stage_1 /app/dist /usr/share/nginx/html

COPY ./config/nginx.conf /etc/nginx/conf.d/default.conf