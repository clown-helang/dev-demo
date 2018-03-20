FROM 10.0.251.196/ottapplication/nginx_gzip_cache:v1.10.2

COPY ./dist/manage-portal /usr/share/nginx/html/manage-portal
