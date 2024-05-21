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
  Tabs, message,
} from 'antd';
import { useMutation } from '@apollo/client';
import { SEND_CODE_MSG } from '../../graphql/auth';
import styles from './index.module.less';

export default () => {
  const [run] = useMutation(SEND_CODE_MSG);

  return (
    <div className={styles.container}>
      <LoginFormPage
        initialValues={{ mobile: '19357227510' }}
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
            name="mobile"
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
            phoneName="mobile"
            name="code"
            rules={[
              {
                required: true,
                message: '请输入验证码！',
              },
            ]}
            onGetCaptcha={async (tel: string) => {
              const res = await run({
                variables: {
                  tel,
                },
              });

              if (res.data.sendCodeMsg) {
                message.success('获取验证码成功');
              } else {
                message.error('获取验证码失败');
              }
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
};
