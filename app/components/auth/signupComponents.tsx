'use client';
import { emailSchema, userNameSchema, userSchema } from "@/schemas/auth";
import { WideButton } from "../button";
import { UseVaildate } from "@/app/hooks/useVaildate";
import { EmailValidateError, UserNameValidateError, UserValidateError } from "@/app/types/signupValidate";
import { boolean, set } from "zod";
import { useEffect, useState } from "react";
import { useSignupStore } from "@/app/types/signupStore";


type Props = {
    message: string;
    error: boolean;
}
type IconProps = {
    error: boolean;
}

export function ValidateIcon({ error }: IconProps) {
    return (
        <span className={`badge badge-xs ${error ? 'badge-error' : 'badge-success'}`}></span>
    );
}

export function ValidateSpan({ message, error }: Props) {
    return (
        <span className="label-text-alt text-left pl-[1.25rem]" style={{ display: error ? 'block' : 'none' }}>
            {message}
        </span>
    );
}


export function SignupStep() {

    const [personalInfoAgree, setpersonalInfoAgree] = useState<boolean>(false);
    const [termsAgree, settermsAgree] = useState<boolean>(false);
    const [isAgree, setIsAgree] = useState<boolean>(false);

    useEffect(() => {
        setIsAgree(personalInfoAgree && termsAgree);
    }, [personalInfoAgree, termsAgree]);

    const checkboxChange = (e: React.ChangeEvent<HTMLInputElement>,
        setFunction: React.Dispatch<React.SetStateAction<boolean>>
    ) => {
        setFunction(e.target.checked);
    };
    return (
        <>
            <head>
                <title>signup</title>  {/* 각 페이지에서 동적으로 타이틀 설정 */}
            </head>
            <div className="card bg-base-100">
                <div className='card-body'>
                    <h1>회원 가입을 진행할게요</h1>
                    <div className="form-control primary">
                        <label className="cursor-pointer label">
                            <span className="label-text">개인정보 및 민감정보 사용 동의</span>
                            <input type="checkbox" className="checkbox checkbox-xs"
                                onChange={(e) => checkboxChange(e, setpersonalInfoAgree)} />
                        </label>
                    </div>
                    <div className="form-control">
                        <label className="cursor-pointer label">
                            <span className="label-text">이용 약관 동의</span>
                            <input type="checkbox" className="checkbox checkbox-xs"
                                onChange={(e) => checkboxChange(e, settermsAgree)} />
                        </label>
                    </div>
                    <WideButton href="/signup/step1" disabled={!isAgree}>다음으로</WideButton>
                </div>
            </div>
        </>

    );
}


export function SignupStep1() {
    const email = useSignupStore(state => state.email);
    const setemail = useSignupStore(state => state.setemail);

    const { errors, validateField } = UseVaildate<EmailValidateError>(emailSchema);
    const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(true);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        validateField(name, value);
        setIsButtonDisabled(!!errors?.email || !value.trim());
        setemail(e.target.value);
    };


    return (
        <form className='flex flex-col gap-[0.75rem] '>
            <label htmlFor="email" className="flex auth-input-label items-center">
                <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="email@example.com"
                    onChange={handleChange}
                    className='auth-placeholder grow text-left' />
                <button className='flex items-center justify-center verify-button-send verify-button nav-text-button'>
                    Send
                </button>
            </label>
            <div>
                {errors?.email && <ValidateSpan message={errors?.email[0]} error={!!errors?.email}></ValidateSpan>}
            </div>

            <label htmlFor="emailVerify" className="flex auth-input-label items-center">
                <input
                    id="emailVerify"
                    name="emailVerify"
                    type="text"
                    placeholder="Enter verification code"
                    className='auth-placeholder grow text-left' />
                <button className='flex items-center justify-center verify-button-send verify-button nav-text-button'>
                    Verify
                </button>
            </label>
            {/* 인증 메시지 처리 넣어줘야함 */}
            <button className='auth-button auth-button-id sign-up-button-text'
                type='submit'
                disabled={isButtonDisabled}
            >Next
            </button>
        </form >
    );
}
export function SignupStep2() {
    const { errors, validateField } = UseVaildate<UserValidateError>(userSchema);
    const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(true);
    const [passwordVisible, setPasswordVisible] = useState<boolean>(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        validateField(name, value);
        setIsButtonDisabled(!!errors?.userId && !!errors?.password || !value.trim());

    };
    const PasswordToggle = () => {
        setPasswordVisible(!passwordVisible);
    }



    return (

        <form className='flex flex-col gap-[0.75rem] '>
            <label htmlFor="userId" className="flex auth-input-label items-center">
                <input
                    id="userId"
                    name="userId"
                    type="userId"
                    placeholder="Enter Your Id"
                    onChange={handleChange}
                    className='auth-placeholder grow text-left' />
                <button className='flex items-center justify-center verify-button-send verify-button nav-text-button'>
                    중복검사
                </button>
            </label>
            <div>
                {errors?.userId && <ValidateSpan message={errors?.userId[0]} error={!!errors?.userId}></ValidateSpan>}
            </div>

            <label htmlFor="password" className="flex auth-input-label items-center">
                <input
                    id="password"
                    name="password"
                    type={passwordVisible ? 'text' : 'password'}
                    placeholder="Enter Your Password"
                    onChange={handleChange}
                    className='auth-placeholder grow text-left' />
                <button type='button' className='flex items-center justify-center' onClick={PasswordToggle}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g clip-path="url(#clip0_112_3055)">
                            <path d="M12 4.5C7 4.5 2.73 7.61 1 12C2.73 16.39 7 19.5 12 19.5C17 19.5 21.27 16.39 23 12C21.27 7.61 17 4.5 12 4.5ZM12 17C9.24 17 7 14.76 7 12C7 9.24 9.24 7 12 7C14.76 7 17 9.24 17 12C17 14.76 14.76 17 12 17ZM12 9C10.34 9 9 10.34 9 12C9 13.66 10.34 15 12 15C13.66 15 15 13.66 15 12C15 10.34 13.66 9 12 9Z" fill="#6A7784" />
                        </g>
                        <defs>
                            <clipPath id="clip0_112_3055">
                                <rect width="24" height="24" fill="white" />
                            </clipPath>
                        </defs>
                    </svg>
                </button>
            </label>
            <div>
                {errors?.password && <ValidateSpan message={errors?.password[0]} error={!!errors?.password}></ValidateSpan>}
            </div>
            <button className='auth-button auth-button-id sign-up-button-text'
                type='submit'
                disabled={isButtonDisabled}
            >Next
            </button>
        </form >

    );
}

export function SignupStep3() {
    const { errors, validateField } = UseVaildate<UserNameValidateError>(userNameSchema);
    const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(true);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        validateField(name, value);
        setIsButtonDisabled(!!errors?.userName || !value.trim());

    };


    return (
        <form className='flex flex-col gap-[0.75rem] '>
            <label htmlFor='profileImage' className='flex items-center gap-8'>
                <button type='button'>
                    <svg width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="60" cy="60" r="60" fill="#F1F3F6" />

                        <g transform="translate(90, 90)">
                            <circle cx="12" cy="12" r="11.5" fill="white" stroke="#C7C7CC" />
                            <g transform="translate(4, 4)">
                                <path d="M8 10C9.10457 10 10 9.10457 10 8C10 6.89543 9.10457 6 8 6C6.89543 6 6 6.89543 6 8C6 9.10457 6.89543 10 8 10Z" fill="#8E8E93" />
                                <path d="M12.8 3.22222H10.898L10.154 2.39722C9.932 2.14667 9.608 2 9.272 2H6.728C6.392 2 6.068 2.14667 5.84 2.39722L5.102 3.22222H3.2C2.54 3.22222 2 3.77222 2 4.44444V11.7778C2 12.45 2.54 13 3.2 13H12.8C13.46 13 14 12.45 14 11.7778V4.44444C14 3.77222 13.46 3.22222 12.8 3.22222ZM8 11.1667C6.344 11.1667 5 9.79778 5 8.11111C5 6.42444 6.344 5.05556 8 5.05556C9.656 5.05556 11 6.42444 11 8.11111C11 9.79778 9.656 11.1667 8 11.1667Z" fill="#8E8E93" />
                            </g>
                        </g>
                    </svg>
                </button>
                <span className='signup-text signup-text-gray'>Set Your Profile Image</span>
            </label>
            <label htmlFor="userName" className="flex auth-input-label items-center">
                <input
                    id="userName"
                    name="userName"
                    type="userName"
                    placeholder="Enter Your Name"
                    onChange={handleChange}
                    className='auth-placeholder grow text-left' />
                <button
                    type='button'
                    className='flex items-center justify-center verify-button-send verify-button nav-text-button'>
                    중복검사
                </button>
            </label>
            <div>
                {errors?.userName && <ValidateSpan message={errors?.userName[0]} error={!!errors?.userName}></ValidateSpan>}
            </div>
            <button className='auth-button auth-button-id sign-up-button-text'
                type='submit'
                disabled={isButtonDisabled}
            >Next
            </button>
        </form>
    );
}

const DropDownIcon = () => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
            <g clip-path="url(#clip0_112_2361)">
                <path d="M11.6133 15.6133L15.0667 19.0666C15.5867 19.5866 16.4267 19.5866 16.9467 19.0666L20.4 15.6133C21.24 14.7733 20.64 13.3333 19.4533 13.3333H12.5467C11.36 13.3333 10.7733 14.7733 11.6133 15.6133Z" fill="black" />
            </g>
            <defs>
                <clipPath id="clip0_112_2361">
                    <rect width="32" height="32" fill="white" />
                </clipPath>
            </defs>
        </svg>
    );
}

export function SignupStep4() {
    const searchData = ["Apple", "Banana", "Cherry", "Date", "Elderberry", "Fig", "Grape"];

    const [searchQuery, setSearchQuery] = useState("");
    const [selectedItems, setSelectedItems] = useState<string[]>([]);

    // 검색어 변경 시 리스트 필터링
    const filteredData = searchData.filter((item) =>
        item.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // 검색어 입력 처리
    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
    };

    // 항목 클릭 시 선택된 항목 추가
    const handleItemClick = (item: string) => {
        if (!selectedItems.includes(item)) {
            setSelectedItems((prev) => [...prev, item]);
        }
    };

    // 뱃지 클릭 시 항목 제거
    const handleBadgeClick = (item: string) => {
        setSelectedItems((prev) => prev.filter((selectedItem) => selectedItem !== item));
    };

    // 회원가입 완료 버튼 클릭 시
    const signupHandler = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log("ID:", userId);
        console.log("PW:", password);


        if (!userId || !password) {
            setErrorMessage('아이디와 비밀번호를 입력해주세요');
            return;
        }

        //로그인 post request

    };



    return (
        <form action="" className='signup-text signup-text-black flex flex-col gap-[8rem]'>
            <div>
                <button type='button' className='profile-dropdown-button'>
                    <span>Select Your Country</span>
                    <DropDownIcon />
                </button>
                <div id="country-list mt-[0.5rem]" className="dropdown-list">
                    <ul>
                        <li className="dropdown-item dropdown-item-top"><span>Korea</span></li>
                        <li className="dropdown-item">USA</li>
                        <li className="dropdown-item">China</li>
                        <li className="dropdown-item">Japan</li>
                        <li className="dropdown-item">Germany</li>
                        <li className="dropdown-item">France</li>
                        <li className="dropdown-item">France</li>
                        <li className="dropdown-item">France</li>
                        <li className="dropdown-item">France</li>
                        <li className="dropdown-item dropdown-item-bottom ">France</li>
                    </ul>
                </div>
            </div>
            <div>
                <button type='button' className='profile-dropdown-button'>
                    <span>Select Your Religion</span>
                    <DropDownIcon />
                </button>
            </div>
            <div>
                <button type='button' className='profile-dropdown-button'>
                    <span>Select Your Food Habits</span>
                    <DropDownIcon />
                </button>
            </div>
        </form >
    );
}