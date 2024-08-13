import React, { useEffect } from 'react';
import './Japanese.css';
import { CiLocationOn } from 'react-icons/ci';
import { TiLockClosed } from 'react-icons/ti';
import { MdMobileFriendly } from 'react-icons/md';
import chequingImage from '../images/chequing.jpg';
import { useNavigate } from 'react-router-dom';

const Japanese = () => {
    const [language, setLanguage] = React.useState('japanese');
    const navigate = useNavigate();

    useEffect(() => {
        console.log(language);
        if (language === 'french') {
            navigate('/newcomp');
        }
        if (language === 'english') {
            navigate('/english');
        }
    }, [language]);

    const handleLanguageChange = (event) => {
        setLanguage(event.target.value);
    };

    return (
        <div className="container">
            <div className="row justtify-content-center align-items-center">
                <div className="col">
                    <select value={language} onChange={handleLanguageChange}>
                        <option value="japanese">日本語</option>
                        <option value="french">フランス語</option>
                        <option value="english">英語</option>
                    </select>
                </div>
            </div>
            <div className="row justify-content-center align-items-center">
                <div className="col-lg-6 col-md-10 col-sm-12 mt-sm-1 main-heading d-flex align-items-center justify-content-center">
                    <h5 className="text-center">あなたのニーズに合った正しい普通預金口座を見つける</h5>
                </div>
            </div>
            <div className="row align-item-center justify-content-center mt-3">
                <div className="col-lg-8 col-md-10 col-sm-12 d-flex align-items-center justify-content-center">
                    <p>
                        当社の普通預金口座について知るためのすべての情報を見つけ、あなたの金融ニーズに最適なものを見つけてください。
                        機能、特典、手数料（あれば）、および資格要件を探索して、情報を元にした意思決定を行います。
                        学生、若手プロフェッショナル、または経験豊富な銀行家であっても、あなたに合った普通預金口座があります。
                    </p>
                </div>
            </div>
            <div className="row justify-content-center align-items-center mt-4 p-2">
                <div className="col-lg-2 d-flex align-items-center justify-content-center">
                    <h5 className="features-heading">特徴</h5>
                </div>
            </div>
            <div className="row justify-content-center align-items-center card-account mt-4">
                <div className="col-lg-4 col-md-6 align-items-center justify-content-center single-feature p-1">
                    <div className="icon">
                        <CiLocationOn />
                    </div>
                    <p>さまざまな場所での便利な現金の引き出しと預け入れのための大規模なATMネットワークへのアクセス</p>
                </div>
                <div className="col-lg-4 col-md-6 align-items-center justify-content-center single-feature p-1">
                    <div className="icon">
                        <TiLockClosed />
                    </div>
                    <p>不正アクセスや詐欺行為に対して口座と取引を保護するための堅牢な不正防止対策の恩恵を受ける</p>
                </div>
                <div className="col-lg-4 col-md-6 align-items-center justify-content-center single-feature p-1">
                    <div className="icon">
                        <MdMobileFriendly />
                    </div>
                    <p>オンライン口座管理、請求書支払い、モバイルチェック入金など、バンキング体験を向上させるために設計されたデジタルツールのスイートを活用する</p>
                </div>
            </div>
            <div className="row justify-content-center align-items-center card-account mt-4 mb-4">
                <div className="col-lg-4 p-2 col-md-12 col-sm-12 d:flex align-items-center justify-content-center">
                    <img src={chequingImage} className="img-fluid" alt="Chequing Account" />
                </div>
                <div className="col-lg-8 col-md-12 col-sm-12 align-items-center justify-content-center point-list">
                    <h6>特典:</h6>
                    <ul>
                        <li>当社の標準普通預金口座は、日常の銀行業務でのシンプルさと使いやすさを好む方に最適です。</li>
                        <li>手数料：月間維持手数料なし。</li>
                    </ul>
                    <button>詳細を見る</button>
                </div>
            </div>
        </div>
    );
};

export default Japanese;
