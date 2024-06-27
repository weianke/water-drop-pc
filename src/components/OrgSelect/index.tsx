import { useUserContext } from '@/hooks/userHooks';
import { useOrganizations } from '@/services/org';
import { LOCAL_CURRENT_ORG } from '@/utils/constants';
import { Select, Space } from 'antd';
import { debounce } from 'lodash-es';
import { currentOrg } from '@/utils';
import { useGoTo } from '@/hooks';
import { useEffect } from 'react';
import { ROUTE_KEY } from '@/routes/menus';

/**
 * 门店选择器
 */
const OrgSelect = ({}) => {
  const { data, refetch } = useOrganizations(1, 10, true);
  const { setStore } = useUserContext();
  const { go } = useGoTo();

  // 初始设置当前门店
  useEffect(() => {
    if (currentOrg()?.value) {
      setStore({
        currentOrg: currentOrg().value
      });
    } else {
      go(ROUTE_KEY.NO_ORG);
    }
  }, []);

  const onSearchHandler = debounce((name: string) => {
    refetch({ name });
  }, 500);

  const onChangeHandler = (val: { value: string; label: string }) => {
    setStore({
      currentOrg: val.value
    });
    localStorage.setItem(LOCAL_CURRENT_ORG, JSON.stringify(val));
  };
  return (
    <Space>
      选择门店：
      <Select
        style={{ width: 200 }}
        placeholder="请选择门店"
        showSearch
        onSearch={onSearchHandler}
        filterOption={false}
        defaultValue={currentOrg()}
        onChange={onChangeHandler}
        labelInValue
      >
        {data?.map(item => (
          <Select.Option value={item.id} key={item.id}>
            {item.name}
          </Select.Option>
        ))}
      </Select>
    </Space>
  );
};

export default OrgSelect;
