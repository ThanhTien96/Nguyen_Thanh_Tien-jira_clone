import { Editor } from '@tinymce/tinymce-react';
import { Col, Form, Input, InputNumber, Modal, Row, Select, Slider } from 'antd'
import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { RootState } from '../../redux/configStore';
import { taskService } from '../../services/taskServices';
import Comment from './comment/Comment';



interface EditProp {
    taskIDRef: number,
}

const EditTask: React.FC<EditProp> = (props) => {

    const { userList } = useSelector((state: RootState) => state.userSlice);

    // state quan ly giao dien modal
    const [open, setOpen] = useState<boolean>(false);
    const [inputComment, setInputComment] = useState<boolean>(false);
    const navigate = useNavigate();

    const [taskType, setTaskType] = useState<string[]>([]);
    const [taskStatus, setTaskStatus] = useState<string[]>([]);
    const [taskPriority, setTaskPriority] = useState<string[]>([]);
    const [taskDetail, setTaskDetail] = useState<any>(null);



    useEffect(() => {
        fetchApiTaskType();
        fetchApiTaskStatus();
        fetchApiGetTaskDetail();
        fetchApiPriority();

    }, [])

    const listUser = taskDetail?.assigness.map((ele: any) => {
        return ele.id;
    });

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            listUserAsign: listUser,
            taskId: props.taskIDRef.toString(),
            taskName: taskDetail?.taskName,
            description: taskDetail?.description,
            statusId: taskDetail?.statusId,
            originalEstimate: taskDetail?.originalEstimate,
            timeTrackingSpent: taskDetail?.timeTrackingSpent,
            timeTrackingRemaining: taskDetail?.timeTrackingRemaining,
            projectId: taskDetail?.projectId,
            typeId: taskDetail?.taskTypeDetail.id,
            priorityId: taskDetail?.priorityId,
        },
        onSubmit: async (value: any) => {
            console.log(value);
            try {
                const res = await taskService.fetchApiUpdateTask(value);
                await Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Update Project Success!',
                    showConfirmButton: true,
                    showCancelButton: false,
                })
                navigate('/project');
            } catch (err: any) {
                console.log(err);
                await Swal.fire({
                    position: 'center',
                    icon: 'error',
                    text: err.response.data.message,
                    showConfirmButton: true,
                })
            };

        },
    });

    // api get priority task
    const fetchApiPriority = async () => {
        try {
            const res = await taskService.getTaskPriority();
            setTaskPriority(res.data.content)
        } catch (err) {
            console.log(err);
        };
    }

    // get api task type
    const fetchApiTaskType = async () => {
        try {
            const res = await taskService.getTaskType();
            setTaskType(res.data.content);
        } catch (err) {
            console.log(err);
        }
    }

    // get api task status
    const fetchApiTaskStatus = async () => {
        try {
            const res = await taskService.getStatusTask();
            setTaskStatus(res.data.content);
        } catch (err) {
            console.log(err);
        }
    }


    // api get task detail
    const fetchApiGetTaskDetail = async () => {
        try {
            const res = await taskService.getApiTaskDetail(props.taskIDRef)
            setTaskDetail(res.data.content);
        } catch (err) {
            console.log(err);
        };
    }


    // edit task type
    const handleChangeTaskType = (value: number) => {
        formik.setFieldValue('typeId', value);
    };

    // edit handleChangeAssigners
    const handleChangeAssigners = (value: number) => {
        formik.setFieldValue('listUserAsign', value);
    }

    // set value for description
    const textChangeDescription = (e: any) => {
        const data = e.target.getContent();
        formik.setFieldValue('description', data);
    };

    //set priority 
    const handleChangeTaskPriority = (value: number) => {
        formik.setFieldValue('priorityId', value)
    }

    // set value Estimated hour
    const handleSetEstimated = (value: any) => {
        const num: number = value;
        formik.setFieldValue('originalEstimate', num);
    };

    // set value spent hour
    const handleSetSpent = (value: any) => {
        const num: number = value;
        formik.setFieldValue('timeTrackingSpent', num);
    };

    //comment
    const textChangeComment = async (e: any) => {
        const data = e.target.getContent();
        try {
            const dataModel = {
                taskId: props.taskIDRef,
                contentComment: data,
            }
            const res = taskService.fetchApiCreateComment(dataModel);
            console.log(res);
        } catch (err) {
            console.log(err);
        }

    }

    return (
        <Form onSubmitCapture={formik.handleSubmit} layout="vertical">
            <Row>
                <Col span={14} className='overflow-y-scroll px-5 h-96'>
                    <Form.Item>
                        <Select
                            value={formik.values.typeId}
                            style={{ width: 120 }}
                            onChange={handleChangeTaskType}
                            options={taskType.map((ele: any, index: number) => {
                                return ({ value: ele.id, label: ele.taskType })
                            })}
                        />

                        <Form.Item className='mt-3'>
                            <Input name='taskName' onChange={formik.handleChange} value={formik.values.taskName} type='text' />
                        </Form.Item>

                        <Form.Item label="Description" className='mt-3'>
                            <Editor
                                onChange={textChangeDescription}
                                initialValue={formik.values.description}
                                apiKey="wumtctoa4zi0a1l66upxgydpoqz6d9jqqw9d26a862f6gfia"
                                init={{
                                    height: 200,
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
                        </Form.Item>

                        <Form.Item label="Comments" className='mt-3'>
                            {!inputComment && <Input onClick={() => setInputComment(true)} type='text' />}

                            {
                                inputComment &&
                                <div>
                                    <Editor
                                        apiKey="wumtctoa4zi0a1l66upxgydpoqz6d9jqqw9d26a862f6gfia"
                                        init={{
                                            height: 200,
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
                                    <button onClick={textChangeComment} type='button' className='px-3 py-1 bg-sky-500 text-white font-semibold hover:bg-sky-700 transition-all duration-300 mt-3'>submit</button>
                                </div>
                            }
                        </Form.Item>
                        {taskDetail?.lstComment.map((ele: any, index: number) => {
                            return (<Comment key={index} data={ele} />)
                        })}


                    </Form.Item>
                </Col>

                <Col span={10} className='px-5'>

                    <Form.Item >
                        <Select
                            value={formik.values.statusId}
                            style={{ width: 200 }}
                            onChange={handleChangeTaskType}
                            options={taskStatus.map((ele: any, index: number) => {
                                return ({ value: ele.statusId, label: ele.statusName })
                            })}
                        />

                        <Form.Item label='Assignees' className='mt-3'>
                            <div className='py-3'>
                                {taskDetail?.assigness.map((ele: any, index: number) => {
                                    return (
                                        <span key={index} className='border border-solid border-gray-300 px-2 py-1 rounded-md m-2 inline-block'>{ele.name}
                                            <button className='ml-2 text-red-500'>X</button>
                                        </span>
                                    )
                                })}
                            </div>
                            <Select
                                mode="multiple"
                                placeholder="Inserted are removed"
                                onChange={handleChangeAssigners}
                                style={{
                                    width: '100%',
                                }}
                                options={userList.map((ele: any, index: number) => {
                                    return {
                                        value: ele.userId,
                                        label: ele.name,
                                    }
                                })}
                            />
                        </Form.Item>

                        <Form.Item label="Priority" className='mt-3'>
                            <Select
                                value={formik.values.priorityId}
                                style={{ width: 200 }}
                                onChange={handleChangeTaskPriority}
                                options={taskPriority.map((ele: any) => {
                                    return ({ value: ele.priorityId, label: ele.priority })
                                })}
                            />
                        </Form.Item>

                        <Form.Item label="Estimate" className='mt-3'>
                            <InputNumber onChange={(value) => {
                                formik.setFieldValue('timeTrackingRemaining', value)
                            }} value={formik.values.timeTrackingRemaining} type='number' />
                        </Form.Item>

                        <Form.Item label="Time tracking" className='mt-3'>
                            <Slider
                                min={0}
                                max={formik.values.originalEstimate}
                                defaultValue={formik.values.originalEstimate - formik.values.timeTrackingSpent}
                            />
                            <div onClick={() => {
                                setOpen(true)
                            }} className='flex justify-between font-medium'>
                                <h4>
                                    {formik.values.timeTrackingSpent}hour(s) spent
                                </h4>
                                <h4>
                                    {formik.values.originalEstimate - formik.values.timeTrackingSpent} hour(s) remaining
                                </h4>
                            </div>
                        </Form.Item>
                    </Form.Item>

                </Col>
            </Row>

            <Modal
                title='Time tracking'
                centered
                open={open}
                closable={true}
                onCancel={() => setOpen(false)}
                footer={null}
            >
                <Form className='p-3'>
                    <Form.Item className='mt-3'>
                        <Slider
                            onChange={() => {
                                setOpen(true)
                            }}
                            min={0}
                            max={formik.values.originalEstimate}
                            value={formik.values.originalEstimate - formik.values.timeTrackingSpent}
                        />
                        <div className='flex justify-between font-medium'>
                            <h4>
                                {formik.values.timeTrackingSpent} hour(s) spent
                            </h4>
                            <h4>
                                {formik.values.originalEstimate - formik.values.timeTrackingSpent} hour(s) remaining
                            </h4>
                        </div>
                    </Form.Item>
                    <p className='mb-3'>The original estimate for this issue was 0m.</p>


                    <Form.Item className='inline-block w-1/2' label='Estimated Hours' >
                        <InputNumber onChange={handleSetEstimated} defaultValue={formik.values.originalEstimate} type='number' style={{ width: '90%' }} />
                    </Form.Item>
                    <Form.Item className='inline-block w-1/2' label='Hours spent' >
                        <InputNumber
                            onChange={handleSetSpent}
                            defaultValue={formik.values.timeTrackingSpent}
                            type='number'
                            style={{ width: '90%' }} />
                    </Form.Item>
                </Form>
                <button
                    onClick={() => setOpen(false)}
                    className='px-5 py-1 bg-sky-500 hover:bg-sky-700 text-white transition-all duration-300'>Submit</button>
            </Modal>

            <button className='px-3 py-1 bg-sky-500 text-white font-semibold hover:bg-sky-700 transition-all duration-300' type='submit'>submit</button>

        </Form>
    )
}

export default EditTask