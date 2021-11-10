FROM node:12
WORKDIR /VachanOnline-v2
COPY package*.json /VachanOnline-v2/
RUN npm install
COPY . /VachanOnline-v2
EXPOSE 3000
CMD ["npm", "start"]

