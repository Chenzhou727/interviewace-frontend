"use server";
import Title from "antd/es/typography/Title";
import { Avatar, Button, Card, Divider, Flex, Typography } from "antd";
import "./index.css";
import { getQuestionBankVoByIdUsingGet } from "@/api/questionBankController";
import Paragraph from "antd/es/typography/Paragraph";
import Meta from "antd/es/card/Meta";
import QuestionList from "@/components/QuestionList";
import QuestionBankVO = API.QuestionBankVO;

/**
 * 题库详情页
 * @constructor
 */
// @ts-ignore
export default async function BankPage({ params }) {
  const { questionBankId } = params;
  let bank = undefined;
  let bankQuestionPage = undefined;

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

  //获取第一道题目,用于开始刷题按钮的跳转
  let firstQuestionId;
  if (bank.questionPage?.records && bank.questionPage.records.length > 0) {
    firstQuestionId = bank.questionPage.records[0].id;
  }

  return (
    <div id="bankPage" className="max-width-content">
      <Card>
        <Meta
          avatar={<Avatar src={bank.picture} size={72} />}
          title={
            <Title level={3} style={{ marginBottom: 0 }}>
              {bank.title}
            </Title>
          }
          description={
            <>
              <Paragraph type="secondary">{bank.description}</Paragraph>
              <Button
                type="primary"
                shape="round"
                href={`/bank/${questionBankId}/question/${firstQuestionId}`}
                target="_blank"
                disabled={!firstQuestionId}
              >
                开始刷题
              </Button>
            </>
          }
        />
      </Card>
      <QuestionList
        questionBankId={questionBankId}
        questionList={bank.questionPage?.records ?? []}
        cardTitle={`题目列表（${bank.questionPage?.total || 0}）`}
      />
    </div>
  );
}
