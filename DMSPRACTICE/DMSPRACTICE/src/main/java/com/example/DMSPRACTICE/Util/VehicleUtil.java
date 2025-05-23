package com.example.DMSPRACTICE.Util;

import com.example.DMSPRACTICE.model.Vehicle;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

public class VehicleUtil {

    private static final String FILE_PATH = "data/vehicles.json";
    private static final ObjectMapper mapper = new ObjectMapper();

    public static List<Vehicle> readVehicles() {
        File file = new File(FILE_PATH);
        if (!file.exists()) {
            return new ArrayList<>();
        }
        try {
            return mapper.readValue(file, new TypeReference<List<Vehicle>>() {});
        } catch (IOException e) {
            e.printStackTrace();
            return new ArrayList<>();
        }
    }

    public static void writeVehicles(List<Vehicle> vehicles) {
        try {
            File file = new File(FILE_PATH);


            File parentDir = file.getParentFile();
            if (parentDir != null && !parentDir.exists()) {
                parentDir.mkdirs();
            }

            mapper.writerWithDefaultPrettyPrinter().writeValue(file, vehicles);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    public static void addVehicle(Vehicle vehicle) {
        List<Vehicle> vehicles = readVehicles();
        vehicles.add(vehicle);
        writeVehicles(vehicles);
    }

    public static Vehicle getVehicleById(String id) {
        return readVehicles().stream()
                .filter(v -> v.getVehicleId().equals(id))
                .findFirst()
                .orElse(null);
    }

    public static void updateVehicle(String id, Vehicle updatedVehicle) {
        List<Vehicle> vehicles = readVehicles();
        for (int i = 0; i < vehicles.size(); i++) {
            if (vehicles.get(i).getVehicleId().equals(id)) {
                vehicles.set(i, updatedVehicle);
                break;
            }
        }
        writeVehicles(vehicles);
    }

    public static void deleteVehicle(String id) {
        List<Vehicle> vehicles = readVehicles();
        vehicles.removeIf(v -> v.getVehicleId().equals(id));
        writeVehicles(vehicles);
    }
}
