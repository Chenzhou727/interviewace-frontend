"use client";
import { TablePaginationConfig } from "antd";
import { useRef, useState } from "react";
import { ActionType, ProColumns, ProTable } from "@ant-design/pro-components";
import TagList from "@/components/TagList";
import { listQuestionVoByPageUsingPost } from "@/api/questionController";
import Link from "next/link";

interface Props {
  defaultQuestionList?: API.QuestionVO[];
  defaultTotal?: number;
  defaultSearchParams?: API.QuestionQueryRequest;
}

/**
 * 题目表格组件
 * @constructor
 */
export default function QuestionTable(props: Props) {
  const { defaultQuestionList, defaultTotal, defaultSearchParams = {} } = props;
  const [questionList, setQuestionList] = useState<API.QuestionVO[]>(
    defaultQuestionList || [],
  );
  const [total, setTotal] = useState<number>(defaultTotal || 0);
  const [init, setInit] = useState<boolean>(true);
  const actionRef = useRef<ActionType>();

  /**
   * 表格列配置
   */
  const columns: ProColumns<API.QuestionVO>[] = [
    {
      title: "标题",
      dataIndex: "title",
      valueType: "text",
      render: (_, record) => {
        return <Link href={`/question/${record.id}`}>{record.title}</Link>;
      },
    },
    {
      title: "标签",
      dataIndex: "tagList",
      valueType: "select",
      fieldProps: {
        mode: "tags",
      },
      render: (_, record) => {
        return <TagList tagList={record.tagList} />;
      },
    },
  ];

  // @ts-ignore
  return (
    <div className="question-table">
      <ProTable<API.QuestionVO>
        actionRef={actionRef}
        size="large"
        search={{
          labelWidth: "auto",
        }}
        form={{
          initialValues: defaultSearchParams,
        }}
        dataSource={questionList}
        pagination={
          {
            pageSize: 12,
            showTotal: (total) => `总共 ${total} 条`,
            showSizeChanger: false,
            total,
          } as TablePaginationConfig
        }
        // @ts-ignore
        request={async (params, sort, filter) => {
          //首次请求
          if (init) {
            setInit(false);
            if (defaultQuestionList && defaultTotal) {
              return;
            }
          }
          const sortField = Object.keys(sort)?.[0] || "createTime";
          const sortOrder = sort?.[sortField] || "descend";

          // @ts-ignore
          const { data, code } = await listQuestionVoByPageUsingPost({
            ...params,
            sortField,
            sortOrder,
            ...filter,
          } as API.QuestionQueryRequest);

          // 更新结果
          const newTotal = Number(data.total) || 0;
          setTotal(newTotal);
          const newData = data.records || [];
          setQuestionList(newData);
          return {
            success: code === 0,
            data: newData,
            total: newTotal,
          };
        }}
        columns={columns}
      />
    </div>
  );
}
