const express = require('express');
const postRouter = require('./routes/post');
const postsRouter = require('./routes/posts');
const userRouter = require('./routes/user');
const cors = require('cors');
const session = require('express-session');
const morgan = require('morgan');
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

app.use(morgan('dev'));
app.use(
  cors({
    origin: true,
    credentials: true,
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

app.use('/post', postRouter);
app.use('/posts', postsRouter);
app.use('/user', userRouter);

// 에러처리 미들웨어
// 에러를 특별하게 처리하고 싶을 때
// 예) 에러페이지가 따로 있을 때?
app.use((err, req, res, next) => {});

app.listen(3065, () => {
  console.log('서버 실행중');
});
