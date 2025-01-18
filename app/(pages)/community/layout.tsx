import type { Metadata } from "next";
import "@/app/globals.css";
import TopNav from "@/app/components/TopNav";
import { ReactNode } from "react";
import { TextAndIconButton, TextLogoButtonForNav } from "@/app/components/button";


export const metadata: Metadata = {
    title: "MukPic-community",
};

type LayoutProps = {
    children: ReactNode;
};

export default function Layout({ children }: LayoutProps) {
    return (
        <div className="root-wrapper">
            <TopNav
                leftButton={<TextLogoButtonForNav className="nav-text">Community</TextLogoButtonForNav>}
                rightButton={<TextAndIconButton icon={
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M11.9302 2C11.4858 2 11.0413 2.16924 10.7021 2.5085L9.98251 3.22808L12.4387 5.68424L13.1582 4.96466C13.8361 4.28676 13.8361 3.18701 13.1582 2.5085C12.819 2.16924 12.3746 2 11.9302 2ZM9.06145 4.14914L2 11.2106V13.6667H4.45616L11.5176 6.6053L9.06145 4.14914Z" fill="white" />
                    </svg>
                }
                >
                    Post
                </TextAndIconButton>}
            />
            {children}
        </div>



    );
}
