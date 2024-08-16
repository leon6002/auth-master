import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import React from "react";
import ReactMarkdown from "react-markdown";

const PrivacyPolicyPage = () => {
  const content = `
  # 隐私政策

## 概览

欢迎阅读 ${process.env.NEXT_PUBLIC_COMPANY_NAME} 的隐私政策。本文件解释了在您使用我们基于人工智能的旅行规划和体验分享平台时，我们如何收集、使用和保护您的个人信息。我们致力于保护您的隐私，并最大程度地关心和尊重您的个人数据。

## 信息收集与使用

### 1.数据收集

我们收集个人信息，如电子邮件地址用于账户创建。为了提升您的体验，我们也可能收集旅行偏好、行程安排、地理位置数据和设备信息。在我们的平台上用户生成的内容可能包括自愿分享的个人细节。

### 2.个人数据的使用

您的数据使我们能够个性化和改进我们的服务。它用于账户管理、服务优化、沟通以及符合法律要求。我们也可能用它提供相关的优惠和更新。

### 3.数据保护和用户权利

数据安全和保留
我们采用先进的安全措施来保护您的数据免受未经授权的访问和丢失。数据仅在为我们的运营需求和法律合规性所必需的时间内保留。

### 4.用户权利

您有权访问、更正或删除您的个人数据。您也可以选择退出营销通讯并调整您的隐私设置。

### 5.更新和联系信息

政策更新
本隐私政策可能会定期更新。重大变更将通过我们的平台或电子邮件进行通知。

### 6.联系信息

对于任何与隐私相关的问题或关切，请通过 ${process.env.NEXT_PUBLIC_CONTACT_EMAIL} 与我们联系。

  `;
  return (
    <MaxWidthWrapper className="flex items-center justify-center">
      <div className="prose h-full w-full py-10">
        <ReactMarkdown>{content}</ReactMarkdown>
      </div>
    </MaxWidthWrapper>
  );
};

export default PrivacyPolicyPage;
