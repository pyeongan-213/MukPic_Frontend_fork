'use client';
import '@/app/(css)/community.css';
import { useEffect, useRef, useState } from 'react';
import '@/app/(css)/auth.css';
import { usePostStore } from '@/app/types/postStore';
import Image from 'next/image';

const DropDownIcon = () => {
    return (
        <svg width="9" height="5" viewBox="0 0 9 5" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4.5 5L0.602885 0.5L8.39711 0.500001L4.5 5Z" fill="#0A0C10" />
        </svg>
    );
}
const ReverseDropdownIcon = () => {
    return (
        <svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M6.5 5L10.3971 9.5L2.60288 9.5L6.5 5Z" fill="#0A0C10" />
        </svg>
    );
}
type CategorySelectDropdownProps = {
    defaultItem?: string; // 기본 선택 항목
    options: string[]; // 드롭다운 옵션 목록
    onSelect: (item: string) => void; // 선택된 항목 전달 콜백
};

export function CategorySelectDropdown({
    defaultItem,
    options,
    onSelect,
}: CategorySelectDropdownProps) {
    const [isOpen, setIsOpen] = useState(false); // 드롭다운 열림 상태
    const [selectedItem, setSelectedItem] = useState<string>(defaultItem ? defaultItem : ''); // 기본 선택 항목
    const dropdownRef = useRef<HTMLDivElement>(null); // 드롭다운 외부 클릭 감지

    // 드롭다운 열기/닫기 토글
    const toggleDropdown = () => {
        setIsOpen((prev) => !prev);
    };

    // 항목 선택
    const selectItem = (item: string) => {
        setSelectedItem(item); // 선택된 항목 업데이트
        setIsOpen(false); // 드롭다운 닫기
        onSelect(item); // 선택된 항목을 상위 컴포넌트로 전달
    };

    // 외부 클릭 시 드롭다운 닫기
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener("click", handleClickOutside);
        return () => document.removeEventListener("click", handleClickOutside);
    }, []);

    return (
        <div ref={dropdownRef} className="dropdown-container">
            <button
                type="button"
                onClick={toggleDropdown}
                className="category-select-button"
            >
                <span>{selectedItem}</span> {/* 버튼에 현재 선택된 항목 표시 */}
                {!isOpen ? <DropDownIcon /> : <ReverseDropdownIcon />}
            </button>
            {isOpen && (
                <div className="food-category-dropdown-list">
                    <ul>
                        {options.map((option) => (
                            <li
                                key={option}
                                className={`food-category-dropdown-item flex ${selectedItem === option ? "selected" : ""
                                    }`}
                                onClick={() => selectItem(option)}
                            >
                                <span className="flex flex-1">{option}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}

export function AddImage() {

    const images = usePostStore((state) => state.images);
    const setImages = usePostStore((state) => state.setImages);
    const imageUrl = usePostStore((state) => state.imageUrl);
    const setImageUrl = usePostStore((state) => state.setImageUrl);

    // 이미지 추가 핸들러
    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files) {
            setImages([...images, ...Array.from(files)]); // 기존 이미지에 새 이미지를 추가
        }
    };

    // 이미지 삭제 핸들러
    const removeImage = (index: number) => {
        if (index < imageUrl.length) {
            setImageUrl(imageUrl.filter((_, i) => i !== index));  // imageUrls에서 삭제
        } else {
            setImages(images.filter((_, i) => i !== (index - imageUrl.length)));  // images에서 삭제
        }
    };



    // 이미지 상태 확인용용
    // useEffect(() => {
    //     console.log('현재 이미지 상태 : ', images);
    // }, [images]); // images 상태가 변경될 때마다 실행

    return (
        <div className='add-image-container'>
            <div className="add-image-button">
                {/* 업로드 버튼 */}
                <label className="add-image-label">
                    <input
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={handleImageUpload}
                        style={{ display: "none" }} // input을 숨기고 커스텀 스타일을 적용
                    />
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
                        <g clipPath="url(#clip0_112_1638)">
                            <path d="M16 20C18.2091 20 20 18.2091 20 16C20 13.7909 18.2091 12 16 12C13.7909 12 12 13.7909 12 16C12 18.2091 13.7909 20 16 20Z" fill="#B1BDCD" />
                            <path d="M26.667 5.33268H22.4403L20.787 3.53268C20.2937 2.98602 19.5737 2.66602 18.827 2.66602H13.1737C12.427 2.66602 11.707 2.98602 11.2003 3.53268L9.56033 5.33268H5.33366C3.86699 5.33268 2.66699 6.53268 2.66699 7.99935V23.9993C2.66699 25.466 3.86699 26.666 5.33366 26.666H26.667C28.1337 26.666 29.3337 25.466 29.3337 23.9993V7.99935C29.3337 6.53268 28.1337 5.33268 26.667 5.33268ZM16.0003 22.666C12.3203 22.666 9.33366 19.6793 9.33366 15.9993C9.33366 12.3193 12.3203 9.33268 16.0003 9.33268C19.6803 9.33268 22.667 12.3193 22.667 15.9993C22.667 19.6793 19.6803 22.666 16.0003 22.666Z" fill="#B1BDCD" />
                        </g>
                        <defs>
                            <clipPath id="clip0_112_1638">
                                <rect width="32" height="32" fill="white" />
                            </clipPath>
                        </defs>
                    </svg>
                    <span className="add-image-text">Add image</span>
                </label>
            </div>

            {/* 이미지 미리보기 - imageUrls */}
            {imageUrl.length > 0 && (
                <>
                    {imageUrl.map((imageUrl, index) => (
                        <div className="image-preview relative" key={index}>
                            <Image
                                src={imageUrl} // URL 기반 이미지
                                alt={`preview-${index}`}
                                className="preview-img"
                                layout="intrinsic"
                                width={400}
                                height={300}
                            />
                            <button className="remove-image-btn" onClick={() => removeImage(index)}>
                                {/* 삭제 버튼 */}
                            </button>
                        </div>
                    ))}
                </>
            )}

            {/* 이미지 미리보기 - images (로컬 파일) */}
            {images.length > 0 && (
                <>
                    {images.map((image, index) => (
                        <div className="image-preview relative" key={index}>
                            <Image
                                src={URL.createObjectURL(image)} // Object URL 생성
                                alt={`preview-${index}`}
                                className="preview-img"
                                layout="intrinsic"
                                width={400}
                                height={300}
                            />
                            <button className="remove-image-btn" onClick={() => removeImage(index + imageUrl.length)}>
                                {/* 삭제 버튼 */}
                            </button>
                        </div>
                    ))}
                </>
            )}
        </div>

    );
}

export function Write() {
    const categoryList: string[] = ["Rice", "Noodle"]; // 드롭다운 옵션
    const setCategory = usePostStore((state) => state.setCategory);
    const title = usePostStore((state) => state.title);
    const setTitle = usePostStore((state) => state.setTitle);
    const contents = usePostStore((state) => state.content);
    const setContents = usePostStore((state) => state.setContent);

    // 내용 입력 최대 글자 수
    const maxLength = 300;

    const contentshandleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        if (e?.target.value.length <= maxLength) {
            setContents(e.target.value);
        }
    }

    const titlehandleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value);
    }



    return (
        <div className="write-wrapper">
            {/* 카테고리 드롭다운 */}
            <CategorySelectDropdown
                defaultItem="Category" // 기본 선택 값 설정
                options={categoryList} // 드롭다운 옵션 전달
                onSelect={(item) => setCategory(item.toUpperCase())} // 선택된 항목 category로로 콜백
            />
            {/* 타이틀 */}
            <label htmlFor="title" className='flex auth-input-label' >
                <input type="text"
                    id='title'
                    placeholder="Title"
                    required
                    className='auth-placeholder grow text-left'
                    maxLength={20}
                    value={title}
                    onChange={titlehandleChange}
                />
            </label>
            {/* 내용 입력 */}
            <label htmlFor="contents">
                <textarea
                    value={contents}
                    name="contents"
                    id="contents"
                    onChange={contentshandleChange}
                    placeholder='What did you eat? Let us know your experience!'
                >
                </textarea>
                <div>
                    <span className='contents-length-span'>({contents.length}/{maxLength})</span>
                </div>
            </label>

            {/* 이미지 추가 */}
            <AddImage />
        </div>
    );
}