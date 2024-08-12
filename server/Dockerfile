FROM maven:latest AS build-stage
COPY . /build
WORKDIR /build
RUN mvn clean package

FROM openjdk:17-jdk-slim AS runtime
WORKDIR /opt/recipes
COPY --from=build-stage /build/target/*.jar app.jar
ENTRYPOINT ["/usr/bin/java", "-jar", "app.jar"]