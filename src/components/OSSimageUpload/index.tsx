import { useRef, useState } from 'react';
import type { GetProp, UploadFile, UploadProps } from 'antd';
import { Button, Upload, Image } from 'antd';
import { useQuery } from '@apollo/client';
import { GET_OSS_INFO } from '@/graphql/oss';
import ImgCrop from 'antd-img-crop';

interface OSSDataType {
  dir: string;
  expire: string;
  host: string;
  accessId: string;
  policy: string;
  signature: string;
}

interface OSSUploadProps {
  value?: UploadFile;
  onChange?: (file?: UploadFile) => void;
}
type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];
const getBase64 = (file: FileType): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = error => reject(error);
  });

const OSSImageUpload = ({ value, onChange }: OSSUploadProps) => {
  const key = useRef('');
  const { data, refetch } = useQuery<{ getOSSInfo: OSSDataType }>(GET_OSS_INFO);
  const [previewImage, setPreviewImage] = useState('');
  const [previewOpen, setPreviewOpen] = useState(false);
  const OSSData = data?.getOSSInfo;

  const handleChange: UploadProps['onChange'] = ({ file }) => {
    if (file.status === 'removed') {
      onChange?.();
      return;
    }
    const newFile = {
      ...file,
      url: `${OSSData?.host}/${key.current}`
    };
    onChange?.(newFile);
  };

  const getExtraData: UploadProps['data'] = file => {
    const suffix = file.name.slice(file.name.lastIndexOf('.'));
    const filename = Date.now() + suffix;
    key.current = `${OSSData?.dir}/${filename}`;

    return {
      key: key.current,
      OSSAccessKeyId: OSSData?.accessId,
      policy: OSSData?.policy,
      Signature: OSSData?.signature
    };
  };

  const beforeUpload: UploadProps['beforeUpload'] = async file => {
    if (!OSSData) return false;

    const expire = Number(OSSData.expire) * 1000;

    if (expire < Date.now()) {
      await refetch();
    }

    return file;
  };

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as FileType);
    }

    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
  };

  return (
    <div>
      <ImgCrop rotationSlider>
        <Upload
          name="file"
          listType="picture-card"
          fileList={value ? [value] : []}
          action={OSSData?.host}
          onChange={handleChange}
          onPreview={handlePreview}
          data={getExtraData}
          beforeUpload={beforeUpload}
        >
          + 替换头像
        </Upload>
      </ImgCrop>
      {previewImage && (
        <Image
          wrapperStyle={{ display: 'none' }}
          preview={{
            visible: previewOpen,
            onVisibleChange: visible => setPreviewOpen(visible),
            afterOpenChange: visible => !visible && setPreviewImage('')
          }}
          src={previewImage}
        />
      )}
    </div>
  );
};

OSSImageUpload.defaultProps = {
  value: null,
  onchange
};

export default OSSImageUpload;
