package com.example.DMSPRACTICE.model;

import com.fasterxml.jackson.annotation.JsonProperty;

public class Student {

    @JsonProperty("fullName")
    private String name;

    @JsonProperty("studentId")
    private String studentId;

    @JsonProperty("email")
    private String email;

    @JsonProperty("password")
    private String password;

    public Student() {}

    public Student(String name, String studentId, String email, String password) {
        this.name = name;
        this.studentId = studentId;
        this.email = email;
        this.password = password;
    }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getStudentId() { return studentId; }
    public void setStudentId(String studentId) { this.studentId = studentId; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }
}
