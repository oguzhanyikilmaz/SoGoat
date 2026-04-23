FROM nginx:alpine

# Copy static assets to nginx default html directory
COPY . /usr/share/nginx/html

# Expose port 80
EXPOSE 3000

CMD ["nginx", "-g", "daemon off;"]
