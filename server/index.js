const express = require('express')
const Task = require('./models/Task')
const Team = require('./models/Team')
const Project = require('./models/Project')
const Tag = require('./models/Tag')
const User = require('./models/User')
const { initialiseDatabase } = require('./db/db.connect')
const cors = require('cors')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


const app = express()

const port = process.env.PORT

const corsOptions = {
    origin: "*",
    credentials: true,
    optionsSuccessStatus: 200
}

app.use(cors(corsOptions))
app.use(express.json())

initialiseDatabase()


const JWT_SECRET = "workasnaFpAssignment"

app.listen(port, () => {
    console.log("Server is up and running on", port)
})

app.get("/", async (req, res) => {
    res.send("Hello!")
})




//Register
app.post("/auth/signup", async (req, res) => {
    try {
        const {email} = req.body
        const existingUser = await User.findOne({email})

        if(existingUser) {
            return res.status(400).json({message: "Email already exists, please Login"})
        }

        const newUser = new User(req.body)
        const savedUser = await newUser.save()

        res.status(200).json({message: "User added successfully.", user: savedUser})


    } catch (error) {
        console.log(error)
        res.status(500).json({message: "Adding user Failed.", error})
    }  
})

//Login
app.post("/auth/login", async (req, res) => {
    try {
        const {email, password} = req.body
      
        const existingUser = await User.findOne({email}).select('+password')

        if(!existingUser) {
           return res.status(400).json({message: "Invalid email."})
        }

        const isMatch = await bcrypt.compare(password, existingUser.password)

        if(!isMatch) { return res.status(400).json({message: "Incorrect password."})}

        const token = jwt.sign(
            { existingUser },
            JWT_SECRET,
            { expiresIn: '24h' } 
          );
        res.status(200).json({message: "Login Successful", token, user: existingUser})  

    } catch (error) {
        console.log(error)
        res.status(500).json({message: "User Login Failed.", error})
    }
})

//Verify Token
const verifyJWT = (req, res, next) => {
    const token = req.headers["authorization"].split(" ")[1];



    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }

    jwt.verify(token, JWT_SECRET, (error, decoded) => {
        if(error) {
            return res.status(402).json({message: "Invalid token"})
        }
        req.user = decoded.existingUser
        next()
    })
}

//Get User with Token
app.get("/auth/me", verifyJWT, (req, res) => {
    return res.status(200).json(req.user)
})

//Get Users
app.get("/users", async (req, res) => {
    try {
        const users = await User.find()
        res.send(users)
    } catch (error) {
        console.log(error)
        res.status(500).json("Internal server error")
    }
})

//Get Tags
app.get("/tags", async (req, res) => {
    try {
        const tags = await Tag.find()
        res.send(tags)
    } catch (error) {
        console.log(error)
        res.status(500).json("Internal server error")
    }
})

//New Task
app.post("/tasks", async (req, res) => {
    try {
        const newTask = new Task(req.body) 
        newTask.save()
  .then(savedTask => {
    return Task.findById(savedTask._id)
      .populate('owners', 'name')
      .populate('team', 'name')
      .populate('project', 'name')
      .populate('tags', 'name');
  })
  .then(populatedTask => {
    res.status(201).json({message: "New task created successfully.", task: populatedTask});
  }).catch((error) => res.status(500).json({message: "Task creation failed."}))
        
    } catch (error) {
        console.log(error)
        res.status(500).json({message: "Task creation failed."})
    }   
})

//Get Tasks
app.get("/tasks", async (req, res) => {

    try {
    const {team, owners, project, status, tags} = req.query
    const filter = {}

    const ownerNames = owners ? owners.split(",").map(o => o.replace(/([a-z])([A-Z])/g, '$1 $2').trim()) : []
    const tagNames = tags ? tags.split(",").map(t => t.replace(/([a-z])([A-Z])/g, '$1 $2').trim()) : []

    const [ownerDetail, teamDetail, projectDetail] = await Promise.all([
        ownerNames.length > 0 ? User.find({name: {$in: ownerNames}}) : [],
        team ? Team.findOne({name: team}) : null,
        project ? Project.findOne({name: project}) : null
    ])

    if(owners) {
        if(ownerDetail) {
            filter.owners = {$in: ownerDetail.map(owner => owner._id)}
        } 
    }

    if(tags) {
            filter.tags = {$in: tagNames}
        } 
    

    if(project) {
        if(projectDetail) {
            filter.project = projectDetail._id
        }
    }

    if(team) {
        if(teamDetail) {
            filter.team = teamDetail._id
        }
    }

    if(status) {
        filter.status = status.replace(/([a-z])([A-Z])/g, '$1 $2').trim()
    }

    const tasks = await Task.find(filter).populate('owners', 'name')
    .populate('team', 'name')
    .populate('project', 'name')
    .populate('tags', 'name');

    res.send(tasks)
    } catch (error) {
        console.log(error)
        res.status(500).json({error: 'Internal server error.'})
    }

})


//Update Task
app.post("/tasks/:id", async (req, res) => {
    try {
        const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, {new: true}).populate('owners', 'name')
    .populate('team', 'name')
    .populate('project', 'name')
    .populate('tags', 'name');
        res.status(201).json({message: "Task updated successfully", task: updatedTask})
    } catch (error) {
        console.log(error)
        res.status(500).json({message: "Failed to update task."})
    }
})

//Delete Task
app.delete("/tasks/:id", async (req, res) => {
    try {
        const deletedTask = await Task.findByIdAndDelete(req.params.id)
        res.status(201).json({message: "Task deleted successfully."})
    } catch (error) {
        console.log(error)
        res.status(500).json({message: "Failed to delete task."})
    }
})


//New Team
app.post("/teams", async (req, res) => {

    try {
        const {name} = req.body
        const existingTeam = await Team.findOne({name})

        if(existingTeam) {
            return res.status(400).json({message: "Team Already Exists."})
        }

        const newTeam = new Team(req.body);
        await newTeam.save(); 

        const populatedTeam = await Team.findById(newTeam._id).populate('members');

    res.status(201).json({
      message: "New team created successfully.",
      team: populatedTeam,
    });

 } catch (error) {
        res.status(500).json({message: "Team creation failed."})
    }
})

//add new team member
app.post("/teams/:team_id/member", async (req, res) => {

    const {member} = req.body
    try {
        const team = await Team.findById(req.params.team_id)
        team.members.push(member)
        await team.save()
        const populatedTeam = await Team.findById(req.params.team_id).populate('members');
        res.status(201).json({message: "New team member added successfully.", team: populatedTeam})
    } catch (error) {
        console.log(error)
        res.status(500).json({message: "Failed to add member."})
    }
})

//Get Teams
app.get("/teams", async (req, res) => {
    try {
        const teams = await Team.find().populate('members')
        res.send(teams)
    } catch (error) {
        console.log(error)
        res.status(500).json("Internal server error")
    }
})


//New Project
app.post("/projects", async (req, res) => {
    try {
        const {name} = req.body
        const existingProject = await Project.findOne({name})

        if(existingProject) {
            return res.status(400).json({message: "Project Already Exists."})
        }
        const newProject = new Project(req.body) 
        const savedProject = await newProject.save()
        res.status(201).json({message: "New project created successfully.", project: savedProject})
    } catch (error) {
        res.status(500).json({message: "Project creation failed."})
    }
})



//Get Projects
app.get("/projects", async (req, res) => {
    const {name} = req.query
    const filter = {}

    if(name) {
        filter.name = name
    }

    try {
        const projects = await Project.find(filter)
        res.send(projects)
    } catch (error) {
        console.log(error)
        res.status(500).json("Internal server error")
    }
})

//last week reports
app.get("/report/last-week", async (req, res) => {

    try {
        const oneWeekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
    const tasks = await Task.aggregate([
        {
            $match: {
                updatedAt: {$gte: oneWeekAgo},
                status: "Completed"
            }
        },
        {
            $group: {
                _id: {
                    $dateToString: { format: "%d-%m-%Y", date: "$updatedAt" }
                },
                count: {$sum: 1}
            }
        },
        {
            $sort: {_id: 1}
        }
    ])

    res.send(tasks)

    } catch (error) {
        console.log(error)
    }
})


//pending reports
app.get("/report/pending", async (req, res) => {

    try {
    const tasks = await Task.find({status: {$ne: "Completed"}})

    const simplifiedTasks = tasks.map(({ name, timeToComplete }) => ({ name, timeToComplete }));

    // const totalDaysPendingWork = tasks.reduce((acc, curr) =>  acc += curr.timeToComplete, 0)
    res.send(simplifiedTasks)

    } catch (error) {
        console.log(error)
    }
})


//closed tasks report
app.get("/report/closed-tasks", async (req, res) => {
    try {

        const groupByProject = await Task.aggregate([
            {
                $match: {status: "Completed"}
            },
            {
                $group: {
                    _id : "$project",
                    count: {$sum: 1}
                }
            }
        ])

        const groupByTeam = await Task.aggregate([
            {$match: {status: "Completed"}},
            {
                $group: {
                    _id: "$team",
                    count: {$sum: 1}
                }
            }
        ])

        const groupByOwners = await Task.aggregate([
            {
                $match: {status: "Completed"}
            },
            {
                $unwind: {path: "$owners"}
            },
            {
                $group: {
                    _id: "$owners",
                    count: {$sum: 1}
                }
            }
        ])

        const byTeam = await Team.populate(groupByTeam, { path: '_id', select: 'name' });
        const byProject = await Project.populate(groupByProject, { path: '_id', select: 'name' });
        const byOwners = await User.populate(groupByOwners, { path: '_id', select: 'name' });

        res.status(200).json({
            byOwners,byProject,byTeam
        })
    

    } catch (error) {
        console.log(error)
    res.status(500).json({ error: 'Internal server error' });
    }
})


   