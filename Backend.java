public class Employee {
    private final String name;
    private double salary;
    public Employee(String name, double salary) {
        this.name = name;
        this.salary = salary;
    }
    public String getName() {
        return name;
    }
    public double getSalary() {
        return salary;
    }
    public void increaseSalary(double percentage) {
        this.salary += this.salary * percentage / 100.0;
    }
}
// Collections and streams

List<String> companies = List.of("TCS", "Infosys", "Accenture", "TCS");
Map<String, Long> frequency = companies.stream()
    .collect(Collectors.groupingBy(
        company -> company,
        Collectors.counting()
    ));
frequency.forEach((company, count) ->
    System.out.println(company + " = " + count))

    TREE
jobtrack-backend/
  src/main/java/com/example/jobtrack/
    JobTrackApplication.java
    config/SecurityConfig.java
    controller/AuthController.java
    controller/ApplicationController.java
    dto/LoginRequest.java
    dto/RegisterRequest.java
    dto/AuthResponse.java
    dto/ApplicationRequest.java
    entity/AppUser.java
    entity/JobApplication.java
    repository/UserRepository.java
    repository/JobApplicationRepository.java
    security/JwtService.java
    security/CustomUserDetailsService.java
    service/AuthService.java
    service/JobApplicationService.java
    exception/GlobalExceptionHandler.java
  src/main/resources/application.properties
  pom.xml
7.3 pom.xml
XML
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0
         https://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>
    <parent>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-parent</artifactId>

        <version>3.x.x</version>
        <relativePath/>
    </parent>
    <groupId>com.example</groupId>
    <artifactId>jobtrack</artifactId>
    <version>0.0.1-SNAPSHOT</version>
    <properties>
        <java.version>21</java.version>
    </properties>
    <dependencies>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-data-jpa</artifactId>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-security</artifactId>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-validation</artifactId>
        </dependency>
        <dependency>
            <groupId>com.mysql</groupId>
            <artifactId>mysql-connector-j</artifactId>
            <scope>runtime</scope>
        </dependency>
        <dependency>
            <groupId>io.jsonwebtoken</groupId>
            <artifactId>jjwt-api</artifactId>
            <version>0.12.x</version>
        </dependency>
        <dependency>
            <groupId>io.jsonwebtoken</groupId>
            <artifactId>jjwt-impl</artifactId>
            <version>0.12.x</version>
            <scope>runtime</scope>
        </dependency>
        <dependency>
            <groupId>io.jsonwebtoken</groupId>
            <artifactId>jjwt-jackson</artifactId>
            <version>0.12.x</version>
            <scope>runtime</scope>
        </dependency>
// spring
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-test</artifactId>
            <scope>test</scope>
        </dependency>
    </dependencies>
    <build>
        <plugins>
            <plugin>
                <groupId>org.springframework.boot</groupId>
                <artifactId>spring-boot-maven-plugin</artifactId>
            </plugin>
        </plugins>
    </build>
</project
