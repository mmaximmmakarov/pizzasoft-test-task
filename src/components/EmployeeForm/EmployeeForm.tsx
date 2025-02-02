import React, {useCallback, useEffect} from 'react';
import {Form, Input, Button, Select, Checkbox, DatePicker, Row, Col, Card} from 'antd';
import {useDispatch} from 'react-redux';
import {UserAddOutlined, EditOutlined} from '@ant-design/icons';
import InputMask from 'react-input-mask';
import dayjs from 'dayjs'

import {updateEmployee, addEmployee, Employee} from '../../store/employeeSlice';
import roles from "../../helpers/roles";

import './EmployeeForm.scss';


const EmployeeForm: React.FC<{ employee?: Employee, onSubmit?: Function }> = ({
                                          employee, onSubmit = () => {
  }
                                        }) => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  const isEdit = Boolean(employee);
  console.log(isEdit)
  // Если форма используется для редактирования, загружаем данные сотрудника
  useEffect(() => {
    if (employee) {
      form.setFieldsValue({
        ...employee,
        birthday: dayjs(employee.birthday, 'DD.MM.YYYY'),
      });
    }
  }, [employee, form]);

  const handleSubmit = useCallback((values: any) => {
    const data = {...values, birthday: dayjs(values.birthday).format('DD.MM.YYYY')};
    console.log('submit', data, isEdit)
    if (isEdit) {
      // Если это редактирование существующего сотрудника
      dispatch(updateEmployee({...data, id: employee?.id}));
    } else {
      // Если это создание нового сотрудника
      const newEmployee = {...data, id: Date.now()};
      dispatch(addEmployee(newEmployee));
    }

    onSubmit()
  }, [isEdit, employee]);

  return (
    <div className="employee-form">
      <Card
        title={isEdit ? 'Редактирование сотрудника' : 'Добавление сотрудника'}
        bordered={false}
        className="card"
      >
        <Form form={form} onFinish={handleSubmit} layout="vertical">
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                label="Имя"
                name="name"
                rules={[{required: true, message: 'Пожалуйста, введите имя'}]}
              >
                <Input placeholder="Введите имя сотрудника"/>
              </Form.Item>
            </Col>

            <Col span={24}>
              <Form.Item
                label="Телефон"
                name="phone"
                rules={[{required: true, message: 'Пожалуйста, введите номер телефона'}]}
              >
                <InputMask
                  mask="+7 (999) 999-9999"

                  placeholder="Введите телефон"
                >
                  {/* @ts-ignore */}
                  <Input/>
                </InputMask>
              </Form.Item>
            </Col>

            <Col span={24}>
              <Form.Item
                label="Дата рождения"
                name="birthday"
                rules={[{required: true, message: 'Пожалуйста, введите дату рождения'}]}
              >
                <DatePicker
                  format="DD.MM.YYYY"
                  style={{width: '100%'}}
                  placeholder="Выберите дату рождения"
                />
              </Form.Item>
            </Col>

            <Col span={24}>
              <Form.Item label="Должность" name="role"
                     rules={[{required: true, message: 'Пожалуйста, выберите должность'}]}>
                <Select data-testid="roleSelect" placeholder="Выберите должность">
                  {Object.entries(roles).map(([key, value]) => (
                    <Select.Option key={key} value={key}>
                      {value}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>

            <Col span={24}>
              <Form.Item name="isArchive" valuePropName="checked">
                <Checkbox>В архиве</Checkbox>
              </Form.Item>
            </Col>

            <Col span={24}>
              <Button
                type="primary"
                htmlType="submit"
                block
                icon={isEdit ? <EditOutlined/> : <UserAddOutlined/>}
                data-testid="submitButton"
              >
                {isEdit ? 'Сохранить изменения' : 'Добавить сотрудника'}
              </Button>
            </Col>
          </Row>
        </Form>
      </Card>
    </div>
  );
};

export default EmployeeForm;
