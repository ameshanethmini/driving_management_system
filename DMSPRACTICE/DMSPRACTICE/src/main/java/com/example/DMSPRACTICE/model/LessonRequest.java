package com.example.DMSPRACTICE.model;

public class LessonRequest {
    private String studentId;
    private String studentName;
    private String phone;
    private String email;
    private String course;
    private String dateTime;

    public LessonRequest() {
    }

    public LessonRequest(String studentId, String studentName, String phone, String email, String course, String dateTime) {
        this.studentId = studentId;
        this.studentName = studentName;
        this.phone = phone;
        this.email = email;
        this.course = course;
        this.dateTime = dateTime;
    }

    public String getStudentId() {
        return studentId;
    }

    public void setStudentId(String studentId) {
        this.studentId = studentId;
    }

    public String getStudentName() {
        return studentName;
    }

    public void setStudentName(String studentName) {
        this.studentName = studentName;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getCourse() {
        return course;
    }

    public void setCourse(String course) {
        this.course = course;
    }

    public String getDateTime() {
        return dateTime;
    }

    public void setDateTime(String dateTime) {
        this.dateTime = dateTime;
    }
}