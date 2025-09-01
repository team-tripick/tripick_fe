'use client'

import { ExitIcon, SendIcon } from "@/assets";
import { Inputs } from "@/components";
import { colors, Flex, Text } from "@/design-token";
import styled from "@emotion/styled";
import { useRouter, useParams } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import io, { Socket } from 'socket.io-client';
import Cookies from 'js-cookie';
import { useGetChatUserHistory, useUserIdProfile, useUserMe } from "@/apis";

interface ChatMessage {
  id: string;
  message: string;
  sender: {
    id: string;
    name: string;
    isMe: boolean;
  };
  receiver: {
    id: string;
    name: string;
  };
  timestamp: string;
  isRead: boolean;
}

export default function Chat() {
  const router = useRouter();
  const params = useParams();
  const userId = params.id as string;
  
  const [name, setName] = useState<string>('');
  const [chat, setChat] = useState<string>("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [socket, setSocket] = useState<Socket | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [error, setError] = useState<string>('');
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const {data : chatHistoryData, isLoading, error: chatError} = useGetChatUserHistory(userId)
  const {data : userProfileData} = useUserIdProfile(userId)

  useEffect(() => {
    if (chatHistoryData) {
      setMessages(chatHistoryData);
    }
  },[chatHistoryData])

  useEffect(() => {
    setName(userProfileData?.name || '사용자')
  },[userId, userProfileData])

  // WebSocket 연결
  useEffect(() => {
    const token = Cookies.get('accessToken');
    if (!token || !userId || isLoading) return;

    const newSocket = io(process.env.NEXT_PUBLIC_BASE_URL, {
      transports: ['websocket', 'polling']
    });

    setSocket(newSocket);

    newSocket.on('connect', () => {
      newSocket.emit('authenticate', token);
    });

    newSocket.on('authenticated', (data) => {
      if (data.success) {
        setIsConnected(true);
        newSocket.emit('join_room', { receiverId: userId });
      }
    });

    newSocket.on('authentication_error', (error) => {
      setError('인증에 실패했습니다.');
    });

    newSocket.on('room_joined', (data) => {
      console.log('채팅방 입장:', data);
    });

    newSocket.on('new_message', (message: ChatMessage) => {
      setMessages(prev => [...prev, message]);
    });

    newSocket.on('user_typing', (data) => {
      setIsTyping(data.isTyping);

      if (data.isTyping) {
        if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
        typingTimeoutRef.current = setTimeout(() => setIsTyping(false), 3000);
      }
    });

    newSocket.on('error', (error) => {
      setError(error.message || '연결 오류가 발생했습니다.');
    });

    newSocket.on('disconnect', () => {
      setIsConnected(false);
    });

    return () => {
      if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
      newSocket.disconnect();
    };
  }, [userId, isLoading]);

  const handleChatChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChat(e.target.value);

    if (socket && isConnected) {
      if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);

      socket.emit('typing', { receiverId: userId, isTyping: e.target.value.length > 0 });

      typingTimeoutRef.current = setTimeout(() => {
        socket.emit('typing', { receiverId: userId, isTyping: false });
      }, 2000);
    }
  };

  const handleSendClick = () => {
    if (!chat.trim() || !socket || !isConnected) return;

    socket.emit('send_message', { receiverId: userId, message: chat.trim() });
    setChat('');
    socket.emit('typing', { receiverId: userId, isTyping: false });
    if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSendClick();
  };

  const handleExitClick = () => {
    socket?.disconnect();
    router.back();
  }

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit', hour12: false });
  };

  if (isLoading) {
    return (
      <Flex justifyContent="center" alignItems="center" height="100vh">
        <Text>로딩 중...</Text>
      </Flex>
    );
  }

  if (error) {
    return (
      <Flex isColumn gap={20} justifyContent="center" alignItems="center" height="100vh">
        <Text color={colors.error}>오류: {error}</Text>
        <button onClick={() => router.back()}>돌아가기</button>
      </Flex>
    );
  }

  return (
    <div>
      <HeaderWrapper>
        <Flex gap={44} alignItems="center">
          <BtnWrapper onClick={handleExitClick}><ExitIcon/></BtnWrapper>
          <Flex gap={20} alignItems="center">
            <Text fontSize={24} fontWeight={600}>{name}</Text>
            {!isConnected && <Text fontSize={14} color={colors.error}>연결 안됨</Text>}
          </Flex>
        </Flex>
      </HeaderWrapper>

      <ChatContainer>
        {messages.map((message) => (
          <MessageContainer key={message.id} isMe={message.sender.isMe}>
            {/* 받는 메시지일 때만 이름 표시 */}
            {!message.sender.isMe && (
              <SenderName>{message.sender.name}</SenderName>
            )}
            
            <MessageBubble isMe={message.sender.isMe}>
              {message.message}
            </MessageBubble>
            
            <MessageTime isMe={message.sender.isMe}>
              {formatTime(message.timestamp)}
            </MessageTime>
          </MessageContainer>
        ))}

        {isTyping && (
          <TypingIndicator>
            <Text fontSize={16} fontWeight={400} color={colors.gray[500]}>
              {name}님이 입력 중...
            </Text>
          </TypingIndicator>
        )}

        <div ref={messagesEndRef} />
      </ChatContainer>

      <InputWrapper>
        <Inputs 
          value={chat} 
          onChange={handleChatChange} 
          onKeyUp={handleKeyPress} 
          placeholder="메시지를 입력하세요..." 
        />
        <ChatBtn onClick={handleSendClick} disabled={!isConnected || !chat.trim()}>
          <SendIcon/>
        </ChatBtn>
      </InputWrapper>
    </div>
  )
}

// 스타일 컴포넌트들
const HeaderWrapper = styled.div`
  padding: 16px 40px;
  border-bottom: 1px solid ${colors.gray[200]};
  background-color: white;
  position: fixed;
  top: 70px;
  left: 0;
  z-index: 10;
  width: 100vw;
`;

const ChatContainer = styled.div`
  height: calc(100vh - 200px);
  overflow-y: auto;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const MessageContainer = styled.div<{isMe: boolean}>`
  display: flex;
  flex-direction: column;
  align-items: ${({isMe}) => isMe ? 'flex-end' : 'flex-start'};
  max-width: 80%;
  align-self: ${({isMe}) => isMe ? 'flex-end' : 'flex-start'};
  gap: 4px;
`;

const SenderName = styled.div`
  font-size: 14px;
  font-weight: 500;
  color: ${colors.gray[600]};
  margin-bottom: 4px;
  padding: 0 8px;
`;

const MessageBubble = styled.div<{isMe: boolean}>`
  font-size: 16px;
  font-weight: 400;
  padding: 12px 16px;
  border-radius: 18px;
  background-color: ${({isMe}) => isMe ? colors.orange[500] : colors.gray[100]};
  color: ${({isMe}) => isMe ? 'white' : colors.gray[900]};
  word-wrap: break-word;
  max-width: 100%;
  
  /* 말풍선 꼬리 효과 */
  position: relative;
  
  ${({isMe}) => isMe ? `
    border-bottom-right-radius: 4px;
  ` : `
    border-bottom-left-radius: 4px;
  `}
`;

const MessageTime = styled.div<{isMe: boolean}>`
  font-size: 12px;
  color: ${colors.gray[500]};
  padding: 0 8px;
  align-self: ${({isMe}) => isMe ? 'flex-end' : 'flex-start'};
`;

const TypingIndicator = styled.div`
  align-self: flex-start;
  padding: 12px 16px;
  background-color: ${colors.gray[100]};
  border-radius: 18px;
  border-bottom-left-radius: 4px;
`;

const InputWrapper = styled.div`
  width: 100%;
  padding: 20px;
  position: fixed;
  bottom: 0;
  left: 0;
  display: flex;
  align-items: flex-end;
  gap: 12px;
  background-color: white;
  border-top: 1px solid ${colors.gray[200]};
  
  @media(max-width: 480px) {
    margin-bottom: 62px;
  }
`;

const ChatBtn = styled.button<{disabled?: boolean}>`
  padding: 19px;
  border-radius: 12px;
  background-color: ${({disabled}) => disabled ? colors.gray[300] : colors.orange[500]};
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: ${({disabled}) => disabled ? 'not-allowed' : 'pointer'};
  border: none;
  opacity: ${({disabled}) => disabled ? 0.6 : 1};
  transition: all 0.2s ease;
`;

const BtnWrapper = styled.button`
  cursor: pointer;
  padding: 12px;
  border-radius: 8px;
  border: 1px solid ${colors.gray[300]};
  background-color: ${colors.gray[200]};
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.2s ease;
  
  &:hover {
    background-color: ${colors.gray[300]};
  }
`;