"use client"

import { Button } from "@/components";
import { colors, Flex, Text } from "@/design-token";
import { useRouter } from "next/navigation";

export default function NotFound () {
  const router = useRouter();

  return (
    <Flex isColumn={true} gap={20} justifyContent="center" alignItems="center" width="100vw" height="100vh">
      <Flex isColumn={true} gap={4} alignItems="center">
        <Text color={colors.orange[500]} fontSize={60} fontWeight={700}>404</Text>
        <Text fontSize={16} fontWeight={400} color={colors.gray[600]}>이 페이지는 없는 페이지 입니다.</Text>
      </Flex>
      <Button onClick={() => router.back()}>이전 페이지로 이동</Button>
    </Flex>
  )
}