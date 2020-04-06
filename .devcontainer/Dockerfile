FROM node

WORKDIR /mern

COPY . .

RUN npm i -g yarn --no-bin-links
RUN apt-get update && apt-get install -y fish

EXPOSE 3000 5000
