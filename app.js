const express = require("express");
const app = express();
const port = 3000;

const doctors = [
  {
    id: 1,
    name: "Dr. Smith",
    availableDays: ["Monday", "Wednesday", "Friday"],
    maxPatients: 10,
  },
  {
    id: 2,
    name: "Dr. Johnson",
    availableDays: ["Tuesday", "Thursday", "saturday"],
    maxPatients: 8,
  },
  {
    id: 3,
    name: "Dr.Sekhar",
    availableDays: ["Wednesday", "Thursday"],
    maxPatients: 6,
  },
  {
    id: 4,
    name: "Dr.Arjun",
    availableDays: ["Monday", "Thursday", "Saturday", "Wednesday"],
    maxPatients: 12,
  },
  {
    id: 5,
    name: "Dr.Sasi",
    availableDays: ["Sunday", "Thursday"],
    maxPatients: 7,
  },
  {
    id: 6,
    name: "Dr.Mounika",
    availableDays: ["Tuesday", "Thursday", "Friday"],
    maxPatients: 9,
  },
  {
    id: 7,
    name: "Dr.Rajesh",
    availableDays: ["Wednesday", "Thursday", "Saturday"],
    maxPatients: 11,
  },
  {
    id: 8,
    name: "Dr.Sekhar",
    availableDays: ["Wednesday", "Friday", "Sunday"],
    maxPatients: 5,
  },
];

app.use(express.json());

app.get("/doctors", (req, res) => {
  res.json(doctors);
});

app.get("/doctors/:id", (req, res) => {
  const doctorId = parseInt(req.params.id);
  const doctor = doctors.find((d) => d.id === doctorId);
  if (!doctor) {
    res.status(404).json({ message: "Doctor not found" });
  } else {
    res.json(doctor);
  }
});

app.post("/book-appointment/:id", (req, res) => {
  const doctorId = parseInt(req.params.id);
  const doctor = doctors.find((d) => d.id === doctorId);
  if (!doctor) {
    res.status(404).json({ message: "Doctor not found" });
  } else {
    if (doctor.availableDays.includes(req.body.day)) {
      if (doctor.maxPatients > 0) {
        doctor.maxPatients--;
        res.json({ message: "Appointment booked successfully" });
      } else {
        res.status(400).json({ message: "Doctor has no available slots" });
      }
    } else {
      res.status(400).json({ message: "Doctor is not available on this day" });
    }
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
