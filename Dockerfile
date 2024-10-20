# Step 1: Gunakan image nginx resmi dari Docker Hub
FROM nginx:alpine

# Step 2: Hapus default config nginx agar bisa kita ganti
RUN rm /usr/share/nginx/html/*

# Step 3: Salin file HTML dan semua asset ke dalam direktori yang akan dilayani oleh nginx
COPY index.html /usr/share/nginx/html/
COPY style.css /usr/share/nginx/html/
COPY detail.js /usr/share/nginx/html/
COPY detail.html /usr/share/nginx/html/
COPY script.js /usr/share/nginx/html/

# Step 4: Expose port 80 untuk menerima traffic HTTP
EXPOSE 80

# Step 5: Jalankan nginx
CMD ["nginx", "-g", "daemon off;"]
