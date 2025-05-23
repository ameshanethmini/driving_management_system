package com.example.DMSPRACTICE.Controller;

import com.example.DMSPRACTICE.Util.VehicleUtil;
import com.example.DMSPRACTICE.model.Vehicle;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/vehicles")
public class VehicleController {

    @GetMapping
    public List<Vehicle> getAllVehicles() {
        return VehicleUtil.readVehicles();
    }

    @PostMapping
    public String addVehicle(@RequestBody Vehicle vehicle) {
        VehicleUtil.addVehicle(vehicle);
        return "Vehicle added successfully!";
    }

    @GetMapping("/{id}")
    public Vehicle getVehicleById(@PathVariable String id) {
        return VehicleUtil.getVehicleById(id);
    }

    @PutMapping("/{id}")
    public String updateVehicle(@PathVariable String id, @RequestBody Vehicle updatedVehicle) {
        VehicleUtil.updateVehicle(id, updatedVehicle);
        return "Vehicle updated successfully!";
    }

    @DeleteMapping("/{id}")
    public String deleteVehicle(@PathVariable String id) {
        VehicleUtil.deleteVehicle(id);
        return "Vehicle deleted successfully!";
    }
}
