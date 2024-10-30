FROM nginx:alpine

RUN rm /usr/share/nginx/html/*
COPY index.html /usr/share/nginx/html/
COPY style.css /usr/share/nginx/html/
COPY detail.js /usr/share/nginx/html/
COPY detail.html /usr/share/nginx/html/
COPY script.js /usr/share/nginx/html/

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
