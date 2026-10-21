FROM maven:3.9-eclipse-temurin-21 AS build

WORKDIR /app

COPY pom.xml .
COPY src ./src

RUN mvn clean package -DskipTests

FROM eclipse-temurin:21-jre

WORKDIR /app

COPY --from=build /app/target/*.jar app.jar

# Copy Aiven CA certificate for SSL verification
COPY src/main/resources/aiven-ca.crt /app/aiven-ca.crt

EXPOSE 8080

CMD ["java", "-jar", "app.jar"]
