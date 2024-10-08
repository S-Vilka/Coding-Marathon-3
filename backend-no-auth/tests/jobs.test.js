const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app"); // Your Express app
const api = supertest(app);
const Job = require("../models/jobModel");

const jobs = [
  {
    title: "Software Junior Developer",
    type: "Part-Time",
    description: "Web Development",
    company:{
        name:"Microsoft",
        contactEmail:"microsoft@outlook.com",
        contactPhone:"123456"
    },
    location: "Remote",
    salary: 40000,
    postedDate: new Date(),
    status: "open",
  },
  {
    title: "Software Senior Developer",
    type: "Full-Time",
    description: "Web Development",
    company:{
        name:"Microsoft",
        contactEmail:"microsoft@outlook.com",
        contactPhone:"123456"
    },
    location: "Helsinki",
    salary: 60000,
    postedDate: new Date(),
    status: "open",
  },
];

describe("Job Controller", () => {
  beforeEach(async () => {
    await Job.deleteMany({});
    await Job.insertMany(jobs);
  });

  afterAll(() => {
    mongoose.connection.close();
  });

  // Test GET /api/jobs
  it("should return all jobs as JSON when GET /api/jobs is called", async () => {
    const response = await api
      .get("/api/jobs")
      .expect(200)
      .expect("Content-Type", /application\/json/);

    expect(response.body).toHaveLength(jobs.length);

    const jobTitles = response.body.map(job => job.title);
    expect(jobTitles).toContain("Software Junior Developer");
    expect(jobTitles).toContain("Software Senior Developer");
  });

  // Test POST /api/jobs
  it("should create a new job when POST /api/jobs is called", async () => {
    const newJob = {
        title: "New Software Developer",
        type: "Part-Time",
        description: "Internship Web Development",
        company:{
            name:"Metropolia",
            contactEmail:"metropolia@outlook.com",
            contactPhone:"123456"
        },
        location: "Espoo",
        salary: 35000,
        status: "open"
    };

    await api
      .post("/api/jobs")
      .send(newJob)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const jobsAfterPost = await Job.find({});
    expect(jobsAfterPost).toHaveLength(jobs.length + 1);
    
    const jobTitles = jobsAfterPost.map((job) => job.title);
    expect(jobTitles).toContain(newJob.title);
  });

  // Test GET /api/jobs/:id
  it("should return one job by ID when GET /api/jobs/:id is called", async () => {
    const job = await Job.findOne();
    const response = await api
      .get(`/api/jobs/${job._id}`)
      .expect(200)
      .expect("Content-Type", /application\/json/);
      
    expect(response.body.title).toBe(job.title);
    expect(response.body.salary).toBe(job.salary);
    expect(response.body.status).toBe(job.status);
  });

  it("should return 404 for a non-existing job ID", async () => {
    const nonExistentId = new mongoose.Types.ObjectId();
    await api.get(`/api/jobs/${nonExistentId}`).expect(404);
  });

  // Test PUT /api/jobs/:id
  it("should update one job with partial data when PUT /api/jobs/:id is called", async () => {
    const job = await Job.findOne();
    const updatedJob = {
        title: "UPDATED Software Senior Developer",
        description: "UPDATED Web Development",
        salary: 70000, // Updated salary
    };  

    await api
      .put(`/api/jobs/${job._id}`)
      .send(updatedJob)
      .expect(200)
      .expect("Content-Type", /application\/json/);

    const updatedJobCheck = await Job.findById(job._id);
    expect(updatedJobCheck.title).toBe(updatedJob.title);
    expect(updatedJobCheck.description).toBe(updatedJob.description);
    expect(updatedJobCheck.salary).toBe(updatedJob.salary);
  });

  it("should return 400 for invalid job ID when PUT /api/jobs/:id", async () => {
    const invalidId = "12345";
    await api.put(`/api/jobs/${invalidId}`).send({}).expect(400);
  });

  // Test DELETE /api/jobs/:id
  it("should delete one job by ID when DELETE /api/jobs/:id is called", async () => {
    const job = await Job.findOne();
    await api.delete(`/api/jobs/${job._id}`).expect(204);

    const deletedJobCheck = await Job.findById(job._id);
    expect(deletedJobCheck).toBeNull();
  });

  it("should return 400 for invalid job ID when DELETE /api/jobs/:id", async () => {
    const invalidId = "12345";
    await api.delete(`/api/jobs/${invalidId}`).expect(400);
  });
});
