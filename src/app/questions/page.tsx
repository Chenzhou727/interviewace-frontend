"use server";
import Title from "antd/es/typography/Title";
import "./index.css";
import { listQuestionVoByPageUsingPost } from "@/api/questionController";
import QuestionTable from "@/components/QuestionTable";

/**
 * 题目列表页面
 * @constructor
 */
// @ts-ignore
export default async function QuestionsPage({ searchParams }) {
  const { q: searchText } = searchParams;
  let questionList: any[] = [];
  let total: number = 0;

  try {
    const questionRes = await listQuestionVoByPageUsingPost({
      title: searchText,
      pageSize: 12,
      sortField: "createTime",
      sortOrder: "desc",
    });
    questionList = questionRes.data.records ?? [];
    total = questionRes.data.total ?? 0;
  } catch (e) {
    // @ts-ignore
    console.error("获取题目列表失败，" + e.message);
  }

  return (
    <div id="questionsPage" className="max-width-content">
      <Title level={3}>题目大全</Title>
      <QuestionTable
        defaultQuestionList={questionList}
        defaultTotal={total}
        defaultSearchParams={{
          title: searchText,
        }}
      />
    </div>
  );
}
