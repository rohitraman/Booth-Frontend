FROM node:alpine as builder
WORKDIR /react-app
COPY ./package.json /react-app
RUN npm install
COPY . .
ARG REACT_APP_API_URL # you could give this a default value as well
ENV REACT_APP_API_URL=$REACT_APP_API_URL
RUN npm run build

# => Run container
FROM nginx:1.15.2-alpine

# Nginx config
RUN rm -rf /etc/nginx/conf.d
COPY conf /etc/nginx

# Static build
COPY --from=builder /react-app/dist  /usr/share/nginx/html/

# Default port exposure
EXPOSE 80

# Copy .env file and shell script to container
WORKDIR /usr/share/nginx/html
# COPY ./env.sh .
COPY .env .

# Make our shell script executable
# RUN chmod +x env.sh

# Start Nginx server
CMD ["/bin/sh", "-c", "envsubst '${CONTAINER_URL}' < /etc/nginx/conf.d/my-site.conf.template > /etc/nginx/conf.d/default.conf && nginx -g \"daemon off;\""]