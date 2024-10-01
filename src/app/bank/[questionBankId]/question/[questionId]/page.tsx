"use server";
import Title from "antd/es/typography/Title";
import { Avatar, Button, Card, Divider, Flex, Menu, Typography } from "antd";
import "../../index.css";
import { getQuestionBankVoByIdUsingGet } from "@/api/questionBankController";
import QuestionBankVO = API.QuestionBankVO;
import { getQuestionVoByIdUsingGet } from "@/api/questionController";
import { Content } from "antd/es/layout/layout";
import Sider from "antd/es/layout/Sider";
import QuestionVO = API.QuestionVO;
import QuestionCard from "@/components/QuestionCard";
import Link from "next/link";

/**
 * 题库的题目详情页
 * @constructor
 */
// @ts-ignore
export default async function BankQuestionPage({ params }) {
  const { questionBankId, questionId } = params;
  //获取题库详情
  let bank = undefined;
  try {
    const res = await getQuestionBankVoByIdUsingGet({
      id: questionBankId,
      needQueryQuestionList: true,
      pageSize: 200,
    });
    bank = res.data as QuestionBankVO;
  } catch (e) {
    // @ts-ignore
    console.error("获取题库列表失败，" + e.message);
  }
  if (!bank) {
    return <div>获取题库详情失败，请刷新重试</div>;
  }

  //获取题目详情
  let question = undefined;
  try {
    const res = await getQuestionVoByIdUsingGet({
      id: questionId,
    });
    question = res.data;
  } catch (e) {
    // @ts-ignore
    console.error("获取题目列表失败，" + e.message);
  }
  if (!question) {
    return <div>获取题目详情失败，请刷新重试</div>;
  }

  // 题目菜单列表
  const questionMenuItemList = (bank.questionPage?.records || []).map((q) => {
    return {
      label: (
        <Link href={`/bank/${questionBankId}/question/${q.id}`}>{q.title}</Link>
      ),
      key: q.id,
    };
  });

  // @ts-ignore
  return (
    <div id="bankQuestionPage">
      <Flex gap={24}>
        <Sider width={240} theme="light" style={{ padding: "24px 0" }}>
          <Title level={4} style={{ padding: "0 20px" }}>
            {bank.title}
          </Title>
          <Menu items={questionMenuItemList} selectedKeys={[questionId]} />
        </Sider>
        <Content>
          <QuestionCard question={question} />
        </Content>
      </Flex>
    </div>
  );
}
