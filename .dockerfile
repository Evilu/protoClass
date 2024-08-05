# Use an official Node.js runtime as the base image
FROM node:latest AS builder

# Set the working directory in the container to /app
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install all the dependencies
RUN npm install

# Copy the rest of the code to the working directory
COPY /protos ./

COPY buf.gen.yaml .

COPY package.json .

# Generate the protobuf files
RUN npx buf generate ./protos

# Use a lightweight shell, like Alpine, to read the version from document_service_pb.d.ts
FROM alpine

# Copy the file from the Node.js image to the Alpine image
COPY --from=builder /app/protos/protobufGen/com/app/tab/documents/v1/document_service_pb.d.ts .

# Print the version from the top of document_service_pb.d.ts
CMD head -n 1 document_service_pb.d.ts
