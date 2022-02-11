# Base the image off of the NodeJS image
FROM node:lts

COPY OpenAPIDocumentation.yml /root/OpenAPIDocumentation.yml
COPY pages /root/pages
COPY package*.json /root

WORKDIR /root

RUN npm i

# Start the container with a bash terminal ready
ENTRYPOINT ["/bin/bash"]