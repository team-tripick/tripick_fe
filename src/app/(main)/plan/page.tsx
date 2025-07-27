'use client';

import { Button, PlanPost } from '@/components';
import { colors, Flex, Text } from '@/design-token';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function Plan() {
  const router = useRouter();
  const [datas, setDatas] = useState<
    {
      id: number;
      title: string;
      content: string;
      date: string;
      keyword: string[];
    }[]
  >([
    {
      id: 1,
      title: '첫 번째 일지',
      content: '오늘은 새로운 프로젝트를 시작했다.',
      date: '2025-07-01',
      keyword: ['프로젝트', '시작'],
    },
    {
      id: 1,
      title: '기획 완료',
      content: '프로젝트 기획서를 작성하고 팀원들과 공유했다.',
      date: '2025-07-02',
      keyword: ['기획', '문서'],
    },
    {
      id: 1,
      title: 'React 구조 설계',
      content: '컴포넌트 구조를 설계하고 라우팅을 설정했다.',
      date: '2025-07-03',
      keyword: ['React', '컴포넌트'],
    },
    {
      id: 1,
      title: 'API 연동 준비',
      content: '백엔드와 API 스펙을 정의하고 연동 준비 완료.',
      date: '2025-07-04',
      keyword: ['API', '백엔드'],
    },
    {
      id: 1,
      title: '로그인 기능 구현',
      content: 'JWT를 이용한 로그인 시스템을 완성했다.',
      date: '2025-07-05',
      keyword: ['로그인', 'JWT'],
    },
    {
      id: 1,
      title: 'UI 개선',
      content: '전체 레이아웃과 버튼 스타일을 다듬었다.',
      date: '2025-07-06',
      keyword: ['UI', '스타일링'],
    },
    {
      id: 1,
      title: '상태 관리 정리',
      content: 'Recoil을 적용하여 상태 관리를 일원화했다.',
      date: '2025-07-07',
      keyword: ['상태관리', 'Recoil'],
    },
    {
      id: 1,
      title: '반응형 디자인 적용',
      content: '모바일, 태블릿에서의 레이아웃을 조정했다.',
      date: '2025-07-08',
      keyword: ['반응형', '미디어쿼리'],
    },
    {
      id: 1,
      title: '서버 에러 처리',
      content: '에러 바운더리와 alert 시스템을 추가했다.',
      date: '2025-07-09',
      keyword: ['에러처리', '경고'],
    },
    {
      id: 1,
      title: '테스트 코드 작성',
      content: 'Jest와 React Testing Library로 기본 테스트 완료.',
      date: '2025-07-10',
      keyword: ['테스트', 'Jest'],
    },
    {
      id: 1,
      title: '다크모드 추가',
      content: '사용자 환경 설정에 따라 테마가 적용되게 했다.',
      date: '2025-07-11',
      keyword: ['다크모드', '테마'],
    },
    {
      id: 1,
      title: '데이터 시각화',
      content: 'Chart.js로 그래프 컴포넌트를 완성했다.',
      date: '2025-07-12',
      keyword: ['Chart.js', '시각화'],
    },
    {
      id: 1,
      title: '알림 기능',
      content: '실시간 알림 기능을 소켓으로 구현했다.',
      date: '2025-07-13',
      keyword: ['알림', '소켓'],
    },
    {
      id: 1,
      title: '배포 테스트',
      content: 'Vercel에 배포 후 오류 테스트 진행함.',
      date: '2025-07-14',
      keyword: ['배포', 'Vercel'],
    },
    {
      id: 1,
      title: '오류 수정',
      content: '404 페이지와 공통 에러 처리를 보완했다.',
      date: '2025-07-15',
      keyword: ['오류', '404'],
    },
    {
      id: 1,
      title: '성능 최적화',
      content: '불필요한 렌더링을 줄이고 코드 스플리팅을 적용.',
      date: '2025-07-16',
      keyword: ['성능', '최적화'],
    },
    {
      id: 1,
      title: 'SEO 작업',
      content: '메타 태그와 sitemap.xml, robots.txt를 추가.',
      date: '2025-07-17',
      keyword: ['SEO', '검색'],
    },
    {
      id: 1,
      title: '유저 테스트',
      content: '사용자 피드백을 받아 UI를 일부 수정함.',
      date: '2025-07-18',
      keyword: ['유저', '피드백'],
    },
  ]);

  return (
    <Flex
      paddingBottom="70px"
      paddingTop="70px"
      paddingLeft="100px"
      paddingRight="100px"
      width="100%"
      isColumn={true}
      gap={16}
    >
      <Flex width="100%" justifyContent="space-between" alignItems="center">
        <Text fontSize={24} fontWeight={600}>
          여행 계획
        </Text>
        <Button onClick={() => router.push('/plan-write')}>
          여행 계획 작성하기
        </Button>
      </Flex>
      <Text
        isSpan={true}
        color={colors.orange[500]}
        fontSize={20}
        fontWeight={600}
      >
        {datas.length}
        <Text isSpan={true} fontSize={20}>
          개
        </Text>
      </Text>
      <Flex width="100%" isColumn={true} gap={12}>
        {datas.map((data, index) => (
          <PlanPost
            onClick={() => router.push(`/plan-detail/:${data.id}`)}
            key={index}
            title={data.title}
            content={data.content}
            date={data.date}
            keyword={data.keyword}
          />
        ))}
      </Flex>
    </Flex>
  );
}
