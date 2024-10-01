"use client";

import React from "react";
import { LoginForm, ProForm, ProFormText } from "@ant-design/pro-form";
import { message } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { userRegisterUsingPost } from "@/api/userController";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { AppDispatch } from "@/stores";
import { useDispatch } from "react-redux";
import "./index.css";

/**
 * 用户注册页面
 * @param props
 */
const userRegisterPage: React.FC = (props) => {
  const [form] = ProForm.useForm();
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  /**
   * 提交
   * @param values
   */
  const doSubmit = async (values: API.UserRegisterRequest) => {
    try {
      const res = await userRegisterUsingPost(values);
      console.log(typeof res);

      if (res.data) {
        message.success("注册成功，去登陆");
        //前往登录页
        router.replace("/user/login");
        form.resetFields();
      }
    } catch (e: any) {
      message.error("注册失败，" + e.message);
    }
  };

  return (
    <div id="userRegisterPage">
      <LoginForm<API.UserAddRequest>
        form={form}
        logo={
          <Image
            src="/assets/logo.png"
            alt="Interview Ace"
            width={44}
            height={44}
          />
        }
        title="Interview Ace - 用户注册"
        subTitle="面试刷题网站"
        onFinish={doSubmit}
        submitter={{
          searchConfig: {
            submitText: "注册",
          },
        }}
      >
        <ProFormText
          name="userAccount"
          fieldProps={{
            size: "large",
            prefix: <UserOutlined />,
          }}
          placeholder={"请输入用户账号"}
          rules={[
            {
              required: true,
              message: "请输入用户账号!",
            },
          ]}
        />
        <ProFormText.Password
          name="userPassword"
          fieldProps={{
            size: "large",
            prefix: <LockOutlined />,
          }}
          placeholder={"请输入密码"}
          rules={[
            {
              required: true,
              message: "请输入密码！",
            },
          ]}
        />
        <ProFormText.Password
          name="checkPassword"
          fieldProps={{
            size: "large",
            prefix: <LockOutlined />,
          }}
          placeholder={"请输入确认密码"}
          rules={[
            {
              required: true,
              message: "请输入确认密码！",
            },
          ]}
        />
        <div
          style={{
            marginBlockEnd: 24,
            textAlign: "end",
          }}
        >
          已有账号？
          <Link prefetch={false} href={"/user/login"}>
            去登录
          </Link>
        </div>
      </LoginForm>
    </div>
  );
};

export default userRegisterPage;
