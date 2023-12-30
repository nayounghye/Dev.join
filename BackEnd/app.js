const express = require('express');
const path = require('path');
const app = express();
const http = require('http');
const server = http.createServer(app);
const PORT = 8000;
const router = require('./routes');
const session = require('express-session');
const cors = require('cors');
const Chattingroom = require('./model/Chattingroom');
app.use(cors());

const io = require('socket.io')(server, {
  cors: {
    origin: 'http://localhost:3000',
  },
});

app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/public', express.static(path.join(__dirname, 'public')));

app.use('/', router);

app.use(
  session({
    secret: 'secret key', // 비밀키를 설정합니다.
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 60 * 60 * 1000, // 세션 유지 시간을 한 시간으로 설정합니다.
    },
  })
);

// 미들웨어를 사용하여 모든 뷰에 로그인 상태(세션)를 전달
app.use((req, res, next) => {
  res.locals.isAuthenticated = req.session.isAuthenticated;
  res.locals.user = req.session.user;
  console.log(res.locals.user);
  next();
});

app.use(async (req, res, next) => {
  if (req.session.isAuthenticated) {
    // const commentCount = await Comment.count({
    //   where: { id: req.session.user.id },
    // });
    // const Map_DatabaseCount = await Map_Database.count({
    //   where: { id: req.session.user.id },
    // });
    // const boardCount = await Board.count({
    //   where: { id: req.session.user.id },
    // });
    // res.locals.commentCount = commentCount;
    // res.locals.Map_DatabaseCount = Map_DatabaseCount;
    // res.locals.boardCount = boardCount;
  }

  next();
});
// 소켓 연결시
io.on('connection', (socket) => {
  console.log('Socket connected:', socket.id);

  // 클라이언트가 소켓 룸 생성 요청
  socket.on('newRoom', async (room) => {
    const newRoom = await Chattingroom.create(room);
    console.log(`room created: ${newRoom}`);
  });

  // 사용자 방에 입장시 join
  socket.on('joinroom', async (r_idx) => {
    const room = await Chattingroom.findAll({
      where: {
        r_idx: r_idx,
        // r_name: r_name,
      },
    }).then((result) => {
      if (room) {
        // 방이 있을 시에만 join
        socket.join(r_idx);
        console.log(`user joinedRoom: ${r_idx}, ${r_name}`);
      } else {
        console.log('없는 방인디????');
      }
    });
  });

  // 다른 소켓 이벤트 핸들러 등록!!!
});

server.listen(PORT, function () {
  console.log(`Sever Open: ${PORT}`);
});
