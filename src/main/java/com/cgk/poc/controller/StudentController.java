package com.cgk.poc.controller;

import com.cgk.poc.model.Student;
import com.cgk.poc.model.StudentRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.Collection;
import java.util.Optional;

@RestController
@RequestMapping("/api")
public class StudentController {

    private final Logger log = LoggerFactory.getLogger(StudentController.class);
    private StudentRepository studentRepository;

    public StudentController(StudentRepository studentRepository) {
        this.studentRepository = studentRepository;
    }

    @GetMapping("/students")
    public Collection<Student> getAllStudents() {
        return studentRepository.findAll();
    }

    @GetMapping("/student/{id}")
    public ResponseEntity<?> getStudent(@PathVariable Long id) {
        Optional<Student> student = studentRepository.findById(id);
        return student.map(response -> ResponseEntity.ok().body(response))
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @PostMapping("/student/add")
    public ResponseEntity<Student> createStudent(@Valid @RequestBody Student student) {
        log.info("Creating student");
        Student result = studentRepository.save(student);
        return ResponseEntity.ok().body(result);
    }

    @PutMapping("/student/{id}")
    public ResponseEntity<Student> updateStudent(@Valid @RequestBody Student student) {
        log.info("Request to update student: {}", student);
        Student result = studentRepository.save(student);
        return ResponseEntity.ok().body(result);
    }

    @DeleteMapping("/student/delete/{id}")
    public ResponseEntity<?> deleteStudent(@PathVariable Long id) {
        log.info("Request to delete group: {}", id);
        studentRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }
}
