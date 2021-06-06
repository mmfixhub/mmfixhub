FROM node:16-alpine
# Create app directory  
WORKDIR /usr/src/app  
COPY package*.json /. 
# Install app dependencies  
RUN npm install  
COPY . .  
EXPOSE 8080
CMD [ "node", "./index.js" ] 