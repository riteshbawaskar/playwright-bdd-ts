import express from 'express';
import path from 'path';
const app = express();
const port = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(process.cwd(), 'demo', 'public')));

app.post('/login', (req, res) => {
  const { username, password } = req.body;
  // simple check matching .env creds is not possible here; keep demo simple
  if (username === 'testuser' && password === 'Password@123') {
    res.redirect('/employee');
  } else {
    res.redirect('/login?error=1');
  }
});

app.listen(port, () => {
  console.log(`Demo app running at http://localhost:${port}`);
});
