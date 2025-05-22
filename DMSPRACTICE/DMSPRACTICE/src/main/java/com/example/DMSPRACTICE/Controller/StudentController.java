package com.example.DMSPRACTICE.Controller;

import com.example.DMSPRACTICE.model.Student;
import com.example.DMSPRACTICE.Util.StudentUtil;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/students")
public class StudentController {

    @GetMapping
    public List<Student> getAllStudents() {
        return StudentUtil.readStudents();
    }

    //add student
    @PostMapping
    public String addStudent(@RequestBody Student student) {
        StudentUtil.addStudent(student);
        return "Student added successfully!";
    }

    //update
    @PutMapping("/{id}")
    public String updateStudent(@PathVariable String id, @RequestBody Student updatedStudent) {
        StudentUtil.updateStudent(id, updatedStudent);
        return "Student updated successfully!";
    }

    //delete
    @DeleteMapping("/{id}")
    public String deleteStudent(@PathVariable String id) {
        StudentUtil.deleteStudent(id);
        return "Student deleted successfully!";
    }

    //eka student kenek ganna
    @GetMapping("/{id}")
    public Student getStudent(@PathVariable String id) {
        return StudentUtil.getStudentById(id);
    }
}
