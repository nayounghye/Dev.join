const express = require('express');
const userController = require('../controller/Cuser');
const router = express.Router();
const boardController = require('../controller/Cboard');
const studyController = require('../controller/Cstudy');
const usedgoodsController = require('../controller/Cusedgoods');
const user = require('../controller/Cuser');
const { upload } = require('../multer/multerConfig');

// router.all('/*', function (req, res, next) {
//   res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, PATCH, DELETE, OPTIONS');
//   res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
//   res.header('Access-Control-Allow-Headers', '*');
//   res.header('Access-Control-Allow-Credentials', true);
//   next();
// });

// 게시판 목록 조회
router.get('/board/list', boardController.board);
// 게시판 등록
router.post('/board/regist', boardController.createBoard);
// 게시판 상세조회
router.get('/board/list/:b_idx', boardController.detailBoard);
// 게시판 수정
// 주소 수정해야함
router.put('/board/list/:b_idx', boardController.modifyBoard);
// 게시판 삭제
// 주소 수정해야함
router.delete('/board/list/:b_idx', boardController.deleteBoard);

// 스터디 리스트
router.get('/study', studyController.getStudies);
// 스터디 등록
router.post('/study/regist', studyController.createStudy);
// 스터디 상세 조회
router.get('/study/detail/:st_idx', studyController.detailStudy);
// 스터디 수정
router.put('/study/detail/:st_idx', studyController.modifyStudy);
// 스터디 삭제
router.delete('/study/delete/:st_idx', studyController.deleteStudy);
// 스터디 참여(?)
router.post('/study/join/:st_idx', studyController.joinStudy);

// 스터디 검색
router.get('/study/search', studyController.searchStudy);

// 중고물품 리스트
router.get('/product', usedgoodsController.getUsedgoods);
// 중고물품 판매하기
router.post('/product/regist', usedgoodsController.createusedGoods);
// 중고물품 상세 조회
router.get('/product/detail/:ud_idx', usedgoodsController.detailusedGoods);
// 중고물품 내용 수정
router.put('/product/detail/:ud_idx', usedgoodsController.modifyusedGoods);
// 중고물품 삭제
router.delete('/product/delete/:ud_idx', usedgoodsController.deleteusedGoods);
// 중고물품 검색
router.get('/product/search', usedgoodsController.searchusedGoods);

// 로그인 페이지
router.get('/signin', userController.signin);

// 회원가입 페이지
router.get('/user/signup', user.signup);
router.post('/user/signup', user.postSignup);

// 아이디 중복확인
router.post('/user/checkid', user.checkId);

// 닉네임 중복확인
router.post('/user/checknickname', user.checkNickname);

// 로그인 페이지
router.get('/user/signin', user.signin);
router.post('/user/signin', user.postSignin);

// 아이디 찾기
router.get('/user/findId', user.findId);
router.post('/user/findId', user.postFindId);

// 비밀번호 찾기
router.get('/user/findPassword', user.findPassword);
router.post('/user/findPassword', user.postFindPassword);

// 비밀번호 변경페이지
router.get('/user/changePassword', user.changePassword);
router.post('/user/changePassword', user.updatePassword);

// 로그아웃
router.get('/user/logout', userController.logout);

// 마이페이지
router.get('/user/mypage', user.mypage);

// 마이페이지 닉네임수정
router.patch('/user/updateMypageNickname', user.updateMypageNickname);

// 마이페이지 비밀번호 수정
router.patch('/user/updateMypagePassword', user.updateMypagePassword);

// 마이페이지 회원 탈퇴
router.delete('/user/deleteAccount', userController.deleteAccount);

router.post(
  '/user/upload',
  upload.single('image'),
  user.uploadImage,
  (error, req, res, next) => {
    if (error) {
      console.error(error);
      res.status(500).json({ message: error.message });
    } else {
      next();
    }
  }
);

const chatRoom = require('../controller/Cchattingroom');
// 소켓룸 생성
router.post('/chatRoom', chatRoom.createChatRoom);
// 방 목록 받아오기
router.get('/chatRoom', chatRoom.renderRooms);
router.get('/chatRoom/:r_idx', chatRoom.renderRoom);
// 방에 입장하기
router.post('/chatRoom/:r_idx', chatRoom.enterRoom);
// 이 방나가기 삭제하기 고민좀...해야할듯?
// 방 나가기
router.delete('/chatRoom/:r_idx', chatRoom.outRoom);

// 방 삭제하기
router.delete('/deleteRoom', chatRoom.deleteChatRoom);

// 채팅 파트
// 채팅 전송
router.post('/chatRoom/:r_idx/chat', chatRoom.createChat);
// 채팅방 내용조회
router.get('/chatRoom/:r_idx/chat', chatRoom.getAllMsg);
// router.get('/chatRoom/:r_idx/chat/:c_content', chatRoom.searchMsg);
module.exports = router;
