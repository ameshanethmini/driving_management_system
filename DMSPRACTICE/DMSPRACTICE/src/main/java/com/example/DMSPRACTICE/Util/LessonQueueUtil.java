package com.example.DMSPRACTICE.Util;

import com.example.DMSPRACTICE.model.LessonRequest;

import java.util.LinkedList;
import java.util.Queue;
import java.util.List;
import java.util.ArrayList;

public class LessonQueueUtil {
    private static final Queue<LessonRequest> requestQueue = new LinkedList<>();

    public static void addRequest(LessonRequest request) {
        requestQueue.add(request);
    }

    public static LessonRequest processNextRequest() {
        return requestQueue.poll();
    }

    public static List<LessonRequest> getAllRequests() {
        return new ArrayList<>(requestQueue);
    }

    public static void clearAll() {
        requestQueue.clear();
    }
}
