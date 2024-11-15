FROM nginx:1.15.0-alpine
#remove older config
RUN rm /etc/nginx/nginx.conf
#copy new config
COPY nginx.conf /etc/nginx/nginx.conf

#set default page
COPY index.html /usr/share/nginx/html/

#run nginx
CMD ["nginx", "-g", "daemon off;"]