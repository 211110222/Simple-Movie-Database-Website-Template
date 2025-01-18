    FROM nginx:alpine

    # Remove existing files in the default nginx directory
    RUN rm /usr/share/nginx/html/*

    # Copy all individual HTML, CSS, and JavaScript files to nginx html folder
    COPY index.html /usr/share/nginx/html/
    COPY style.css /usr/share/nginx/html/
    COPY script.js /usr/share/nginx/html/
    COPY detail.html /usr/share/nginx/html/
    COPY detail.js /usr/share/nginx/html/
    
    # Copy the "Stanly" folder with all its contents
    COPY Stanly /usr/share/nginx/html/Stanly

    # Copy the "Calvin" folder with all its contents, excluding node_modules to keep the image light
    COPY Calvin /usr/share/nginx/html/Calvin

    # Expose port 80
    EXPOSE 80

    CMD ["nginx", "-g", "daemon off;"]