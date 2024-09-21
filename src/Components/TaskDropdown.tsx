import { DeleteOutlined, EditOutlined, EllipsisOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Dropdown, Button, Space } from 'antd';

interface TaskDropDownProps {
  taskId: string;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}



const TaskDropDown: React.FC<TaskDropDownProps> = ({ taskId, onEdit, onDelete }) => {
  const items: MenuProps['items'] = [
    {
      label: 'Quick Edit',
      key: '1',
      icon: <EditOutlined />,
    },
    {
      label: 'Delete',
      key: '2',
      icon: <DeleteOutlined />,
      danger: true,
    },
  ];
  
  const handleMenuClick: MenuProps['onClick'] = (e) => {
    if (e.key === '1') {
      onEdit(taskId);
    }
    if (e.key === '2') {
      e.domEvent.stopPropagation();
      onDelete(taskId);
    }
  };

  const menuProps = {
    items,
    onClick: handleMenuClick,
  };

  return (
    <Space.Compact block>
      <Dropdown menu={menuProps} trigger={['click']}>
        <Button
          type="text"
          icon={<EllipsisOutlined size={90} />}
          onClick={(e) => e.stopPropagation()}
          className="rotate-90 bg-transparent border-none"
        />
      </Dropdown>
    </Space.Compact>
  );
};

export default TaskDropDown;
