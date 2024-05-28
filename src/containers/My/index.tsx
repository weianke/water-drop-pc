import OSSImageUpload from '@/components/OSSimageUpload';
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
import { Col, Row, message } from 'antd';
import { useEffect, useRef } from 'react';

/**
 * 个人信息
 */
const My = () => {
  const formRef = useRef<ProFormInstance>();
  const { store } = useUserContext();
  const [updateUserInfo] = useMutation(UPDATE_USER);

  useEffect(() => {
    if (!store.tel) return;
    formRef.current?.setFieldsValue({
      tel: store.tel,
      name: store.name,
      desc: store.desc,
      avatar: {
        url: store.avatar
      }
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
          console.log('🚀 ~ onFinish={ ~ values:', values);
          const res = await updateUserInfo({
            variables: {
              id: store.id,
              params: {
                name: values.name,
                desc: values.desc,
                avatar: ''
              }
            }
          });
          if (res.data.updateUserInfo.code === 200) {
            // 刷新用户信息
            store.refetchHandler();
            message.success('更新成功');
            return;
          }
          message.error('更新失败');
        }}
      >
        <Row gutter={20}>
          <Col>
            <ProFormText name="tel" label="手机号" tooltip="不能修改" disabled />
            <ProFormText name="name" label="昵称" placeholder="请输入昵称" />
            <ProFormTextArea name="desc" label="简介" placeholder="请输入简介信息" />
          </Col>
          <Col>
            <OSSImageUpload />
          </Col>
        </Row>
      </ProForm>
    </PageContainer>
  );
};

export default My;
