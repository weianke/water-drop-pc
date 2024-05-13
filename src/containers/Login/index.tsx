/* eslint-disable react/no-unstable-nested-components */
import {
  LockOutlined,
  MobileOutlined,
} from '@ant-design/icons';
import {
  LoginFormPage,
  ProFormCaptcha,
  ProFormCheckbox,
  ProFormText,
} from '@ant-design/pro-components';
import {
  Tabs,
} from 'antd';
import styles from './index.module.less';

export default () => (
  <div className={styles.container}>
    <LoginFormPage
      initialValues={{ tel: '19357227510' }}
      backgroundImageUrl="https://gw.alipayobjects.com/zos/rmsportal/FfdJeJRQWjEeGTpqgBKj.png"
      logo="http://water-drop-assets.oss-cn-hangzhou.aliyuncs.com/images/henglogo.png"
    >
      <Tabs
        centered
        items={[{
          key: 'phone',
          label: '手机号登录',
        }]}
      />
      <>
        <ProFormText
          fieldProps={{
            size: 'large',
            prefix: <MobileOutlined className="prefixIcon" />,
          }}
          name="tel"
          placeholder="手机号"
          rules={[
            {
              required: true,
              message: '请输入手机号！',
            },
            {
              pattern: /^1\d{10}$/,
              message: '手机号格式错误！',
            },
          ]}
        />
        <ProFormCaptcha
          fieldProps={{
            size: 'large',
            prefix: <LockOutlined className="prefixIcon" />,
          }}
          captchaProps={{
            size: 'large',
          }}
          placeholder="请输入验证码"
          captchaTextRender={(timing, count) => {
            if (timing) {
              return `${count} ${'获取验证码'}`;
            }
            return '获取验证码';
          }}
          phoneName="tel"
          name="code"
          rules={[
            {
              required: true,
              message: '请输入验证码！',
            },
          ]}
          onGetCaptcha={async () => {
            // const res = await run({
            //   variables: {
            //     tel,
            //   },
            // });
            // if (res.data.sendCodeMsg.code === 200) {
            //   message.success(res.data.sendCodeMsg.message);
            // } else {
            //   message.error(res.data.sendCodeMsg.message);
            // }
          }}
        />
      </>
      <div
        style={{
          marginBlockEnd: 24,
        }}
      >
        <ProFormCheckbox noStyle name="autoLogin">
          自动登录
        </ProFormCheckbox>
      </div>
    </LoginFormPage>
  </div>
);