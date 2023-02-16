const express = require('express');
const postRouter = require('./routes/post');
const userRouter = require('./routes/user');
const cors = require('cors');
const session = require('express-session');

const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const db = require('./models');
const passportConfig = require('./passport');
const passport = require('passport');

dotenv.config();
const app = express();
// db테이블 생성
db.sequelize
  .sync()
  .then(() => console.log('db연결성공'))
  .catch(() => console.error);

passportConfig();

app.use(
  cors({
    origin: true,
    credentials: false,
  }),
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(
  session({
    saveUninitialized: false,
    ressave: false,
    secret: process.env.COOKIE_SECRET,
  }),
);
app.use(passport.initialize());
app.use(passport.session());

app.get('/', (req, res) => {
  res.send('hello express');
});

app.get('/posts', (req, res) => {
  res.json([
    { id: 1, content: 'hello1' },
    { id: 2, content: 'hello2' },
    { id: 3, content: 'hello3' },
  ]);
});

app.use('/post', postRouter);
app.use('/user', userRouter);

app.listen(3065, () => {
  console.log('서버 실행중');
});
