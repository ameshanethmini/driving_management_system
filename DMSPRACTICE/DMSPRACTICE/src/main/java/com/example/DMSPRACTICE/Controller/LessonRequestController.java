package com.example.DMSPRACTICE.Controller;

import com.example.DMSPRACTICE.model.LessonRequest;
import com.example.DMSPRACTICE.Util.LessonQueueUtil;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/lesson-queue")
public class LessonRequestController {

    @PostMapping
    public String addLessonRequest(@RequestBody LessonRequest request) {
        LessonQueueUtil.addRequest(request);
        return "✅ Lesson request added to queue!";
    }

    @GetMapping
    public List<LessonRequest> getAllRequests() {
        return LessonQueueUtil.getAllRequests();
    }

    @DeleteMapping("/next")
    public LessonRequest processNextRequest() {
        return LessonQueueUtil.processNextRequest();
    }

    @DeleteMapping("/clear")
    public String clearQueue() {
        LessonQueueUtil.clearAll();
        return "✅ All lesson requests cleared!";
    }
}
