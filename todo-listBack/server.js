const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient()

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});

// Register user
app.post('/register', async (req, res) => {
  try {
    const { email, password ,name } = req.body;
      // if((email=""|null)|(password=""|null)|(name=""|null))
      // {res.status(500).json({error : "can't add empty user"})
      //  }
      // else{
      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // Create user in database
      const user = await prisma.user.create({
        data: {
          email,
          password: hashedPassword,
          name,
        },
      });
  
      res.json(user);
    
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to register user' });
    }
  }
  );
  
  // Login user
  app.post('/login', async (req, res) => {
    try {
      const { email, password } = req.body;
      
      // Find user by email
      const user = await prisma.user.findUnique({
        where: { email },
      });
      
      if (!user) {
        return res.status(401).json({ error: 'Invalid email or password' });
      }
      
      // Check password
      const isPasswordValid = await bcrypt.compare(password, user.password);
      
      if (!isPasswordValid) {
        return res.status(401).json({ error: 'Invalid email or password' });
      }
      
      // Generate JWT
      const token = jwt.sign({ userId: user.id }, 'secret');
      
      res.json({ token , userid:user.id, username:user.name});
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to login' });
    }
  });
  
  
  // Create a new note
  app.post('/notes', async (req, res) => {
  try {
    
    const { content, userId} = req.body;

    const note = await prisma.note.create({
      data: {
        content,
        Author: { connect: { id: userId } },
      },
    });

    res.json(note);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create note' });
  }
});

// Get all notes for a user
app.get('/notes/:userId', async (req, res) => {
  try {
    const { userId } = req.params;

    const notes = await prisma.note.findMany({
      where: { userId: parseInt(userId, 10) },
    });

    res.json(notes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to get notes' });
  }
});
// delete a note
app.delete('/notes', async (req, res) => {
  try {
    
    const { content, userId} = req.body;

    const note = await prisma.note.deleteMany({
      where :{userId : parseInt(userId, 10),content}
    })

    res.json(note);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to delete note' });
  }
});

const auth = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' })
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.userId = decoded.userId
    next()
  } catch (err) {
    return res.status(401).json({ message: 'Unauthorized' })
  }
}

app.use(auth)
