import { ReactNode } from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface WideButtonProps {
    children: ReactNode;
    href?: string;
    onClick?: () => void; // 커스텀 onClick 추가
    className?: string;
    type?: 'button' | 'submit' | 'reset';
    disabled?: boolean;
}



export function WideButton({ children, href, onClick, className, type = 'button', disabled = false

}: WideButtonProps) {
    const handleClick = () => {
        if (onClick) {
            onClick(); // 부모에서 전달된 onClick 호출
        }
    };

    const buttonClasses = className ? `btn btn-wide ${className}` : 'btn btn-wide';

    if (disabled || !href) {
        return (
            <button
                className={buttonClasses} s
                onClick={handleClick}
                type={type}
                disabled={disabled}  // 비활성화 처리
            >
                {children}
            </button>
        );
    }

    if (href) {
        return (
            <Link href={href}>
                <button
                    className={buttonClasses}
                    type={type}
                    disabled={disabled}
                >
                    {children}
                </button>
            </Link>
        );
    }

    return (
        <button
            className={buttonClasses}
            onClick={handleClick}
            disabled={disabled} // 버튼 클릭 시 handleClick 호출
            type={type}
        >
            {children}
        </button>
    );
}


// 네비게이션 바 버튼 컴포넌트

type SvgButtonForNavProps = {
    children: ReactNode;
}

export function SvgButtonForNav({ children }: SvgButtonForNavProps) {

    return (
        <button>
            {children}
        </button>
    );
}



export function SearchButtonForNav() {

    return (
        <div className='flex justfiy-center items-center gap-2'>
            <button>
                <svg width="24" height="24" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clip-path="url(#clip0_112_3051)">
                        <path d="M19.6934 3.36002C19.1217 2.78836 18.2 2.78836 17.6284 3.36002L7.81671 13.1717C7.36171 13.6267 7.36171 14.3617 7.81671 14.8167L17.6284 24.6284C18.2 25.2 19.1217 25.2 19.6934 24.6284C20.265 24.0567 20.265 23.135 19.6934 22.5634L11.13 14L19.705 5.42502C20.265 4.85336 20.265 3.93169 19.6934 3.36002Z" fill="black" />
                    </g>
                    <defs>
                        <clipPath id="clip0_112_3051">
                            <rect width="28" height="28" fill="white" />
                        </clipPath>
                    </defs>
                </svg>
            </button>
            {<span className='nav-text-search'>
                Search
            </span>}
        </div>
    )
}

type TextLogoButtonForNavProps = {
    children: string;
    className?: string;
}

export function TextLogoButtonForNav({ children, className }: TextLogoButtonForNavProps) {
    return (
        <button>
            <span className={className}>
                {children}
            </span>
        </button>
    )
}


type TextButtonForNavProps = {
    icon?: ReactNode;
    children?: ReactNode;
}
export function TextButtonForNav({ icon, children }: TextButtonForNavProps) {
    return (
        <button className='PostButtonForNav flex items-center gap-2'>
            {icon}
            <span className='nav-text-button'>{children}</span>
        </button>
    )

}

