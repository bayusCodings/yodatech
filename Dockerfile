FROM node:10
WORKDIR /app
COPY package.json /app
RUN npm install
RUN sequelize db:migrate 
COPY . /app
EXPOSE 3000
CMD npm start