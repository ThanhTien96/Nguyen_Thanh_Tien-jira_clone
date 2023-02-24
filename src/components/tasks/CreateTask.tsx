import React, { useEffect, useState } from 'react';
import { Col, Form, Input, InputNumber, Row, Select, Slider } from 'antd';
import { useFormik } from 'formik';
import { Editor } from '@tinymce/tinymce-react';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/configStore';
import './CreateTask.scss'
import { taskService } from '../../services/taskServices';
import { userService } from '../../services/userServices';
import { CloseOutlined } from '@ant-design/icons';
import { changeModelControlAction } from '../../redux/reducer/projectSlice';
import { useDispatch } from 'react-redux';
import { createTaskType } from '../../types/taskType';
import Swal from 'sweetalert2';
import * as Yup from 'yup';






const CreateTask: React.FC = (props) => {

    const { projectList } = useSelector((state: RootState) => state.projectSlice);
    const { userList } = useSelector((state: RootState) => state.userSlice);

    const [status, setStatus] = useState<string[]>([]);
    const [taskType, setTaskType] = useState<string[]>([]);
    const [taskPriority, setTaskPriority] = useState<string[]>([]);
    const dispatch = useDispatch();


    useEffect(() => {
        fetchApiStatus();
        fetchApiTaskType();
        fetchApiPriority();

    }, []);

    // api get task type
    const fetchApiTaskType = async () => {
        try {
            const res = await taskService.getTaskType();
            setTaskType(res.data.content)
        } catch (err) {
            console.log(err);
        };
    }

    // api get status task
    const fetchApiStatus = async () => {
        try {
            const res = await taskService.getStatusTask();
            setStatus(res.data.content)
        } catch (err) {
            console.log(err);
        };
    }

    // api get priority task
    const fetchApiPriority = async () => {
        try {
            const res = await taskService.getTaskPriority();
            setTaskPriority(res.data.content)
        } catch (err) {
            console.log(err);
        };
    }


    const formik = useFormik({
        initialValues: {
            listUserAsign: [],
            taskName: '',
            description: '',
            statusId: '',
            originalEstimate: 0,
            timeTrackingSpent: 0,
            timeTrackingRemaining: 0,
            projectId: 0,
            typeId: 0,
            priorityId: 0
        },
        validationSchema: Yup.object({
            taskName: Yup.string().required('* Task name is required!'),
            description: Yup.string().required('* description name is required!'),
            projectId: Yup.string().required('* Task name is required!'),
        }),
        onSubmit: async (value: createTaskType) => {
            console.log(value);
            try {
                const res = await taskService.getApiCreateTask(value);
                console.log(res)
                await Swal.fire({
                    position: 'center',
                    icon: 'success',
                    text: res.data.message,
                    showConfirmButton: true,
                }).then((result) => {
                    if (result.isConfirmed) {
                        dispatch(changeModelControlAction(false));
                    }
                })

            } catch (err: any) {
                await Swal.fire({
                    position: 'center',
                    icon: 'error',
                    text: err.response.data.message,
                    showConfirmButton: true,
                })
            }
        },
    });

    // set value for project name
    const handleChangeProjectName = (value: number) => {
        formik.setFieldValue('projectId', value);
    };

    // set value for status
    const handleChangeStatus = (value: number) => {
        formik.setFieldValue('statusId', value);
    };

    // set value spriority
    const handleChangePriority = (value: number) => {
        formik.setFieldValue('priorityId', value);
    };

    // set value task type
    const handleChangeTaskType = (value: number) => {
        formik.setFieldValue('typeId', value);
    };

    // set value for description
    const textChange = (e: any) => {
        const data = e.target.getContent();
        formik.setFieldValue('description', data);
    };

    // set value Estimate
    const handleChangeEstimate = (value: number) => {
        formik.setFieldValue('originalEstimate', value)
    }

    // set value tracking spent
    const handleChangeTimeTrackingSpent = (value: number) => {
        formik.setFieldValue('timeTrackingSpent', value);
    }

    // add user assign
    const handleChangeAssigners = (value: number[]) => {
        formik.setFieldValue('listUserAsign', value);
        formik.setFieldValue('timeTrackingRemaining', formik.values.originalEstimate - formik.values.timeTrackingSpent);
    }

    // open task model
    const handleOpenTaskModel = () => {
        dispatch(changeModelControlAction(false));
    }


    return (
        <div className='newTask'>
            <Row>
                <Col span={14} offset={10} className='bg-white'>
                    <div className='py-3 px-10 border-b border-solid border-gray flex justify-between'>
                        <h1 className='text-2xl font-semibold'>New Task</h1>
                        <span onClick={handleOpenTaskModel} className='cursor-pointer'><CloseOutlined /></span>
                    </div>
                    <Form className='p-10' onSubmitCapture={formik.handleSubmit} name="form_item_path" layout="vertical">

                        <Form.Item label="Project" required={true}>
                            <Select
                                style={{ width: "100%" }}
                                placeholder='Select Your Category'
                                onChange={handleChangeProjectName}
                                options={
                                    projectList.map((ele: any, index: number) => {
                                        return ({ value: ele.id, label: ele.projectName })
                                    })
                                }
                            />
                            {formik.errors.projectId && formik.touched.projectId && (<p className='text-red-700 mt-1'>{formik.errors.projectId}</p>)}
                        </Form.Item>

                        <Form.Item label="Task name" required={true}>
                            <Input onChange={formik.handleChange} name='taskName' placeholder='Task Name' required />
                            {formik.errors.taskName && formik.touched.taskName && (<p className='text-red-700 mt-1'>{formik.errors.taskName}</p>)}
                        </Form.Item>

                        <Form.Item label="Status" required={true}>
                            <Select
                                style={{ width: "100%" }}
                                placeholder='Select Status'
                                onChange={handleChangeStatus}
                                options={
                                    status.map((ele: any, index: number) => {
                                        return ({ value: ele.statusId * 1, label: ele.statusName })
                                    })
                                }
                            />
                        </Form.Item>

                        <Form.Item className='inline-block  w-1/2' label="Priority" required={true}>
                            <Select
                                style={{ width: "90%" }}
                                placeholder='Select Priority'
                                onChange={handleChangePriority}
                                options={
                                    taskPriority.map((ele: any, index: number) => {
                                        return ({ value: ele.priorityId * 1, label: ele.priority })
                                    })
                                }
                            />

                        </Form.Item>

                        <Form.Item className='inline-block w-1/2' label="Task Type" required={true}>

                            <Select
                                style={{ width: "90%" }}
                                placeholder='Select Status'
                                onChange={handleChangeTaskType}
                                options={
                                    taskType.map((ele: any, index: number) => {
                                        return ({ value: ele.id * 1, label: ele.taskType })
                                    })
                                }
                            />
                        </Form.Item>

                        <Form.Item label='Assigners' required>
                            <Select
                                mode="multiple"
                                placeholder="Inserted are removed"
                                value={formik.values.listUserAsign}
                                onChange={handleChangeAssigners}
                                style={{
                                    width: '100%',
                                }}
                                options={userList.map((item: any) => ({
                                    value: item.userId,
                                    label: item.name,
                                }))}
                            />
                        </Form.Item>

                        <Form.Item label='Time Tracking'>
                            <Form.Item className='inline-block w-1/2' label='Total Estimated Hours' required>
                                <InputNumber defaultValue={0} type='number' onChange={(value: any) => {
                                    let time = value * 1;
                                    handleChangeEstimate(time)
                                }} style={{ width: '70%' }} />
                            </Form.Item>
                            <Form.Item className='inline-block w-1/2' label='Hours spent' required>
                                <InputNumber
                                    defaultValue={0}
                                    type='number'
                                    onChange={(value: any) => {
                                        let trackingSpent = value * 1;
                                        handleChangeTimeTrackingSpent(trackingSpent);
                                    }}
                                    style={{ width: '70%' }} />
                            </Form.Item>

                            <Form.Item>
                                <Slider
                                    min={0}
                                    max={formik.values.originalEstimate}
                                    value={formik.values.timeTrackingSpent}
                                />
                                <div className='flex justify-between font-medium'>
                                    <h4>
                                        {formik.values.timeTrackingSpent} hour(s) spent
                                    </h4>
                                    <h4>
                                        {formik.values.originalEstimate - formik.values.timeTrackingSpent}hour(s) remaining
                                    </h4>
                                </div>
                            </Form.Item>
                        </Form.Item>

                        <Form.Item label="Descriptions">
                            <Editor
                                onChange={textChange}
                                apiKey="wumtctoa4zi0a1l66upxgydpoqz6d9jqqw9d26a862f6gfia"
                                init={{
                                    height: 300,
                                    menubar: false,
                                    plugins: [
                                        'advlist autolink lists link image charmap print preview anchor',
                                        'searchreplace visualblocks code fullscreen',
                                        'insertdatetime media table paste code help wordcount'
                                    ],
                                    toolbar: 'undo redo | formatselect | ' +
                                        'bold italic backcolor forecolor fontsize | alignleft aligncenter  ' +
                                        'alignright alignjustify | bullist numlist outdent indent | ' +
                                        'removeformat | help',
                                    content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                                }}
                            />
                            {formik.errors.description && formik.touched.description && (<p className='text-red-700 mt-1'>{formik.errors.description}</p>)}
                        </Form.Item>

                        <div>
                            <button
                                onClick={handleOpenTaskModel}
                                className='bg-gray-200 text-gray-700 px-5 py-2 rounded-lg font-semibold hover:bg-gray-400 transition-all duration-300'
                                type="button">
                                Cancel
                            </button>

                            <button
                                className='bg-sky-600 text-white px-5 py-2 rounded-lg font-semibold hover:bg-sky-900 transition-all duration-300 ml-5'
                                type="submit">
                                Submit
                            </button>
                        </div>
                    </Form>
                </Col>
            </Row>
        </div >
    )
}

export default CreateTask