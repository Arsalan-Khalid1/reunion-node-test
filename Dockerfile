# Specify the base image with the correct Node.js version
FROM node:16-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy the package.json and package-lock.json files to the container
COPY package*.json ./

# Install the app's dependencies
RUN npm install

# Copy the rest of the app's files to the container
COPY . .

# Set environment variables
ENV DB_URL='mongodb+srv://daredefyme:daredefyme@cluster0.prf6u.mongodb.net/?retryWrites=true&w=majority'
ENV SECRET_KEY='ajbdoabvoeqvroqbndiamcpqebpiqebriqenoqbgrb3ip1iy083y120380yY(*T*&T#*&@&(T(b ,skjqr)))'
ENV PORT='5000'

# Build the TypeScript code
RUN npm run build


# Expose the port that the app will listen on
EXPOSE $PORT

# Start the app when the container starts
CMD ["npm", "run", "dev"]
