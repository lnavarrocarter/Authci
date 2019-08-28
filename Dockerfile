#Dockerfile para contenedor de nodejs y nestjs 
#Author: Luis Navarro Carter
#Contact : lnavarro.carter@ncai.cl

#From nos permite tener una imagen base para nuestro nuevo contenedor
FROM node:10.15.3-alpine

#instalamos Nest.Js
RUN npm i -g @nestjs/cli

#crea la carpeta que tendre el codigo de nuestra app
#Cambien "my_nest_app" por el nombre que quieran 
RUN mkdir -p /authci

#establece como directorio de trabajo nuestra carpeta 'my_nest_app'
WORKDIR /authci
ADD package.json /authci/package.json
RUN npm config set registry http://registry.npmjs.org
RUN npm install -g --force 

ADD . /authci
RUN npm install -g nodemon@1.18.10

#exponemos el puerto 3100 que es el que usa nest para acceder a la app
EXPOSE 3100
CMD ["npm", "run", "start:dev"]
