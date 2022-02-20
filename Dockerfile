# Stage 1 - the build process
FROM node:14 as build-deps
WORKDIR /usr/src/app
# we copy package.json and yarn.lock into the image and then run yarn 
COPY package.json yarn.lock ./

RUN yarn
# we copy everything else into the image and then run the build command.
COPY . ./
RUN yarn build

# Stage 2 - the production environment
FROM nginx:1.14.1-alpine
COPY ./config/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build-deps /usr/src/app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]