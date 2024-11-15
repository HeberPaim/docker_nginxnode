FROM node:15

ENV DOCKERIZE_VERSION v0.8.0
RUN echo "deb http://deb.debian.org/debian buster main" > /etc/apt/sources.list && \
    echo "deb http://deb.debian.org/debian-security buster/updates main" >> /etc/apt/sources.list && \
    echo "deb http://deb.debian.org/debian buster-updates main" >> /etc/apt/sources.list

RUN apt-get update 
RUN apt-get install -y wget 
RUN wget https://github.com/jwilder/dockerize/releases/download/$DOCKERIZE_VERSION/dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz
RUN tar -C /usr/local/bin -xzvf dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz 
RUN chmod +x /usr/local/bin/dockerize 
RUN rm dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz
RUN apt-get remove -y wget && apt-get clean && rm -rf /var/lib/apt/lists/*


WORKDIR /app

COPY . .

EXPOSE 3000
CMD ["dockerize", "-wait", "tcp://db:3306", "-timeout", "30s", "node", "index.js"]