import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Header from './components/Layout/Header';
import Sidebar from './components/Layout/Sidebar';
import Main from './pages/Main/Main';
import StudyMainPage from './pages/Study/StudyMainPage';
import StudyDetailPage from './pages/Study/StudyDetailPage';
import StudyEditPage from './pages/Study/StudyEditPage';
import MarketMainPage from './pages/Market/MarketMainPage';
import MarketEditPage from './pages/Market/MarketEditPage';
import MarketDetailPage from './pages/Market/MarketDetailPage';
import UserLoginPage from './pages/User/UserLoginPage';
import UserSignupPage from './pages/User/UserSignupPage';
import UserMyPage from './pages/User/UserMyPage';
import UserFindPage from './pages/User/UserFindPage';
import UserHeartListPage from './pages/User/UserHeartListPage';
import StudyModify from './components/Study/StudyModify';
import StudySearchPage from './pages/Study/StudySearchPage';
import MarketModify from './components/Market/MarketModify';
import ChatPage from './pages/Chat/ChatPage';
import MarketSearchPage from './pages/Market/MarketSearchPage';
import MainLogo from './components/Main/MainLogo';

function App() {
  return (
    <BrowserRouter>
      {/* 레이아웃 - 헤더/사이드바/메인 */}
      <Header />
      <Sidebar />
      <Main>
        <Routes>
          {/* 메인 */}
          <Route path="/" element={<MainLogo />} />
          {/* <Route path="/" element={<UserLoginPage />}></Route> */}
          {/* 유저관련 페이지 */}
          <Route path="/login" element={<UserLoginPage />}></Route>
          <Route path="/signup" element={<UserSignupPage />}></Route>
          <Route path="/user" element={<UserMyPage />}></Route>
          <Route path="/find" element={<UserFindPage />}></Route>
          <Route path="/heart" element={<UserHeartListPage />}></Route>

          {/* 중고마켓 */}
          <Route path="/market" element={<MarketMainPage />} />
          <Route path="/market/edit" element={<MarketEditPage />} />
          <Route
            path="/product/detail/:ud_idx"
            element={<MarketDetailPage />}
          />
          <Route path="/product/modify" element={<MarketModify />} />
          <Route path="/product/search" element={<MarketSearchPage />} />

          {/* 스터디게시판 */}
          <Route path="/study" element={<StudyMainPage />}></Route>
          <Route path="/study/edit" element={<StudyEditPage />}></Route>
          <Route
            path="/study/detail/:st_idx"
            element={<StudyDetailPage />}
          ></Route>
          <Route path="/study/modify" element={<StudyModify />}></Route>
          <Route path="/study/search" element={<StudySearchPage />}></Route>
          <Route path="/study/search" element={<StudySearchPage />}></Route>
          {/* 채팅페이지 */}
          <Route path="/chatting" element={<ChatPage />}></Route>
        </Routes>
      </Main>
    </BrowserRouter>
  );
}

export default App;
