import OSSImageUpload from '@/components/OSSImageUpload';
import { UPDATE_USER } from '@/graphql/user';
import { useUserContext } from '@/hooks/userHooks';
import {
  PageContainer,
  ProForm,
  ProFormInstance,
  ProFormText,
  ProFormTextArea
} from '@ant-design/pro-components';
import { useMutation } from '@apollo/client';
import { Col, Row, message, Form } from 'antd';
import { useEffect, useRef } from 'react';

/**
 *
 */
const My = () => {
  const formRef = useRef<ProFormInstance>();
  const { store, setStore }: any = useUserContext();

  const [updateUserInfo] = useMutation(UPDATE_USER);

  useEffect(() => {
    if (!store.tel) return;
    formRef.current?.setFieldsValue({
      tel: store.tel,
      name: store.name,
      desc: store.desc,
      avatar: [
        {
          url: store.avatar
        }
      ]
    });
  }, [store]);
  return (
    <PageContainer>
      <ProForm
        formRef={formRef}
        layout="horizontal"
        submitter={{
          resetButtonProps: {
            style: {
              display: 'none'
            }
          }
        }}
        onFinish={async values => {
          console.log('提交表单数据', values);
          const res = await updateUserInfo({
            variables: {
              id: store.id,
              params: {
                name: values.name,
                desc: values.desc,
                avatar: values.avatar[0]?.url || ''
              }
            }
          });
          if (res.data.updateUserInfo.code === 200) {
            // 重新获取用户信息
            const result = await store.refetchHandler?.();
            // 如果获取到用户信息，则更新存储中的姓名和头像信息
            if (result.data.getUserInfo) {
              setStore({
                ...store,
                name: result.data.getUserInfo.name,
                avatar: result.data.getUserInfo.avatar
              });
            }

            message.success(res.data.updateUserInfo.message);
            return;
          }
          message.error(res.data.updateUserInfo.message);
        }}
      >
        <Row gutter={20}>
          <Col>
            <ProFormText name="tel" label="手机号" tooltip="不能修改" disabled />
            <ProFormText name="name" label="昵称" placeholder="请输入昵称" />
            <ProFormTextArea name="desc" label="简介" placeholder="请输入简介信息" />
          </Col>
          <Col>
            <Form.Item label="更改头像" name="avatar">
              <OSSImageUpload />
            </Form.Item>
          </Col>
        </Row>
      </ProForm>
    </PageContainer>
  );
};

export default My;
