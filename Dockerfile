#Dockerfile para contenedor de nodejs y nestjs

#From nos permite tener una imagen base para nuestro nuevo contenedor
FROM node:10.13.0-alpine

#instalamos Nest.Js
RUN npm i -g @nestjs/cli
RUN spec install git
RUN git clone https://github.com/lnavarrocarter/authCI-js.git authci

#crea la carpeta que tendre el codigo de nuestra app
#Cambien "my_nest_app" por el nombre que quieran 
RUN mkdir -p /authci

#establece como directorio de trabajo nuestra carpeta 'my_nest_app'
WORKDIR /authci
ADD package.json /authci/package.json
RUN npm config set registry http://registry.npmjs.org
RUN npm install -g

ADD . /authci

#exponemos el puerto 3100 que es el que usa nest para acceder a la app
EXPOSE 3100
CMD ["npm", "run", "start:dev"]