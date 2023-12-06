# Multi-stage Dockerfiles

Stage 1: Build the application
Stage 2: Copy Code and Create Server
Final stage: Run the app and server

## Benefits of Multi-stage Dockerfiles

- Avoid manual creation of intermediate images
- Reduce complexity
- Selectively copy artifacts from one stage to another
- Smaller final image size

