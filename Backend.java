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
