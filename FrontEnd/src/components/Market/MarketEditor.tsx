import React, {
  useRef,
  useState,
  useEffect,
  ChangeEvent,
  FormEvent,
} from 'react';
import '../../styles/style.scss';
import { BsImage } from 'react-icons/bs'; // 이미지 아이콘
import MarketCategory from './MarketCategory';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { SassColor } from 'sass';

// 데이터 타입
interface DataType {
  category: string;
  location: string;
  title: string;
  price: number | null;
  description: string;
  image: File | null;
  textarea: string;
}

const MarketEditor: React.FC = () => {
  // 글자수
  const [titleLength, setTitleLength] = useState(0);
  const [textareaLength, setTextareaLength] = useState(0);
  // 리다이렉트용
  const navigate = useNavigate();
  // 가격 형식
  const [formattedPrice, setFormattedPrice] = useState('');

  // 데이터 초기값
  const [DataType, setDataType] = useState<DataType>({
    category: '',
    location: '',
    title: '',
    price: null,
    description: '',
    image: null,
    textarea: '',
  });

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setDataType({ ...DataType, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setDataType({ ...DataType, image: e.target.files[0] });
    }
  };

  const handleCategoryChange = (category: string) => {
    setDataType({ ...DataType, category });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log(DataType);
    // 여기에 게시글 제출 로직 추가
  };

  // 제목창 이벤트핸들러
  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newTitle = e.target.value;
    setTitleLength(newTitle.length); // 타이틀 길이 업데이트
    setDataType({ ...DataType, title: newTitle });
  };

  // 설명창 관련 ---------------------------------------------------------------

  // 설명창 이벤트핸들러
  const handleTextareaChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const newDescription = e.target.value;
    setTextareaLength(newDescription.length); // 설명 길이 업데이트
    setDataType({ ...DataType, textarea: newDescription });
  };

  // 가격창 관련 ---------------------------------------------------------------

  const onlyNumber = (value: string) => {
    // 숫자만 허용
    const numbersOnly = value.replace(/[^0-9]/g, '');
    // 숫자를 Number 타입으로 변환하고, 1억 이하의 값으로 제한
    const limitedValue = Math.min(Number(numbersOnly), 100000000);
    // 숫자를 문자열로 변환하고, 정규식을 사용하여 3자리마다 쉼표 추가
    return limitedValue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  // 가격창 입력 핸들러
  const handlePriceChange = (e: ChangeEvent<HTMLInputElement>) => {
    const numbersOnly = e.target.value.replace(/[^0-9]/g, '');
    const limitedValue = Math.min(Number(numbersOnly), 100000000);
    setDataType({ ...DataType, price: limitedValue }); // 1억 이하로 제한
    setFormattedPrice(
      limitedValue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    ); // 숫자만 가능
  };

  return (
    <div id="marketeditor" className="market_editor">
      <form onSubmit={handleSubmit}>
        <section className="market-img">
          상품이미지
          <span style={{ color: '#fcbaba' }}>＊</span>
          <div className="img_container">
            <input type="file" id="market-img" name="img" />
            <label htmlFor="market-img">
              <div className="market-img">
                <BsImage />
                <div>이미지등록</div>
              </div>
            </label>
          </div>
        </section>
        <section className="market-title">
          상품명<span style={{ color: '#fcbaba' }}>＊</span>
          <div className="text_container">
            <input
              type="text"
              id="market-title"
              name="title"
              maxLength={40}
              onChange={handleTitleChange}
            />
            <span className="title-length">{titleLength}/40</span>
          </div>
        </section>
        <section className="market-category">
          <div className="market-category">
            카테고리<span style={{ color: '#fcbaba' }}>＊</span>
            <MarketCategory />
          </div>
        </section>
        <section className="market-region">
          거래지역<span style={{ color: '#fcbaba' }}>＊</span>
          <div className="region_container">
            <input type="text" id="market-region" name="region" />
          </div>
        </section>
        <section className="market-price">
          가격<span style={{ color: '#fcbaba' }}>＊</span>
          <div className="price_container">
            <label htmlFor="market-price">
              <span>₩</span>
              <input
                type="text"
                id="market-price"
                name="price"
                value={formattedPrice}
                onChange={handlePriceChange}
              />
            </label>
          </div>
        </section>
        <section className="market-textarea">
          설명<span style={{ color: '#fcbaba' }}>＊</span>
          <div className="textarea_container">
            <textarea
              id="market-textarea"
              name="textarea"
              maxLength={1000}
              onChange={handleTextareaChange}
            />
            <div className="textarea-length">{textareaLength}/1000</div>
          </div>
        </section>
        <button className="marketeditor-regi" type="submit">
          등록
        </button>
      </form>
    </div>
  );
};

export default MarketEditor;