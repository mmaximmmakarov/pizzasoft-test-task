// src/components/EmployeeForm.tsx
import React, { useEffect } from 'react';
import { Form, Input, Button, Select, Checkbox, DatePicker, Row, Col, Card } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { updateEmployee, addEmployee } from '../../store/employeeSlice';
import { useNavigate } from 'react-router';
import { UserAddOutlined, EditOutlined } from '@ant-design/icons';
import InputMask from 'react-input-mask';
import dayjs from 'dayjs'

import roles from "../../helpers/roles";

import './EmployeeForm.scss';


const EmployeeForm: React.FC<{ employeeId?: number }> = ({ employeeId }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const employee = useSelector((state: any) =>
        state.employees.employees.find((emp: any) => emp.id === employeeId)
    );
    const [form] = Form.useForm();

    // Если форма используется для редактирования, загружаем данные сотрудника
    useEffect(() => {
        if (employee && employeeId) {
            form.setFieldsValue({
                ...employee,
                birthday: dayjs(employee.birthday, 'DD.MM.YYYY'),
            });
        }
    }, [employee, form, employeeId]);

    const handleSubmit = (values: any) => {
        if (employeeId) {
            // Если это редактирование существующего сотрудника
            dispatch(updateEmployee({ ...values, id: employeeId }));
        } else {
            // Если это создание нового сотрудника
            const newEmployee = { ...values, id: Date.now(), isArchive: false };
            dispatch(addEmployee(newEmployee));
        }

        navigate('/'); // После добавления или редактирования сотрудника возвращаем на главную страницу
    };

    return (
        <div className="employee-form">
            <Card
                title={employeeId ? 'Редактировать сотрудника' : 'Добавить сотрудника'}
                bordered={false}
                className="card"
            >
                <Form form={form} onFinish={handleSubmit} layout="vertical">
                    <Row gutter={16}>
                        <Col span={24}>
                            <Form.Item
                                label="Имя"
                                name="name"
                                rules={[{ required: true, message: 'Пожалуйста, введите имя' }]}
                            >
                                <Input placeholder="Введите имя сотрудника" />
                            </Form.Item>
                        </Col>

                        <Col span={24}>
                            <Form.Item
                                label="Телефон"
                                name="phone"
                                rules={[{ required: true, message: 'Пожалуйста, введите номер телефона' }]}
                            >
                                <InputMask
                                    mask="+7 (999) 999-99-99"
                                    maskChar={null}
                                    placeholder="Введите телефон"
                                >
                                    {/* @ts-ignore */}
                                    <Input />
                                </InputMask>
                            </Form.Item>
                        </Col>

                        <Col span={24}>
                            <Form.Item
                                label="Дата рождения"
                                name="birthday"
                                rules={[{ required: true, message: 'Пожалуйста, введите дату рождения' }]}
                            >
                                <DatePicker
                                    format="DD.MM.YYYY"
                                    style={{ width: '100%' }}
                                    placeholder="Выберите дату рождения"
                                />
                            </Form.Item>
                        </Col>

                        <Col span={24}>
                            <Form.Item label="Должность" name="role" rules={[{ required: true, message: 'Выберите должность' }]}>
                                <Select placeholder="Выберите должность">
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
                                icon={employeeId ? <EditOutlined /> : <UserAddOutlined />}
                            >
                                {employeeId ? 'Сохранить изменения' : 'Добавить сотрудника'}
                            </Button>
                        </Col>
                    </Row>
                </Form>
            </Card>
        </div>
    );
};

export default EmployeeForm;
