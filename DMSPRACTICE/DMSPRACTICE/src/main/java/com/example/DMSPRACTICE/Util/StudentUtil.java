package com.example.DMSPRACTICE.Util;

import com.example.DMSPRACTICE.model.Student;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

public class StudentUtil {

    private static final String FILE_PATH = "students.json";
    private static final ObjectMapper mapper = new ObjectMapper();

    public static List<Student> readStudents() {
        File file = new File(FILE_PATH);
        if (!file.exists()) {
            return new ArrayList<>();
        }
        try {
            return mapper.readValue(file, new TypeReference<List<Student>>() {});
        } catch (IOException e) {
            e.printStackTrace();
            return new ArrayList<>();
        }
    }

    public static void writeStudents(List<Student> students) {
        try {
            mapper.writerWithDefaultPrettyPrinter().writeValue(new File(FILE_PATH), students);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    //add student
    public static void addStudent(Student student) {
        List<Student> students = readStudents();
        students.add(student);
        writeStudents(students);
    }

    //eka student kenek special ganna
    public static Student getStudentById(String id) {
        return readStudents().stream()
                .filter(s -> s.getStudentId().equals(id))
                .findFirst()
                .orElse(null);
    }


    //delete student
    public static void deleteStudent(String id) {
        List<Student> students = readStudents();
        students.removeIf(s -> s.getStudentId().equals(id));
        writeStudents(students);
    }

    //update
    public static void updateStudent(String id, Student updatedStudent) {
        List<Student> students = readStudents();
        for (int i = 0; i < students.size(); i++) {
            if (students.get(i).getStudentId().equals(id)) {
                students.set(i, updatedStudent);
                break;
            }
        }
        writeStudents(students);
    }
}
