
import { Col, Modal, Row } from 'antd';
import clsx from 'clsx';
import React, { useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/configStore';
import { truncateText } from '../../../utils';
import EditTask from '../EditTask';
import './TaskControl.scss';




const TaskControl: React.FC = () => {
    const { projectDetail } = useSelector((state: RootState) => state.projectSlice);
    const [open, setOpen] = useState<boolean>(false);
    const taskIDRef = useRef<any>(0);

    return (
        <Row className='mt-10'>

            {
                projectDetail?.lstTask.map((ele: any, index: number) => {
                    return (
                        <Col key={ele.statusId} span={6} className='px-1'>
                            <div className='bg-gray-200 h-full rounded-md p-3'>
                                <h3 className={clsx('px-3 bg-gray-300 inline-block rounded-md',
                                    {
                                        'bg-gray-300': ele.statusId === '1',
                                        'bg-sky-200': ele.statusId === '2',
                                        'bg-teal-300': ele.statusId === '3',
                                        'bg-green-400': ele.statusId === '4',
                                    }
                                )}>
                                    {ele.statusName}
                                </h3>

                                {ele.lstTaskDeTail.map((taskDetail: any, index: number) => {
                                    return (
                                        <div onClick={() => {
                                            taskIDRef.current = taskDetail.taskId
                                            setOpen(true);
                                        }} key={index} className='bg-white p-2 mt-3 rounded-md shadow-sm'>
                                            <p className='py-3'>{taskDetail.taskName}</p>
                                            <div className='flex justify-between items-center'>
                                                <p>
                                                    <span className={clsx('border border-solid px-2 rounded-sm', {
                                                        'border-red-400': taskDetail.priorityTask.priorityId === 1,
                                                        'border-green-500': taskDetail.priorityTask.priorityId === 2,
                                                        'border-teal-300': taskDetail.priorityTask.priorityId === 3,
                                                        'border-gray-200': taskDetail.priorityTask.priorityId === 4,
                                                    })}>
                                                        {taskDetail.priorityTask.priority}
                                                    </span>
                                                </p>
                                                <div className='flex mt-3 items-center'>
                                                    {
                                                        taskDetail.assigness.map((ele: any, index: number) => {
                                                            return (
                                                                <p key={index} className='taskMembers'>
                                                                    {truncateText(ele.name, 2)}
                                                                    <span>{truncateText(ele.name, 17)}</span>
                                                                </p>
                                                            )
                                                        })
                                                    }
                                                </div>

                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        </Col>
                    )
                })
            }

            <Modal
                centered
                open={open}
                closable={true}
                onCancel={() => setOpen(false)}
                footer={null}
                width={1000}
            >
                <EditTask taskIDRef={taskIDRef.current} />
            </Modal>



        </Row>
    )
}

export default TaskControl