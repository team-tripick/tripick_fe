'use client'

import { ChatIcon, HomeIcon, PlanIcon, MypageIcon } from "@/assets"
import { colors } from "@/design-token";
import styled from "@emotion/styled"
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react"


export default function NavBar() {

  const [nav, setNav] = useState<string>("home");
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if(pathname.includes('plan')|| pathname.includes('log')) {
      setNav('plan')
    } else if(pathname.includes('mypage')) {
      setNav('mypage')
    } 
    // else if(pathname.includes('chat')) {
    //   setNav('chat')
    // } 
    else {
      setNav("home")
    }
  },[pathname])

  return (
    <NavContainer>
      <PlanIcon isNav={nav === "plan"} onClick={() => router.push('/plan')}/>
      {/* <ChatIcon isNav={nav === "chat"} onClick={() => router.push('/chat-list')}/> */}
      <HomeIcon isNav={nav === "home"} onClick={() => router.push('/')}/>
      <MypageIcon isNav={nav === "mypage"} onClick={() => router.push('/mypage')}/>
    </NavContainer>
  )
}

const NavContainer = styled.footer `
  display: none;
  @media (max-width : 480px) {
    z-index: 100;
    display: flex;
    width: 100%;
    padding: 16px 60px;
    position: fixed;
    bottom: 0;
    left: 0;
    gap: 52px;
    align-items: center;
    background-color: ${colors.gray[100]};
    justify-content:center ;
  }
`