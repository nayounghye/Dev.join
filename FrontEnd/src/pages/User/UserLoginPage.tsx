import React, { ChangeEvent, SyntheticEvent, useEffect, useRef } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import '../../styles/pages/_user_login.scss';
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import app from '../../firebase';
import { setUserInfo } from '../../store/user.slice';
import { useSelector, useDispatch } from 'react-redux';

interface LoginForm {
  userId: string;
  userPw: string;
}

const UserMainPage = () => {
  // firebase OAuth
  const auth = getAuth(app);
  const provider = new GoogleAuthProvider();
  const handleAuth = () => {
    try {
      signInWithPopup(auth, provider).then((result) => {
        console.log('result', result);
      });
    } catch (error) {
      console.log('error', error);
    }
  };

  const navigate = useNavigate();
  const [userId, setUserId] = useState<string>('');
  const [userPw, setUserPw] = useState<string>('');
  const dispatch = useDispatch();

  useEffect(() => {
    // 쿠키 삭제 테스트
  }, []);

  // 중복 로그인 방지
  // 로그인 페이지 들어올 시 리덕스에 로그인 유저 정보가 있을 시 강제로 메인화면 이동
  const loginUser = useSelector((state: any) => state.user.user.u_idx);
  useEffect(() => {
    console.log('loginpage loginUser', loginUser);
    if (loginUser !== null) navigate('/');
  }, [loginUser]);

  // react-hook-form input 초기값 제공하지 않으면 undefined로 관리됨
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<LoginForm>({
    mode: 'onBlur',
    defaultValues: {
      userId: '',
      userPw: '',
    },
  });

  const onUserIdHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setUserId(event.currentTarget.value);
  };
  const onUserPwHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setUserPw(event.currentTarget.value);
  };

  const onSubmit: SubmitHandler<LoginForm> = async (data: LoginForm) => {
    try {
      console.log('성공', data);
      const user = { userid: data.userId, password: data.userPw };
      const response = await axios.post('http://localhost:8000/user/signin', user, {
        withCredentials: true,
      });
      if (response.data.result === true) {
        dispatch(
          setUserInfo({
            u_idx: response.data.u_idx,
            nickname: response.data.nickname,
          })
        );
        navigate('/');
      }
      console.log('response.data.result', response.data.result);
    } catch (error) {
      console.log('error', error);
    }
  };
  const onInvalid = (err: any) => {
    console.log('실패', err);
  };

  return (
    <section>
      <div className="form-wrap">
        <form className="login-form" onSubmit={handleSubmit(onSubmit, onInvalid)}>
          <h1>Login</h1>
          <div className="input-wrap">
            <input
              type="text"
              placeholder="id"
              value={userId}
              {...register('userId', {
                required: 'id를 입력해주세요.',
                pattern: {
                  value: /^[a-zA-Z0-9-]+$/i,
                  message: '잘못된 형식입니다.',
                },
              })}
              name="userId"
              onChange={onUserIdHandler}
            />
            <p className="alert">{errors.userId?.message}</p>
          </div>
          <div className="input-wrap">
            <input
              type="password"
              placeholder="password"
              value={userPw}
              autoComplete="off"
              {...register('userPw', {
                required: 'password를 입력해주세요.',
                // pattern: {
                //   value: /^[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/i,
                //   message: '잘못된 형식입니다.',
                // },
              })}
              name="userPw"
              onChange={onUserPwHandler}
            />
            <p className="alert">{errors.userPw?.message}</p>
          </div>

          <div className="input-wrap">
            <button type="submit" disabled={isSubmitting}>
              로그인
            </button>
          </div>

          <div className="user-wrap">
            <Link to={'/find'}>
              <div>아이디, 비밀번호 찾기</div>
            </Link>
            <Link to={'/signup'}>
              <div>회원가입</div>
            </Link>
          </div>

          <div className="input-wrap">
            <button type="button" onClick={handleAuth}>
              구글로 로그인
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default UserMainPage;
